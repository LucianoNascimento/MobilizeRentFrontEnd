import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, loading }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        if (endPage - startPage < maxPageNumbersToShow - 1) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`btn ${currentPage === i ? 'btn-active' : ''}`}
                    disabled={loading}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(<span key="startEllipsis">...</span>);
            pageNumbers.unshift(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={`btn ${currentPage === 1 ? 'btn-active' : ''}`}
                    disabled={loading}
                >
                    1
                </button>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(<span key="endEllipsis">...</span>);
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`btn ${currentPage === totalPages ? 'btn-active' : ''}`}
                    disabled={loading}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="btn btn-primary"
                disabled={currentPage === 1 || loading}
            >
                Anterior
            </button>
            <div className="space-x-2">
                {renderPageNumbers()}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="btn btn-primary"
                disabled={currentPage === totalPages || loading}
            >
                Próximo
            </button>
        </div>
    );
};

export default Pagination;
