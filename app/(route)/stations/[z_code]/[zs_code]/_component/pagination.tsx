"use client";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  zCode: string;
  zsCode: string;
  totalCount: number;
}

const MAX_DISPLAY_PAGES = 5;
const PER_PAGE = 20;

const Pagination = ({ currentPage, zsCode, zCode, totalCount }: Props) => {
  const numPages = Math.ceil(totalCount / PER_PAGE);
  const calculatePaginationRange = () => {
    const sidePages = Math.floor(MAX_DISPLAY_PAGES / 2);
    let startPage = Math.max(currentPage - sidePages, 1);
    let endPage = Math.min(startPage + MAX_DISPLAY_PAGES - 1, numPages);

    if (endPage - startPage < MAX_DISPLAY_PAGES - 1) {
      startPage = Math.max(endPage - MAX_DISPLAY_PAGES + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const paginationRange = calculatePaginationRange();
  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && (
            <PaginationPrevious
              href={`/stations/${zCode}/${zsCode}?pageNo=${currentPage - 1}`}
            />
          )}
        </PaginationItem>
        {paginationRange.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={`/stations/${zCode}/${zsCode}?pageNo=${pageNumber}`}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {currentPage !== numPages && (
            <PaginationNext
              href={`/stations/${zCode}/${zsCode}?pageNo=${currentPage + 1}`}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
