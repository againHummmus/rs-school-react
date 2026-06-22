'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

export async function searchAction(
  _prevState: void,
  formData: FormData
): Promise<void> {
  const q = String(formData.get('q') ?? '').trim();
  const locale = await getLocale();

  redirect({
    href: { pathname: '/', query: q ? { q, page: '1' } : { page: '1' } },
    locale,
  });
}
