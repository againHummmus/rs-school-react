import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UncontrolledForm } from './UncontrolledForm';
import { useFormStore } from '../../store/useFormStore';
import { fileToBase64 } from '../../utils/fileToBase64';

vi.mock('../../store/useFormStore', () => ({
  useFormStore: vi.fn(),
}));

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(),
}));

const countries = ['Afghanistan', 'Albania', 'United States'];

function setupMocks() {
  const addSubmission = vi.fn();
  vi.mocked(useFormStore).mockReturnValue({ addSubmission, countries });
  vi.mocked(fileToBase64).mockResolvedValue('data:image/png;base64,abc');
  return { addSubmission };
}

describe('UncontrolledForm', () => {
  beforeEach(() => {
    setupMocks();
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile Image')).toBeInTheDocument();
    expect(screen.getByLabelText(/Terms of Use/)).toBeInTheDocument();
  });

  it('shows "Name is required" on empty submit', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('shows uppercase error for lowercase name', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'alice' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(
        screen.getByText('First letter must be uppercase')
      ).toBeInTheDocument();
    });
  });

  it('shows invalid email error', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'bad' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('shows password mismatch error', async () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Different1!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('shows password strength when typing', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test' },
    });
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
  });

  it('shows file type error for invalid image format', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    const file = new File([''], 'photo.gif', { type: 'image/gif' });
    fireEvent.change(screen.getByLabelText('Profile Image'), {
      target: { files: [file] },
    });
    expect(screen.getByText('Only PNG/JPEG allowed')).toBeInTheDocument();
  });

  it('shows file size error when image exceeds 5 MB', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    const file = new File([''], 'photo.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 });
    fireEvent.change(screen.getByLabelText('Profile Image'), {
      target: { files: [file] },
    });
    expect(screen.getByText('Max file size is 5MB')).toBeInTheDocument();
  });

  it('clears imageBase64 when file input is cleared', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Profile Image'), {
      target: { files: [] },
    });
    // no crash — state handled
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });

  it('submits successfully with all valid fields', async () => {
    const { addSubmission } = setupMocks();
    const onSuccess = vi.fn();
    render(<UncontrolledForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Password1!' },
    });

    const countryInput = screen.getByLabelText('Country');
    fireEvent.focus(countryInput);
    fireEvent.change(countryInput, { target: { value: 'Af' } });
    fireEvent.mouseDown(screen.getByText('Afghanistan'));

    const file = new File(['x'], 'photo.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Profile Image'), {
      target: { files: [file] },
    });

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText(/Terms of Use/));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(addSubmission).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Alice',
          age: 25,
          email: 'alice@example.com',
        })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
