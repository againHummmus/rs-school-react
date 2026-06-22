import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

type Tech = { name: string; description: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');
  const tech = t.raw('tech') as Tech[];

  return (
    <div className="flex flex-col gap-4 rounded-3xl p-6">
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <h1 className="text-center text-5xl">{t('title')}</h1>
      </div>
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <p className="text-lg leading-relaxed">
          {t.rich('intro', {
            course: (chunks: ReactNode) => (
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75"
              >
                {chunks}
              </a>
            ),
            api: (chunks: ReactNode) => (
              <a
                href="https://jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
        <ul className="text-base list-disc list-inside space-y-1">
          {tech.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
