import { renderHook, act } from '@testing-library/react';
import { useFormStore } from './useFormStore';

beforeEach(() => {
  useFormStore.setState({ submissions: [], newSubmissionId: null });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const submission = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  password: 'Password1!',
  gender: 'female' as const,
  country: 'Afghanistan',
  image: 'data:image/png;base64,abc',
  acceptTerms: true,
};

describe('useFormStore', () => {
  it('starts with empty submissions and null newSubmissionId', () => {
    const { result } = renderHook(() => useFormStore());
    expect(result.current.submissions).toHaveLength(0);
    expect(result.current.newSubmissionId).toBeNull();
  });

  it('has a non-empty countries list', () => {
    const { result } = renderHook(() => useFormStore());
    expect(result.current.countries.length).toBeGreaterThan(0);
  });

  it('addSubmission appends entry with id and submittedAt', () => {
    const { result } = renderHook(() => useFormStore());

    act(() => {
      result.current.addSubmission(submission);
    });

    expect(result.current.submissions).toHaveLength(1);
    expect(result.current.submissions[0]).toMatchObject({
      name: 'Alice',
      age: 25,
    });
    expect(typeof result.current.submissions[0].id).toBe('string');
    expect(result.current.submissions[0].submittedAt).toBeGreaterThan(0);
  });

  it('addSubmission sets newSubmissionId to the new entry id', () => {
    const { result } = renderHook(() => useFormStore());

    act(() => {
      result.current.addSubmission(submission);
    });

    expect(result.current.newSubmissionId).toBe(
      result.current.submissions[0].id
    );
  });

  it('newSubmissionId is cleared after 3 seconds', () => {
    const { result } = renderHook(() => useFormStore());

    act(() => {
      result.current.addSubmission(submission);
    });

    expect(result.current.newSubmissionId).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.newSubmissionId).toBeNull();
  });

  it('addSubmission keeps previous submissions', () => {
    const { result } = renderHook(() => useFormStore());

    act(() => {
      result.current.addSubmission({ ...submission, name: 'Alice' });
      result.current.addSubmission({ ...submission, name: 'Bob' });
    });

    expect(result.current.submissions).toHaveLength(2);
    expect(result.current.submissions[0].name).toBe('Alice');
    expect(result.current.submissions[1].name).toBe('Bob');
  });
});
