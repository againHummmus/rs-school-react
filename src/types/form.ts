export interface FormSubmission {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  image: string;
  acceptTerms: boolean;
  submittedAt: number;
}
