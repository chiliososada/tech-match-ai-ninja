
import React from 'react';
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Root component
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center"
    >
      <div className="flex flex-row items-center gap-1">
        <div>
          <button
            aria-label="Go to previous page"
            className="gap-1 pl-2.5"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage <= 1}
            className={cn("gap-1 pl-2.5", currentPage === 1 ? "pointer-events-none opacity-50" : "")}
          >
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>前へ</span>
          </button>
        </div>
        
        {generatePaginationRange(currentPage, totalPages).map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <div key={`ellipsis-${index}`}>
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 12h.01M12 12h.01M21 12h.01" />
                  </svg>
                  <span className="sr-only">More pages</span>
                </span>
              </div>
            );
          }
          
          return (
            <div key={item}>
              <button
                aria-current={currentPage === item ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md border text-center text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  currentPage === item ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "bg-background"
                )}
                onClick={() => onPageChange(Number(item))}
              >
                {item}
              </button>
            </div>
          );
        })}
        
        <div>
          <button
            aria-label="Go to next page"
            className="gap-1 pr-2.5"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className={cn("gap-1 pr-2.5", currentPage === totalPages ? "pointer-events-none opacity-50" : "")}
          >
            <span>次へ</span>
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Helper function to generate pagination range with ellipsis
export const generatePaginationRange = (current: number, total: number): (number | 'ellipsis')[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  
  if (current <= 3) {
    return [1, 2, 3, 4, 'ellipsis', total - 1, total];
  }
  
  if (current >= total - 2) {
    return [1, 2, 'ellipsis', total - 3, total - 2, total - 1, total];
  }
  
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
};

// Default export for convenience
export default Pagination;
