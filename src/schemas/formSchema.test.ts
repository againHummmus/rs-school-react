import {
  isValidEmail,
  isFirstLetterUppercase,
  createUncontrolledSchema,
  createRHFSchema,
} from './formSchema';
import countries from '../consts/countryList';

const validCountry = countries[0];

describe('isValidEmail', () => {
  it.each([
    ['test@example.com', true],
    ['user.name+tag@domain.co.uk', true],
    ['a@b.c', true],
  ])('%s → %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });

  it.each([
    'nodomain',
    '@domain.com',
    'user@',
    'user@nodot',
    'user@a.',
    'user@@double.com',
  ])('%s is invalid', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe('isFirstLetterUppercase', () => {
  it('returns true for uppercase first letter', () => {
    expect(isFirstLetterUppercase('Alice')).toBe(true);
    expect(isFirstLetterUppercase('Bob')).toBe(true);
  });

  it('returns false for lowercase first letter', () => {
    expect(isFirstLetterUppercase('alice')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isFirstLetterUppercase('')).toBe(false);
  });

  it('returns false when first char is a digit', () => {
    expect(isFirstLetterUppercase('1Alice')).toBe(false);
  });
});

describe('createUncontrolledSchema', () => {
  const base = {
    name: 'Alice',
    age: '25',
    email: 'alice@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    gender: 'female',
    country: validCountry,
    image: 'data:image/png;base64,abc',
    acceptTerms: true,
  };

  it('accepts valid data', () => {
    expect(createUncontrolledSchema().safeParse(base).success).toBe(true);
  });

  it('rejects empty name', () => {
    const r = createUncontrolledSchema().safeParse({ ...base, name: '' });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toBe('Name is required');
  });

  it('rejects name with lowercase first letter', () => {
    const r = createUncontrolledSchema().safeParse({ ...base, name: 'alice' });
    expect(r.success).toBe(false);
    const issue = r.error?.issues.find((i) => i.path[0] === 'name');
    expect(issue?.message).toBe('First letter must be uppercase');
  });

  it('rejects invalid email', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      email: 'bad-email',
    });
    expect(r.success).toBe(false);
  });

  it('rejects NaN age', () => {
    const r = createUncontrolledSchema().safeParse({ ...base, age: NaN });
    expect(r.success).toBe(false);
  });

  it('rejects negative age', () => {
    const r = createUncontrolledSchema().safeParse({ ...base, age: -1 });
    expect(r.success).toBe(false);
  });

  it('rejects password without uppercase', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      password: 'password1!',
      confirmPassword: 'password1!',
    });
    expect(r.success).toBe(false);
  });

  it('rejects password without lowercase', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      password: 'PASSWORD1!',
      confirmPassword: 'PASSWORD1!',
    });
    expect(r.success).toBe(false);
  });

  it('rejects password without number', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      password: 'Password!!',
      confirmPassword: 'Password!!',
    });
    expect(r.success).toBe(false);
  });

  it('rejects password without special character', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      password: 'Password1',
      confirmPassword: 'Password1',
    });
    expect(r.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      confirmPassword: 'Different1!',
    });
    expect(r.success).toBe(false);
    const issue = r.error?.issues.find((i) => i.path[0] === 'confirmPassword');
    expect(issue?.message).toBe('Passwords do not match');
  });

  it('rejects invalid country', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      country: 'FakeCountry',
    });
    expect(r.success).toBe(false);
  });

  it('rejects empty image', () => {
    const r = createUncontrolledSchema().safeParse({ ...base, image: '' });
    expect(r.success).toBe(false);
  });

  it('rejects unaccepted terms', () => {
    const r = createUncontrolledSchema().safeParse({
      ...base,
      acceptTerms: false,
    });
    expect(r.success).toBe(false);
  });
});

describe('createRHFSchema', () => {
  const base = {
    name: 'Alice',
    age: 25,
    email: 'alice@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    gender: 'female',
    country: validCountry,
    image: undefined as unknown,
    acceptTerms: true,
  };

  it('rejects undefined image with "Image is required"', () => {
    const r = createRHFSchema().safeParse({ ...base, image: undefined });
    expect(r.success).toBe(false);
    const issue = r.error?.issues.find((i) => i.path[0] === 'image');
    expect(issue?.message).toBe('Image is required');
  });

  it('rejects null image', () => {
    const r = createRHFSchema().safeParse({ ...base, image: null });
    expect(r.success).toBe(false);
  });

  it('rejects plain object instead of FileList', () => {
    const r = createRHFSchema().safeParse({ ...base, image: { length: 0 } });
    expect(r.success).toBe(false);
  });

  it('rejects age NaN', () => {
    const r = createRHFSchema().safeParse({ ...base, age: NaN });
    expect(r.success).toBe(false);
  });

  it('rejects invalid name', () => {
    const r = createRHFSchema().safeParse({ ...base, name: 'alice' });
    expect(r.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const r = createRHFSchema().safeParse({
      ...base,
      confirmPassword: 'Other1!',
    });
    expect(r.success).toBe(false);
  });
});
