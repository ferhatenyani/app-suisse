import React from 'react';
import { cn } from '../../utils/cn';
import { EmptyState } from '../feedback/EmptyState';
import { FileX } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

// Memoize row component to prevent unnecessary re-renders
const TableRow = React.memo(<T extends { id: string | number }>({
  row,
  columns,
  getCellValue,
}: {
  row: T;
  columns: Column<T>[];
  getCellValue: (row: T, column: Column<T>) => React.ReactNode;
}) => (
  <tr className="hover:bg-[var(--color-surface-hover)] transition-colors duration-150">
    {columns.map((column, index) => (
      <td
        key={index}
        className={cn(
          'px-4 xs:px-6 py-3 xs:py-4 text-sm text-[var(--color-text)]',
          column.className
        )}
      >
        {getCellValue(row, column)}
      </td>
    ))}
  </tr>
)) as <T extends { id: string | number }>(props: {
  row: T;
  columns: Column<T>[];
  getCellValue: (row: T, column: Column<T>) => React.ReactNode;
}) => JSX.Element;

export function Table<T extends { id: string | number }>({
  data,
  columns,
  className = '',
  emptyStateTitle = 'No data available',
  emptyStateDescription,
}: TableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  if (data.length === 0) {
    return (
      <div className={cn('rounded-xl border border-[var(--color-border)] bg-white', className)}>
        <EmptyState
          icon={<FileX size={48} className="text-[var(--color-text-muted)]" />}
          title={emptyStateTitle}
          description={emptyStateDescription}
        />
      </div>
    );
  }

  // Corporate design: clean table with subtle borders and hover states
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-[var(--color-border)]', className)}>
      <table className="w-full" role="table">
        <thead>
          <tr className="bg-[var(--color-panel)] border-b border-[var(--color-border)]">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 xs:px-6 py-3 xs:py-4 text-left text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[var(--color-border-light)]">
          {data.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              getCellValue={getCellValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
