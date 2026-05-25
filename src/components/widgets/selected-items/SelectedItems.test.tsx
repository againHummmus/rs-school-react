import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SelectedItems from './SelectedItems';
import useStore from '../../../store/store';
import type { Anime } from '../../types';

vi.mock('../../../store/store');

const mockAnime: Anime[] = [
  {
    mal_id: 1,
    title_english: 'Cowboy Bebop',
    title_japanese: 'カウボーイビバップ',
    synopsis: '',
    episodes: 26,
    year: 1998,
    score: 8.75,
    status: 'Finished Airing',
    duration: '24 min',
    rating: 'R',
    images: { webp: { image_url: 'https://example.com/1.webp', large_image_url: 'https://example.com/1-large.webp' } },
    genres: [],
  },
  {
    mal_id: 2,
    title_english: 'Trigun',
    title_japanese: 'トライガン',
    synopsis: '',
    episodes: 26,
    year: 1998,
    score: 8.24,
    status: 'Finished Airing',
    duration: '24 min',
    rating: 'PG-13',
    images: { webp: { image_url: 'https://example.com/2.webp', large_image_url: 'https://example.com/2-large.webp' } },
    genres: [],
  },
];

const mockUseStore = vi.mocked(useStore);

function renderSelectedItems(setShowPopup = vi.fn(), items: Anime[] = [], removeAll = vi.fn()) {
  mockUseStore.mockImplementation(((selector: (state: object) => unknown) =>
    selector({ selectedItems: items, removeAllSelectedItems: removeAll })
  ) as typeof useStore);
  return render(
    <MemoryRouter>
      <SelectedItems setShowPopup={setShowPopup} />
    </MemoryRouter>
  );
}

describe('SelectedItems', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders heading', () => {
    renderSelectedItems();
    expect(screen.getByRole('heading', { name: /selected items/i })).toBeInTheDocument();
  });

  test('renders close button', () => {
    renderSelectedItems();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('calls setShowPopup(false) when close button clicked', async () => {
    const setShowPopup = vi.fn();
    renderSelectedItems(setShowPopup);
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(setShowPopup).toHaveBeenCalledWith(false);
    expect(setShowPopup).toHaveBeenCalledTimes(1);
  });

  test('shows count of selected items', () => {
    renderSelectedItems(vi.fn(), mockAnime);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('shows 0 count when no items selected', () => {
    renderSelectedItems(vi.fn(), []);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders no cards when selectedItems is empty', () => {
    renderSelectedItems(vi.fn(), []);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('renders a MiniCard for each selected item', () => {
    renderSelectedItems(vi.fn(), mockAnime);
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(screen.getByText('Trigun')).toBeInTheDocument();
  });

  test('renders correct number of links for selected items', () => {
    renderSelectedItems(vi.fn(), mockAnime);
    expect(screen.getAllByRole('link')).toHaveLength(mockAnime.length);
  });

  test('Download and Deselect all buttons are disabled when no items', () => {
    renderSelectedItems(vi.fn(), []);
    expect(screen.getByRole('button', { name: /download/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /deselect all/i })).toBeDisabled();
  });

  test('Download and Deselect all buttons are enabled when items exist', () => {
    renderSelectedItems(vi.fn(), mockAnime);
    expect(screen.getByRole('button', { name: /download/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /deselect all/i })).not.toBeDisabled();
  });

  test('calls removeAllSelectedItems when Deselect all clicked', async () => {
    const removeAll = vi.fn();
    renderSelectedItems(vi.fn(), mockAnime, removeAll);
    await userEvent.click(screen.getByRole('button', { name: /deselect all/i }));
    expect(removeAll).toHaveBeenCalledTimes(1);
  });

  test('clicking Download triggers file download', async () => {
    const createObjectURL = vi.fn((_blob: Blob) => 'blob:url');
    const revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const hrefSpy = vi.spyOn(HTMLAnchorElement.prototype, 'href', 'set');
    const downloadSpy = vi.spyOn(HTMLAnchorElement.prototype, 'download', 'set');

    renderSelectedItems(vi.fn(), mockAnime);
    await userEvent.click(screen.getByRole('button', { name: /download/i }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toContain('text/csv');

    expect(downloadSpy).toHaveBeenCalledWith(`${mockAnime.length}_items.csv`);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:url');

    clickSpy.mockRestore();
    hrefSpy.mockRestore();
    downloadSpy.mockRestore();
  });

  test('CSV contains headers and item data', async () => {
    const createObjectURL = vi.fn((_blob: Blob) => 'blob:url');
    const revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    renderSelectedItems(vi.fn(), mockAnime);
    await userEvent.click(screen.getByRole('button', { name: /download/i }));

    const blob = createObjectURL.mock.calls[0][0];
    const text = await blob.text();

    expect(text).toContain('ID,Title,Title (Japanese),Year,Episodes,Score,Status,Rating,Duration,Genres,Description,Details URL');
    expect(text).toContain('Cowboy Bebop');
    expect(text).toContain('Trigun');
    expect(text).toContain('/details/1');
    expect(text).toContain('/details/2');
  });
});
