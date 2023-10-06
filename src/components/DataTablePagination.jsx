import { Button } from '@/components/Button';

export function DataTablePagination({ page_data, setPage }) {
    const fromPos = page_data.from;
    const toPos = page_data.to;
    const total = page_data.total;
    const prevUrl = page_data.prev_page_url;
    const nextUrl = page_data.next_page_url;

    const goToNext = () => {
        if (!nextUrl) return;

        setPage(nextUrl);
    };

    const goToPrev = () => {
        if (!prevUrl) return;

        setPage(prevUrl);
    };

    return (
        <nav
            className="flex items-center justify-between rounded-b-lg border-t border-gray-300 bg-slate-100 px-4 shadow-md dark:border-zinc-600 dark:bg-zinc-800 max-sm:py-3.5 sm:px-6"
            aria-label="Pagination"
        >
            <div className="sm:block">
                <p className="text-sm">
                    Showing <span className="font-medium">{fromPos}</span>-<span className="font-medium">{toPos}</span>{' '}
                    of <span className="font-medium">{total}</span> total results
                </p>
            </div>
            <div className="flex justify-between sm:flex-1 sm:justify-end">
                <Button className="mr-2" disabled={!prevUrl} onClick={() => goToPrev()}>
                    Previous
                </Button>
                <Button disabled={!nextUrl} onClick={() => goToNext()}>
                    Next
                </Button>
            </div>
        </nav>
    );
}