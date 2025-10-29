// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true
}) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(<Button key={i} variant={i === currentPage ? 'default' : 'outline'} size="sm" onClick={() => onPageChange(i)} className="mx-1">
          {i}
        </Button>);
    }
    return pages;
  };
  return <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        {showFirstLast && <Button variant="outline" size="sm" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>}
        {showPrevNext && <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>}
        {renderPageNumbers()}
        {showPrevNext && <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>}
        {showFirstLast && <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
            <ChevronsRight className="h-4 w-4" />
          </Button>}
      </div>
      
      <div className="text-sm text-gray-600">
        第 {currentPage} 页，共 {totalPages} 页
      </div>
    </div>;
}