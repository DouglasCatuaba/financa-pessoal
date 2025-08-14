import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

/**
 * Generic table component. Accepts an array of header titles and renders
 * children inside a tbody. Use this to list transactions or other
 * tabular data. Styling is kept minimal and can be extended via
 * Tailwind classes on the parent.
 */
const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
    </table>
  );
};

export default Table;