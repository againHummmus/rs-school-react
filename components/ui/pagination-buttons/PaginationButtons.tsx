import { Link } from '@/i18n/navigation';

type PaginationButtonsProps = {
  total: number;
  currentPage: number;
  q: string;
};

export default function PaginationButtons({
  total,
  currentPage,
  q,
}: PaginationButtonsProps) {
  const totalPages = Math.ceil(total / 10);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const range = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const pageHref = (page: number) => {
    const query: Record<string, string> = { page: String(page) };
    if (q) query.q = q;
    return { pathname: '/', query };
  };

  return (
    <div className="sticky bottom-3 w-fit mx-auto px-10 flex flex-row justify-center rounded-full items-center gap-2 py-2 bg-accent-light backdrop-blur-md z-10">
      <Link
        href={pageHref(currentPage - 1)}
        prefetch={false}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          currentPage <= 1
            ? 'text-muted-foreground/40 pointer-events-none'
            : 'text-background hover:bg-background/10'
        }`}
      >
        «
      </Link>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-background/60 select-none"
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <Link
              key={`page-${page}`}
              href={pageHref(page as number)}
              prefetch={false}
              className={`min-w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                isCurrent
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-background hover:bg-background/10'
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link
        href={pageHref(currentPage + 1)}
        prefetch={false}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? 'text-muted-foreground/40 pointer-events-none'
            : 'text-background hover:bg-background/10'
        }`}
      >
        »
      </Link>
    </div>
  );
}
