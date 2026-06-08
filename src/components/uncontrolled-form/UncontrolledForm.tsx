import React, { useState } from 'react';
import Button from '../button/Button';
import { useFormStore } from '../../store/useFormStore';
import { CountryAutocomplete } from '../country-autocomplete/CountryAutocomplete';
import { PasswordStrength } from '../password-strength/PasswordStrength';
import { fileToBase64 } from '../../utils/fileToBase64';
import { createUncontrolledSchema } from '../../schemas/formSchema';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../schemas/formSchema';

const fieldClass =
  'w-full bg-background/5 border border-background/10 rounded-lg px-3 py-2 text-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  image?: string;
  acceptTerms?: string;
}

interface UncontrolledFormProps {
  onSuccess: () => void;
}

function FieldError({ message }: { message?: string }) {
  return (
    <div className="min-h-4">
      {message && <p className="text-xs text-accent leading-none">{message}</p>}
    </div>
  );
}

export const UncontrolledForm: React.FC<UncontrolledFormProps> = ({
  onSuccess,
}) => {
  const { addSubmission, countries } = useFormStore();
  const schema = createUncontrolledSchema();

  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageBase64('');
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((p) => ({ ...p, image: 'Only PNG/JPEG allowed' }));
      setImageBase64('');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((p) => ({ ...p, image: 'Max file size is 5MB' }));
      setImageBase64('');
      return;
    }
    const base64 = await fileToBase64(file);
    setImageBase64(base64);
    setErrors((p) => ({ ...p, image: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const confirmPassword = (
      form.elements.namedItem('confirmPassword') as HTMLInputElement
    ).value;
    const ageRaw = formData.get('age') as string;

    const dataToValidate = {
      name: (formData.get('name') as string).trim(),
      age: ageRaw.trim() === '' ? NaN : ageRaw,
      email: (formData.get('email') as string).trim(),
      password,
      confirmPassword,
      gender: formData.get('gender') as string,
      country,
      image: imageBase64,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const newErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        if (issue.path.length > 0) {
          const field = issue.path[0] as keyof FormErrors;
          if (!newErrors[field]) newErrors[field] = issue.message;
        }
      }
      setErrors(newErrors);
      return;
    }

    addSubmission({
      name: result.data.name,
      age: result.data.age,
      email: result.data.email,
      password: result.data.password,
      gender: result.data.gender,
      country: result.data.country,
      image: imageBase64,
      acceptTerms: true,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-name"
          className="text-sm font-medium text-background/60"
        >
          Name
        </label>
        <input id="unc-name" name="name" type="text" className={fieldClass} />
        <FieldError message={errors.name} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-age"
          className="text-sm font-medium text-background/60"
        >
          Age
        </label>
        <input
          id="unc-age"
          name="age"
          type="number"
          min="0"
          className={fieldClass}
        />
        <FieldError message={errors.age} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-email"
          className="text-sm font-medium text-background/60"
        >
          Email
        </label>
        <input
          id="unc-email"
          name="email"
          type="email"
          className={fieldClass}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-password"
          className="text-sm font-medium text-background/60"
        >
          Password
        </label>
        <input
          id="unc-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={fieldClass}
        />
        <PasswordStrength password={password} />
        <FieldError message={errors.password} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-confirm"
          className="text-sm font-medium text-background/60"
        >
          Confirm Password
        </label>
        <input
          id="unc-confirm"
          name="confirmPassword"
          type="password"
          className={fieldClass}
        />
        <FieldError message={errors.confirmPassword} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-gender"
          className="text-sm font-medium text-background/60"
        >
          Gender
        </label>
        <select
          id="unc-gender"
          name="gender"
          defaultValue="male"
          className={fieldClass}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-country"
          className="text-sm font-medium text-background/60"
        >
          Country
        </label>
        <CountryAutocomplete
          id="unc-country"
          value={country}
          onChange={setCountry}
          countries={countries}
        />
        <FieldError message={errors.country} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="unc-image"
          className="text-sm font-medium text-background/60"
        >
          Profile Image
        </label>
        {imageBase64 && (
          <img
            src={imageBase64}
            alt="Preview"
            className="w-16 h-16 rounded-lg object-cover border border-background/10"
          />
        )}
        <input
          id="unc-image"
          name="image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="text-sm text-background/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-background/10 file:text-background file:text-sm file:cursor-pointer hover:file:bg-background/15 transition-colors"
        />
        <FieldError message={errors.image} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <input
            id="unc-terms"
            name="acceptTerms"
            type="checkbox"
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="unc-terms"
            className="text-sm text-background/60 cursor-pointer"
          >
            I accept the Terms of Use
          </label>
        </div>
        <FieldError message={errors.acceptTerms} />
      </div>

      <div className="pt-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
