'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '../../ui/text-input/TextInput';
import Button from '../../ui/button/Button';
import { searchAction } from '@/actions/search';

export default function SearchHeader({ defaultValue }: { defaultValue: string }) {
  const t = useTranslations('Search');
  const [, formAction, isPending] = useActionState(searchAction, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 bg-foreground/80 rounded-3xl p-6 backdrop-blur-lg"
    >
      <h1 className="text-background font-black text-4xl">{t('title')}</h1>

      <div className="flex gap-2 items-center">
        <TextInput
          name="q"
          defaultValue={defaultValue}
          placeholder={t('placeholder')}
        />
        <Button type="submit" disabled={isPending}>
          {t('submit')}
        </Button>
      </div>
    </form>
  );
}
