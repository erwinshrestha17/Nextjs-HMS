
import React, {} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, prevPage }) => {
    return (
        <div className="flex justify-between items-center mt-6">
            <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Prev
            </button>
            <div>
                Page {currentPage} of {totalPages}
            </div>
            <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
