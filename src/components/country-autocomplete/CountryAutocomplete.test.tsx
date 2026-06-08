import { render, screen, fireEvent } from '@testing-library/react';
import { CountryAutocomplete } from './CountryAutocomplete';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'United States',
  'United Kingdom',
];

describe('CountryAutocomplete', () => {
  it('renders a text input', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows all countries (up to 10) on focus', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('filters countries based on typed query', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Al' } });
    expect(screen.getByText('Albania')).toBeInTheDocument();
    expect(screen.getByText('Algeria')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  it('calls onChange with selected country on mouseDown', () => {
    const onChange = vi.fn();
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={onChange}
        countries={countries}
      />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.mouseDown(screen.getByText('Afghanistan'));
    expect(onChange).toHaveBeenCalledWith('Afghanistan');
  });

  it('hides dropdown on blur', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    fireEvent.blur(screen.getByRole('textbox'));
    expect(screen.queryByText('Afghanistan')).not.toBeInTheDocument();
  });

  it('calls onBlur prop when input loses focus', () => {
    const onBlur = vi.fn();
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        onBlur={onBlur}
        countries={countries}
      />
    );
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('syncs displayed query when value prop changes', () => {
    const { rerender } = render(
      <CountryAutocomplete
        id="country"
        value="Afghanistan"
        onChange={vi.fn()}
        countries={countries}
      />
    );
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
      'Afghanistan'
    );

    rerender(
      <CountryAutocomplete
        id="country"
        value="Albania"
        onChange={vi.fn()}
        countries={countries}
      />
    );
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
      'Albania'
    );
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Afghanistan')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Afghanistan')).not.toBeInTheDocument();
  });

  it('shows no dropdown when filtered list is empty', () => {
    render(
      <CountryAutocomplete
        id="country"
        value=""
        onChange={vi.fn()}
        countries={countries}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'zzzzz' },
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
