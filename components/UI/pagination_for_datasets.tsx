import React from 'react';

const Pagination = ({ currentPage, totalPages, setPageNumber }
    : { currentPage: number, totalPages: number, setPageNumber: Function }) => {
    const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const renderPageNumbers = () => {
        const pageCount = 5; // Total page numbers to display (2 on left, current, 2 on right)
        const visibleRange = 2; // Number of page numbers on each side of the current page

        const pageNumbers = [];

        // Calculate the range of page numbers to show
        const startPage = Math.max(1, currentPage - visibleRange);
        var endPage = Math.min(currentPage + visibleRange);
        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        // Add page numbers and ellipses
        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // if (endPage < totalPages) {
        //     pageNumbers.push(totalPages);
        // }
        // if (currentPage < pageNumbers.length-2) {
        //     pageNumbers.splice(pageNumbers.length-1,1)
        // }
        // console.log(pageNumbers)
        const filteredPageNumbers = pageNumbers.filter((number) => number === "..." || number <= JSON.parse(`${totalPages}`));


        return <div
            className="flex items-center lg:justify-center text-xs text-gray-700 font-light">
            <span className="font-medium text-sm mr-4">Page</span>
            {
                filteredPageNumbers.map((pageNumber, index) => (
                    typeof pageNumber === 'number'?
                    <a
                        key={index}
                        onClick={() => setPageNumber(pageNumber)}
                        className={`${
                            currentPage == pageNumber && "bg-dtech-main-light"
                        } px-2 leading-tight font-medium hover:bg-dtech-main-light hover:text-dtech-dark-grey cursor-pointer rounded-sm`}
                    >
                        <span className="text-[17px]">{pageNumber}</span>
                        </a>
                        :
                        <a
                            key={index}
                            // onClick={() => setPageNumber(pageNumber)}
                            // className={`${currentPage == index && "bg-dtech-main-dark"
                            //     } px-2 leading-tight font-medium hover:bg-dtech-main-light hover:text-dtech-dark-grey cursor-pointer rounded-sm`}
                        >
                            <span className="text-[17px]">{pageNumber}</span>
                        </a>

                    
                ))
            }
        </div>
    };

    return <div className="pagination">{renderPageNumbers()}</div>;
};

export default Pagination;
