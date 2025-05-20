
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
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {generatePaginationRange(currentPage, totalPages).map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          
          return (
            <PaginationItem key={item}>
              <PaginationLink 
                isActive={currentPage === item}
                onClick={() => onPageChange(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
};

// Helper function to generate pagination range with ellipsis
export const generatePaginationRange = (current: number, total: number) => {
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

// Subcomponents with proper exports
export const PaginationContent = ({
  className,
  children
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)}>
      {children}
    </ul>
  );
};

export const PaginationItem = ({
  className,
  children
}: React.HTMLAttributes<HTMLLIElement>) => {
  return (
    <li className={cn("", className)}>{children}</li>
  );
};

export const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean;
}) => {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border text-center text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "bg-background",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const PaginationPrevious = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  onClick?: () => void;
}) => {
  return (
    <button
      aria-label="Go to previous page"
      size="sm"
      className={cn("gap-1 pl-2.5", className)}
      onClick={onClick}
      {...props}
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
  );
};

export const PaginationNext = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  onClick?: () => void;
}) => {
  return (
    <button
      aria-label="Go to next page"
      size="sm"
      className={cn("gap-1 pr-2.5", className)}
      onClick={onClick}
      {...props}
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
  );
};

export const PaginationEllipsis = ({
  className,
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
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
  );
};

// Default export for convenience
export default Pagination;
