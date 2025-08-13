import { PaginationListProps } from "@/Types/CoreComponents";
import { FC } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationList: FC<PaginationListProps> = ({ pageCount, onPageChange, page }) => {
  const totalPages = pageCount;
  const currentPage = page + 1;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber: number) => {
    onPageChange({ selected: pageNumber - 1 });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <Pagination aria-label="Page navigation" listClassName="progress-border-primary pagination-primary">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={handlePrevPage} />
      </PaginationItem>

      {pageNumbers.map((number) => (
        <PaginationItem key={number} active={number === currentPage}>
          <PaginationLink onClick={() => handlePageChange(number)}>{number}</PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={handleNextPage} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationList;
