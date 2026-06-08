import { z } from 'zod';
import countries from '../consts/countryList';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const isValidEmail = (email: string): boolean => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length === 0) return false;
  if (!domain || !domain.includes('.')) return false;
  return domain.split('.').every((p) => p.length > 0);
};

export const isFirstLetterUppercase = (value: string): boolean =>
  value.length > 0 &&
  value[0] === value[0].toUpperCase() &&
  value[0] !== value[0].toLowerCase();

export const createUncontrolledSchema = () =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(isFirstLetterUppercase, 'First letter must be uppercase'),
      age: z.coerce
        .number({ error: 'Age is required' })
        .int('Must be an integer')
        .min(0, 'Must be 0 or above'),
      email: z
        .string()
        .min(1, 'Email is required')
        .refine(isValidEmail, 'Invalid email'),
      password: z
        .string()
        .min(8, 'At least 8 characters')
        .regex(/[A-Z]/, '1 uppercase letter required')
        .regex(/[a-z]/, '1 lowercase letter required')
        .regex(/\d/, '1 number required')
        .regex(/[^a-zA-Z0-9]/, '1 special character required'),
      confirmPassword: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      country: z
        .string()
        .min(1, 'Country is required')
        .refine(
          (v) => countries.includes(v),
          'Select a valid country from the list'
        ),
      image: z.string().min(1, 'Image is required'),
      acceptTerms: z.boolean().refine((v) => v, 'You must accept the terms'),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export const createRHFSchema = () =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(isFirstLetterUppercase, 'First letter must be uppercase'),
      age: z
        .number({ error: 'Age is required' })
        .int('Must be an integer')
        .min(0, 'Must be 0 or above'),
      email: z
        .string()
        .min(1, 'Email is required')
        .refine(isValidEmail, 'Invalid email'),
      password: z
        .string()
        .min(8, 'At least 8 characters')
        .regex(/[A-Z]/, '1 uppercase letter required')
        .regex(/[a-z]/, '1 lowercase letter required')
        .regex(/\d/, '1 number required')
        .regex(/[^a-zA-Z0-9]/, '1 special character required'),
      confirmPassword: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      country: z
        .string()
        .min(1, 'Country is required')
        .refine(
          (v) => countries.includes(v),
          'Select a valid country from the list'
        ),
      image: z
        .any()
        .refine(
          (val): val is FileList => val instanceof FileList && val.length > 0,
          'Image is required'
        )
        .refine(
          (val: unknown) =>
            !(val instanceof FileList) ||
            val.length === 0 ||
            ACCEPTED_IMAGE_TYPES.includes((val as FileList)[0].type),
          'Only PNG/JPEG allowed'
        )
        .refine(
          (val: unknown) =>
            !(val instanceof FileList) ||
            val.length === 0 ||
            (val as FileList)[0].size <= MAX_FILE_SIZE,
          'Max size is 5MB'
        ),
      acceptTerms: z.boolean().refine((v) => v, 'You must accept the terms'),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
