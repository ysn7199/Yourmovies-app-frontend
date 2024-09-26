import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200 text-gray-800">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
