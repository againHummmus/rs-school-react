import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-7xl font-bold">{t('title')}</h1>
      <p className="text-xl">{t('message')}</p>
      <Link href="/" className="underline hover:opacity-75">
        {t('back')}
      </Link>
    </div>
  );
}
