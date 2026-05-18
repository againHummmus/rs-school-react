import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

vi.mock('../components/SearchHeader', () => ({
  default: ({ searchItem, setSearchItem }: { searchItem: string; setSearchItem: (val: string) => void }) => (
    <div data-testid="search-header">
      <input
        data-testid="search-input"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </div>
  ),
}));

vi.mock('../components/SearchOutput', () => ({
  default: ({ searchItem }: { searchItem: string }) => (
    <div data-testid="search-output">Current search: {searchItem || 'none'}</div>
  ),
}));

vi.mock('../components/ui/ErrorButton', () => ({
  default: () => <button data-testid="error-button">Trigger Error</button>,
}));

vi.mock('./AnimeDetails', () => ({
  default: () => <div data-testid="anime-details" />,
}));

const renderMain = (initialEntry = '/') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Main />
    </MemoryRouter>
  );

describe('Main Page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('inits state with an empty string if local storage is empty', () => {
    renderMain();
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const output = screen.getByTestId('search-output');
    expect(input.value).toBe('');
    expect(output.textContent).toContain('Current search: none');
  });

  test('restores saved search query from localStorage on mount', () => {
    localStorage.setItem('lastSearch', 'Evangelion');
    renderMain();
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const output = screen.getByTestId('search-output');
    expect(input.value).toBe('Evangelion');
    expect(output.textContent).toContain('Current search: Evangelion');
  });

  test('updates localStorage and passes new value to SearchOutput on text input', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();
    renderMain();
    const input = screen.getByTestId('search-input');
    await user.type(input, 'Evangelion');
    expect(screen.getByTestId('search-output').textContent).toContain('Current search: Evangelion');
    expect(localStorage.getItem('lastSearch')).toBe('Evangelion');
    expect(setItemSpy).toHaveBeenCalledWith('lastSearch', 'Evangelion');
  });

  test('does NOT overwrite localStorage if search query has not changed', () => {
    localStorage.setItem('lastSearch', 'Evangelion');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { rerender } = renderMain();
    setItemSpy.mockClear();
    rerender(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>
    );
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test('does not show AnimeDetails when no details param in URL', () => {
    renderMain('/');
    expect(screen.queryByTestId('anime-details')).not.toBeInTheDocument();
  });

  test('shows AnimeDetails when details param is present in URL', () => {
    renderMain('/?details=1');
    expect(screen.getByTestId('anime-details')).toBeInTheDocument();
  });
});