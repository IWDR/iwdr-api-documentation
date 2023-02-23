import {Button} from "@/components/Button";
import {useState} from "react";
import axios from "@/lib/axios";

export function DataTablePagination({page_data, setPage}) {
    const fromPos = page_data.from
    const toPos = page_data.to
    const total = page_data.total
    const prevUrl = page_data.prev_page_url
    const nextUrl = page_data.next_page_url

    const getAPIUrlAsPath = (full_url) => {
        const url = new URL(full_url)
        return url.pathname + url.search ?? ''
    }

    const goToNext = () => {
        if (!nextUrl) return

        setPage(getAPIUrlAsPath(nextUrl))
    }

    const goToPrev = () => {
        if (!prevUrl) return

        setPage(getAPIUrlAsPath(prevUrl))
    }

    return (
        <nav
            className="flex items-center justify-between border-t border-gray-300 dark:border-zinc-600 rounded-b-lg bg-slate-100 dark:bg-zinc-800 px-4 max-sm:py-3.5 sm:px-6"
            aria-label="Pagination"
        >
            <div className="sm:block">
                <p className="text-sm">
                    Showing <span className="font-medium">{fromPos}</span>-<span
                    className="font-medium">{toPos}</span> of{' '}
                    <span className="font-medium">{total}</span> total results
                </p>
            </div>
            <div className="flex sm:flex-1 justify-between sm:justify-end">
                <Button className="mr-2" disabled={!prevUrl} onClick={() => goToPrev()}>Previous</Button>
                <Button disabled={!nextUrl} onClick={() => goToNext()}>Next</Button>
            </div>
        </nav>
    )
}