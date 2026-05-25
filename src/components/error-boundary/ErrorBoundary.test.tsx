import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

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
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} fatalError={errorMessage} />
      </ErrorBoundary>
    );

    const errorTitle = screen.getByText('Something went wrong');
    const errorText = screen.getByText(`Error: ${errorMessage}`);
    
    expect(errorTitle).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });
});