import { render, screen } from '@testing-library/react';
import SubmissionCard from './SubmissionCard';
import type { FormSubmission } from '../../types/form';

const item: FormSubmission = {
  id: '1',
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  password: 'Password1!',
  gender: 'female',
  country: 'United States',
  image: 'data:image/png;base64,abc',
  acceptTerms: true,
  submittedAt: 1000000,
};

describe('SubmissionCard', () => {
  it('renders name, age, email and country', () => {
    render(<SubmissionCard item={item} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<SubmissionCard item={item} />);
    const img = screen.getByAltText('Alice');
    expect(img).toHaveAttribute('src', item.image);
  });

  it('shows accepted terms check mark', () => {
    render(<SubmissionCard item={item} />);
    expect(screen.getByText('✓ Accepted')).toBeInTheDocument();
  });

  it('shows declined terms message', () => {
    render(<SubmissionCard item={{ ...item, acceptTerms: false }} />);
    expect(screen.getByText('✗ Not accepted')).toBeInTheDocument();
  });

  it('applies accent border when isNew is true', () => {
    const { container } = render(<SubmissionCard item={item} isNew={true} />);
    expect(container.firstChild).toHaveClass('border-accent');
    expect(container.firstChild).toHaveClass('bg-accent/10');
  });

  it('applies default border when isNew is false', () => {
    const { container } = render(<SubmissionCard item={item} isNew={false} />);
    expect(container.firstChild).toHaveClass('border-background/10');
    expect(container.firstChild).not.toHaveClass('border-accent');
  });

  it('applies default border when isNew is omitted', () => {
    const { container } = render(<SubmissionCard item={item} />);
    expect(container.firstChild).toHaveClass('border-background/10');
  });
});
