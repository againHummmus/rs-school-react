import { create } from 'zustand';
import type { FormSubmission } from '../types/form';
import countries from '../consts/countryList';

interface FormState {
  submissions: FormSubmission[];
  countries: string[];
  newSubmissionId: string | null;
  addSubmission: (
    submission: Omit<FormSubmission, 'id' | 'submittedAt'>
  ) => void;
}

export const useFormStore = create<FormState>((set) => ({
  submissions: [],
  countries: countries,
  newSubmissionId: null,
  addSubmission: (newSubmission) => {
    const id = crypto.randomUUID();
    set((state) => ({
      submissions: [
        ...state.submissions,
        { ...newSubmission, id, submittedAt: Date.now() },
      ],
      newSubmissionId: id,
    }));
    setTimeout(() => set({ newSubmissionId: null }), 3000);
  },
}));
