import clsx from 'clsx'
import {Fragment, useState} from 'react'
import {DataTablePagination} from "@/components/DataTablePagination";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import {TextField} from "@/components/TextField";
import {Button} from "@/components/Button";

export function DataTable({
                              headers = [],
                              path = null,
                              searchable = false,
                              paginated = false,
                              noDataMsg,
                              className,
                              sticky = false,
                          }) {

    const [search, setSearch] = useState('')
    const [itemsUrl, setItemsURL] = useState(`${path}${paginated ? '?paginated=1' : ''}`)

    const {
        data: items,
        isLoading,
        error
    } = useSWR({resource: itemsUrl})

    if (error) {
        return <p>There was an issue loading this page. Please contact support.</p>
    }

    const item_data = paginated ? items.data?.data : items.data;
    const item_as_description_list = (item) => {
        const list = headers.map((header, index) => {
            return (
                <Fragment key={`data_list_item_${index}`}>
                    <dt className="font-bold">{header.text}</dt>
                    <dd className="mt-1 truncate">
                        {typeof header.component === 'function'
                            ? header.component(item)
                            : item[header.key]}
                    </dd>
                </Fragment>
            )
        })

        return <dl className="font-normal lg:hidden">{list}</dl>
    }

    const item_as_cell_from_header = (item, header, index) => {
        return (
            <td
                key={`data_item_cell_${index}`}
                className={clsx(
                    index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                    'whitespace-nowrap py-4 text-sm font-medium'
                )}
            >
        <span className="hidden lg:table-cell">
          {typeof header.component === 'function'
              ? header.component(item)
              : item[header.key]}
        </span>
                {index === 0 && item_as_description_list(item)}
            </td>
        )
    }

    const doSearch = (e) => {
        e.preventDefault()

        setItemsURL(`${path}?query=${encodeURIComponent(search)}${paginated ? '&paginated=1' : ''}`)
    }

    const reset = () => {
        setItemsURL(`${path}${paginated ? '?paginated=1' : ''}`)
        setSearch('')
    }

    return (
        <div
            className={clsx(
                className,
                sticky ? 'flow-root' : 'flex flex-col',
                'mt-8'
            )}
        >
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div
                    className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
                    <div
                        className={clsx(
                            sticky ? 'max-h-96 overflow-y-scroll' : 'overflow-hidden',
                            'bg-slate-100 dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 rounded-t-md shadow-md'
                        )}
                    >
                        {searchable &&
                            <form
                                className='flex flex-row items-end justify-between w-full px-4 py-4 border-b border-gray-300 dark:border-zinc-600'
                                onSubmit={(e) => doSearch(e)}>
                                <TextField value={search} onChange={(e) => setSearch(e.target.value)} label="Search"
                                           placeholder='Need to find something...' className='w-8/12'/>
                                <div className='flex justify-end max-sm:flex-col'>
                                    <Button type='button' className='sm:mr-2 max-sm:mb-2'
                                            onClick={() => reset()}>Reset</Button>
                                    <Button type='submit'>Search</Button>
                                </div>
                            </form>
                        }
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-600">
                            <thead
                                className={clsx(
                                    sticky &&
                                    'sticky top-0 z-10 bg-opacity-75 dark:bg-opacity-50 backdrop-blur backdrop-filter',
                                    'bg-slate-100 dark:bg-zinc-800'
                                )}
                            >
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        className={clsx(
                                            index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                                            'hidden max-sm:py-0 py-3.5 text-left text-sm font-semibold lg:table-cell'
                                        )}
                                        scope="col"
                                        key={`data_header_${index}`}
                                    >
                                        {header.text}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody
                                className="not-prose divide-y divide-gray-200 bg-white dark:divide-zinc-500 dark:bg-zinc-700">

                            {item_data?.length > 0 ? (
                                item_data.map((item, id) => (
                                    <tr key={`data_item_${id}`}>
                                        {headers.map((header, index) =>
                                            item_as_cell_from_header(item, header, index)
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="w-max whitespace-nowrap py-4 px-3 text-center text-sm"
                                    >
                                        {isLoading && <Spinner className='h-10 w-10 mx-auto my-2'/>}
                                        {isLoading ? 'Loading data...' : noDataMsg ?? 'No data found.'}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {paginated && (
                        <DataTablePagination page_data={{...items.data}} setPage={setItemsURL}/>)}
                </div>
            </div>
        </div>
    )
}
