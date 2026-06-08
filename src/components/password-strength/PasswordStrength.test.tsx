import { render, screen } from '@testing-library/react';
import { PasswordStrength } from './PasswordStrength';

describe('PasswordStrength', () => {
  it('renders nothing for empty password', () => {
    const { container } = render(<PasswordStrength password="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all four rule labels', () => {
    render(<PasswordStrength password="a" />);
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 number')).toBeInTheDocument();
    expect(screen.getByText('1 special character')).toBeInTheDocument();
  });

  it('shows ✓ for a passing rule', () => {
    render(<PasswordStrength password="A" />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('✓');
  });

  it('shows ○ for a failing rule', () => {
    render(<PasswordStrength password="a" />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('○');
  });

  it('all rules pass for a strong password', () => {
    render(<PasswordStrength password="Passw0rd!" />);
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => expect(item).toHaveTextContent('✓'));
  });

  it('renders four strength bars', () => {
    const { container } = render(<PasswordStrength password="test" />);
    const bars = container.querySelectorAll('.h-1');
    expect(bars).toHaveLength(4);
  });
});
