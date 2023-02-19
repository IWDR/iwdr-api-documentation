import clsx from 'clsx'

export function DataTable({
  headers = [],
  items = [],
  isSearchable = false,
  search = undefined,
  noDataMsg,
}) {
  const item_as_cell_from_header = (item, header, index) => {
    return (
      <td
        key={`data_item_cell_${index}`}
        className={clsx(
          index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
          'whitespace-nowrap py-4 text-sm font-medium'
        )}
      >
        {typeof header.component === 'function'
          ? header.component(item)
          : item[header.key]}
      </td>
    )
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-600">
              <thead className="bg-slate-100 dark:bg-zinc-800">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      className={clsx(
                        index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                        'py-3.5 text-left text-sm font-semibold'
                      )}
                      scope="col"
                      key={`data_header_${index}`}
                    >
                      {header.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="not-prose divide-y divide-gray-200 bg-white dark:divide-zinc-500 dark:bg-zinc-700">
                {items.length > 0 ? (
                  items.map((item, id) => (
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
                      {noDataMsg ?? 'No data found.'}
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
