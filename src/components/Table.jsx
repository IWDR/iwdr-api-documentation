import clsx from "clsx";
import {Fragment} from "react";

export default function Table({headers, values}) {
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

        return <dl className="font-normal lg:hidden break-words w-full">{list}</dl>
    }

    const item_as_cell_from_header = (item, header, index) => {
        return (
            <td
                key={`data_item_cell_${index}`}
                className={clsx(
                    index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                    'break-words py-4 text-sm font-medium'
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

    return (
        <div className='flex flex-col mt-8'>
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
                    <div
                        className='overflow-hidden bg-slate-100 dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 rounded-t-md shadow-md rounded-b-lg'
                    >
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-600">
                            <thead className='bg-slate-100 dark:bg-zinc-800'>
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
                                className={clsx("not-prose divide-y divide-gray-200 bg-white dark:divide-zinc-500 dark:bg-zinc-700")}>
                            {values?.length > 0 ? (
                                values.map((item, id) => (
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
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}