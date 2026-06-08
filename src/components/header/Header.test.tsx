import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders both form buttons', () => {
    render(<Header setIsUncontrolledOpen={vi.fn()} setIsRHFOpen={vi.fn()} />);
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });

  it('calls setIsUncontrolledOpen(true) when uncontrolled button clicked', () => {
    const setIsUncontrolledOpen = vi.fn();
    render(
      <Header
        setIsUncontrolledOpen={setIsUncontrolledOpen}
        setIsRHFOpen={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(setIsUncontrolledOpen).toHaveBeenCalledWith(true);
  });

  it('calls setIsRHFOpen(true) when RHF button clicked', () => {
    const setIsRHFOpen = vi.fn();
    render(
      <Header setIsUncontrolledOpen={vi.fn()} setIsRHFOpen={setIsRHFOpen} />
    );
    fireEvent.click(screen.getByText('React Hook Form'));
    expect(setIsRHFOpen).toHaveBeenCalledWith(true);
  });
});
