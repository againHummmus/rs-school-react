import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SearchOutput from './SearchOutput';
import { useAnimeList } from '../../../lib/fetch';
import mockAnimeList from '../../../test-utils/mockAnimeList';

const renderOutput = (searchItem: string) =>
  render(
    <MemoryRouter>
      <SearchOutput searchItem={searchItem} />
    </MemoryRouter>
  );

vi.mock('../../../lib/fetch', () => {
  return {
    useAnimeList: vi.fn(),
  };
});

const mockUseAnimeList = vi.mocked(useAnimeList);

describe('SearchOutput Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', async () => {
    mockUseAnimeList.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useAnimeList>);

    const { container } = renderOutput('Eva');

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('renders anime list on successful fetch', async () => {
    mockUseAnimeList.mockReturnValue({
      data: {
        data: mockAnimeList,
        pagination: { items: { total: mockAnimeList.length } },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAnimeList>);

    renderOutput('Neon');
    expect(mockUseAnimeList).toHaveBeenCalledWith({ page: 1, limit: 10, q: 'Neon' });
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(screen.getByText('Evangelion')).toBeInTheDocument();
  });

  test('renders no results message when API returns empty list', async () => {
    mockUseAnimeList.mockReturnValue({
      data: {
        data: [],
        pagination: { items: { total: 0 } },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAnimeList>);

    renderOutput('Unknown');

    const noResultsElement = await screen.findByText(/no results found/i);
    expect(noResultsElement).toBeInTheDocument();
  });

  test('renders error state on API failure', async () => {
    mockUseAnimeList.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useAnimeList>);

    renderOutput('Eva');

    const errorMessage = await screen.findByText('Something went wrong :(');
    expect(errorMessage).toBeInTheDocument();
  });

  test('updates query params when searchItem prop updates', async () => {
    mockUseAnimeList.mockReturnValue({
      data: {
        data: [],
        pagination: { items: { total: 0 } },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAnimeList>);

    const { rerender } = render(
      <MemoryRouter>
        <SearchOutput searchItem="Bebop" />
      </MemoryRouter>
    );

    expect(mockUseAnimeList).toHaveBeenLastCalledWith({
      page: 1,
      limit: 10,
      q: 'Bebop',
    });

    rerender(
      <MemoryRouter>
        <SearchOutput searchItem="Tengen" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockUseAnimeList).toHaveBeenCalledTimes(2);
    });
    expect(mockUseAnimeList).toHaveBeenLastCalledWith({
      page: 1,
      limit: 10,
      q: 'Tengen',
    });
  });

  test('renders refresh button', () => {
    mockUseAnimeList.mockReturnValue({
      data: { data: mockAnimeList, pagination: { items: { total: mockAnimeList.length } } },
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useAnimeList>);

    renderOutput('Neon');
    expect(screen.getByRole('button', { name: /refresh results/i })).toBeInTheDocument();
  });

  test('calls refetch when refresh button is clicked', () => {
    const refetch = vi.fn();
    mockUseAnimeList.mockReturnValue({
      data: { data: mockAnimeList, pagination: { items: { total: mockAnimeList.length } } },
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch,
    } as unknown as ReturnType<typeof useAnimeList>);

    renderOutput('Neon');
    fireEvent.click(screen.getByRole('button', { name: /refresh results/i }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  test('disables refresh button while fetching', () => {
    mockUseAnimeList.mockReturnValue({
      data: { data: mockAnimeList, pagination: { items: { total: mockAnimeList.length } } },
      isLoading: false,
      isError: false,
      isFetching: true,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useAnimeList>);

    renderOutput('Neon');
    expect(screen.getByRole('button', { name: /refresh results/i })).toBeDisabled();
  });

  test('shows cached data during background refetch without full-page spinner', () => {
    mockUseAnimeList.mockReturnValue({
      data: { data: mockAnimeList, pagination: { items: { total: mockAnimeList.length } } },
      isLoading: false,
      isError: false,
      isFetching: true,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useAnimeList>);

    const { container } = renderOutput('Neon');
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
  });

  test('keeps same query params when searchItem prop stays the same', async () => {
    mockUseAnimeList.mockReturnValue({
      data: {
        data: [],
        pagination: { items: { total: 0 } },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAnimeList>);

    const { rerender } = render(
      <MemoryRouter>
        <SearchOutput searchItem="Bebop" />
      </MemoryRouter>
    );

    expect(mockUseAnimeList).toHaveBeenCalledTimes(1);
    expect(mockUseAnimeList).toHaveBeenLastCalledWith({
      page: 1,
      limit: 10,
      q: 'Bebop',
    });

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    rerender(
      <MemoryRouter>
        <SearchOutput searchItem="Bebop" />
      </MemoryRouter>
    );

    expect(mockUseAnimeList).toHaveBeenLastCalledWith({
      page: 1,
      limit: 10,
      q: 'Bebop',
    });
  });
});
