// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

// @ts-ignore;
import { LoadingSpinner } from './LoadingSpinner';
// @ts-ignore;
import { EmptyState } from './EmptyState';
export function DataTable({
  columns,
  data,
  loading = false,
  emptyMessage = '暂无数据',
  onRowClick,
  className = ''
}) {
  if (loading) {
    return <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>;
  }
  if (!data || data.length === 0) {
    return <EmptyState type="data" description={emptyMessage} />;
  }
  return <div className={`overflow-x-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => <TableHead key={column.key} className={column.className || ''}>
                {column.title}
              </TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => <TableRow key={index} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} onClick={() => onRowClick?.(row)}>
              {columns.map(column => <TableCell key={column.key} className={column.className || ''}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </TableCell>)}
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}