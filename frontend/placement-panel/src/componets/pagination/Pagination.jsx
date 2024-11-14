import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({currentPage,totalPages,onPageChange,visiblePages = 5}) => {
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="justify-content-center mt-4">
      {currentPage > 1 && (
        <>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        </>
      )}

      {pageNumbers.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {currentPage < totalPages && (
        <>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
