import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactHookForm } from './ReactHookForm';
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

describe('ReactHookForm', () => {
  beforeEach(() => {
    setupMocks();
  });

  it('renders all form fields', () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
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

  it('submit button is disabled on initial render', () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows name error after touching the name field with invalid value', async () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'alice' } });
    fireEvent.blur(nameInput);
    await waitFor(() => {
      expect(
        screen.getByText('First letter must be uppercase')
      ).toBeInTheDocument();
    });
  });

  it('shows email error after touching the email field with invalid value', async () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'bad' } });
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('does not show name error before field is touched', async () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'alice' },
    });
    // no blur — field not yet touched
    expect(
      screen.queryByText('First letter must be uppercase')
    ).not.toBeInTheDocument();
  });

  it('shows password strength indicator when typing in password field', () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test' },
    });
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
  });

  it('shows country error after touching with empty value', async () => {
    render(<ReactHookForm onSuccess={vi.fn()} />);
    const countryInput = screen.getByLabelText('Country');
    fireEvent.focus(countryInput);
    fireEvent.blur(countryInput);
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeInTheDocument();
    });
  });

  it('submits successfully with all valid fields', async () => {
    const { addSubmission } = setupMocks();
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'Alice');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password1!');

    const countryInput = screen.getByLabelText('Country');
    fireEvent.focus(countryInput);
    fireEvent.change(countryInput, { target: { value: 'Af' } });
    fireEvent.mouseDown(screen.getByText('Afghanistan'));

    const file = new File(['x'], 'photo.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText('Profile Image'), file);

    await user.click(screen.getByLabelText(/Terms of Use/));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(addSubmission).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Alice', email: 'alice@example.com' })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
