import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useRouteError: vi.fn().mockReturnValue(undefined) };
});

const ProblematicComponent = ({ shouldThrow, fatalError }: { shouldThrow: boolean; fatalError?: string }) => {
  if (shouldThrow) {
    throw new Error(fatalError || 'Fatal Error!!!');
  }
  return <div>It&apos;s working!</div>;
};

describe('Error Boundary Component', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('renders error boundary', () => {
    const errorMessage = 'Fatal Error!!!';
    const router = createMemoryRouter([{
      path: '/',
      element: (
        <ErrorBoundary>
          <ProblematicComponent shouldThrow={true} fatalError={errorMessage} />
        </ErrorBoundary>
      ),
    }]);
    render(<RouterProvider router={router} />);

    const errorTitle = screen.getByText('Something went wrong');
    const errorText = screen.getByText(`Error: ${errorMessage}`);
    
    expect(errorTitle).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });
});