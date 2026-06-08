import React, { useState } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import Button from '../button/Button';
import { useFormStore } from '../../store/useFormStore';
import { CountryAutocomplete } from '../country-autocomplete/CountryAutocomplete';
import { PasswordStrength } from '../password-strength/PasswordStrength';
import { fileToBase64 } from '../../utils/fileToBase64';
import { createRHFSchema } from '../../schemas/formSchema';

interface RHFFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  image: FileList;
  acceptTerms: boolean;
}

const fieldClass =
  'w-full bg-background/5 border border-background/10 rounded-lg px-3 py-2 text-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

interface ReactHookFormProps {
  onSuccess: () => void;
}

function FieldError({ message }: { message?: string }) {
  return (
    <div className="min-h-4">
      {message && <p className="text-xs text-accent leading-none">{message}</p>}
    </div>
  );
}

export const ReactHookForm: React.FC<ReactHookFormProps> = ({ onSuccess }) => {
  const { addSubmission, countries } = useFormStore();
  const schema = createRHFSchema();

  const [imagePreview, setImagePreview] = useState('');
  const [imageTouched, setImageTouched] = useState(false);

  const { register, handleSubmit, control, watch, formState } =
    useForm<RHFFormFields>({
      defaultValues: { gender: 'male', acceptTerms: false, country: '' },
    });

  const watchedValues = watch();
  const validationResult = schema.safeParse(watchedValues);
  const isFormValid = validationResult.success;
  const password = watchedValues.password ?? '';

  const getError = (
    field: keyof RHFFormFields | string
  ): string | undefined => {
    const isTouched =
      field === 'image'
        ? imageTouched
        : !!formState.touchedFields[field as keyof RHFFormFields];
    if (!isTouched) return undefined;
    if (validationResult.success) return undefined;
    return validationResult.error.issues.find((i) => i.path[0] === field)
      ?.message;
  };

  const onSubmit: SubmitHandler<RHFFormFields> = async (data) => {
    const result = schema.safeParse(data);
    if (!result.success) return;

    const imageBase64 = await fileToBase64((result.data.image as FileList)[0]);
    addSubmission({
      name: result.data.name,
      age: result.data.age,
      email: result.data.email,
      password: result.data.password,
      gender: result.data.gender,
      country: result.data.country,
      image: imageBase64,
      acceptTerms: result.data.acceptTerms,
    });
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-name"
          className="text-sm font-medium text-background/60"
        >
          Name
        </label>
        <input
          id="rhf-name"
          {...register('name')}
          type="text"
          className={fieldClass}
        />
        <FieldError message={getError('name')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-age"
          className="text-sm font-medium text-background/60"
        >
          Age
        </label>
        <input
          id="rhf-age"
          {...register('age', { valueAsNumber: true })}
          type="number"
          min="0"
          className={fieldClass}
        />
        <FieldError message={getError('age')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-email"
          className="text-sm font-medium text-background/60"
        >
          Email
        </label>
        <input
          id="rhf-email"
          {...register('email')}
          type="email"
          className={fieldClass}
        />
        <FieldError message={getError('email')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-password"
          className="text-sm font-medium text-background/60"
        >
          Password
        </label>
        <input
          id="rhf-password"
          {...register('password')}
          type="password"
          className={fieldClass}
        />
        <PasswordStrength password={password} />
        <FieldError message={getError('password')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-confirm"
          className="text-sm font-medium text-background/60"
        >
          Confirm Password
        </label>
        <input
          id="rhf-confirm"
          {...register('confirmPassword')}
          type="password"
          className={fieldClass}
        />
        <FieldError message={getError('confirmPassword')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-gender"
          className="text-sm font-medium text-background/60"
        >
          Gender
        </label>
        <select id="rhf-gender" {...register('gender')} className={fieldClass}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-country"
          className="text-sm font-medium text-background/60"
        >
          Country
        </label>
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <CountryAutocomplete
              id="rhf-country"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              countries={countries}
            />
          )}
        />
        <FieldError message={getError('country')} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="rhf-image"
          className="text-sm font-medium text-background/60"
        >
          Profile Image
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-16 h-16 rounded-lg object-cover border border-background/10"
          />
        )}
        <input
          id="rhf-image"
          type="file"
          accept="image/png,image/jpeg"
          className="text-sm text-background/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-background/10 file:text-background file:text-sm file:cursor-pointer hover:file:bg-background/15 transition-colors"
          {...register('image', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setImageTouched(true);
              const file = e.target.files?.[0];
              if (file) fileToBase64(file).then(setImagePreview);
              else setImagePreview('');
            },
          })}
        />
        <FieldError message={getError('image')} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <input
            id="rhf-terms"
            {...register('acceptTerms')}
            type="checkbox"
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="rhf-terms"
            className="text-sm text-background/60 cursor-pointer"
          >
            I accept the Terms of Use
          </label>
        </div>
        <FieldError message={getError('acceptTerms')} />
      </div>

      <div className="pt-1">
        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};
