import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    if (currentPage <= 3) {
      for (let i = 0; i < Math.min(5, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push(-1); // ellipsis
        pages.push(totalPages - 1);
      }
    } else if (currentPage >= totalPages - 4) {
      pages.push(0);
      pages.push(-1); // ellipsis
      for (let i = totalPages - 5; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      pages.push(-1); // ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-2); // ellipsis
      pages.push(totalPages - 1);
    }
  } else {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page, index) => {
        if (page < 0) {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }
        return (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}
