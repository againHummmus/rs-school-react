import { NavLink } from "react-router-dom";

export default function PaginationButtons({ total, currentPage }: { total: number, currentPage: number }) {
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

    const createPageUrl = (page: number) => `?page=${page}`;

    return (
        <div className='sticky bottom-3 w-fit mx-auto px-10 flex flex-row justify-center rounded-full items-center gap-2 py-2 bg-foreground backdrop-blur-md z-10'>
            <NavLink
                to={createPageUrl(currentPage - 1)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currentPage <= 1 
                        ? 'text-muted-foreground/40 pointer-events-none' 
                        : 'text-background hover:bg-background/10'
                }`}
            >
                «
            </NavLink>

            <div className="flex items-center gap-1">
                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-background/60 select-none">
                                ...
                            </span>
                        );
                    }

                    const isCurrent = page === currentPage;

                    return (
                        <NavLink
                            key={`page-${page}`}
                            to={createPageUrl(page as number)}
                            className={`min-w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                                isCurrent
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-background hover:bg-background/10'
                            }`}
                        >
                            {page}
                        </NavLink>
                    );
                })}
            </div>

            <NavLink
                to={createPageUrl(currentPage + 1)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currentPage >= totalPages 
                        ? 'text-muted-foreground/40 pointer-events-none' 
                        : 'text-background hover:bg-background/10'
                }`}
            >
                »
            </NavLink>
        </div>
    );
}