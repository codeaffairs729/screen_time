import React from "react";
import { BsChevronRight } from "react-icons/bs";

const Pagination = ({
    currentPage,
    totalPages,
    setPageNumber,
}: {
    currentPage: number;
    totalPages: number;
    setPageNumber: Function;
}) => {
    const range = (start: number, end: number) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);

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
            className="flex items-center lg:justify-center text-xs text-[#0065BD] font-light">
            {/* <span className="font-medium text-sm mr-4">Page</span> */}
            {
                filteredPageNumbers.map((pageNumber, index) => (
                    typeof pageNumber === 'number'?
                    <a
                        key={index}
                        onClick={() => setPageNumber(pageNumber)}
                        className={`${
                            currentPage == pageNumber && "bg-[#0065BD] bg-opacity-20"
                        } px-2 leading-tight font-normal hover:bg-[#0065BD] hover:bg-opacity-20 hover:text-[#0065BD] cursor-pointer rounded-sm mx-2`}
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

    return (
        <div className="pagination flex flex-row justify-center items-center my-4">
            <div>{totalPages >1 && renderPageNumbers()}</div>
            {/* {(totalPages > 1) || (totalPages > currentPage) &&
            (
            <div>
                <button
                    className=" flex flex-row items-center justify-center font-normal text-[#0065BD] text-lg"
                    onClick={() => setPageNumber(currentPage + 1)}
                >
                    <div>Next</div>
                    <BsChevronRight className="text-[#0065BD] mx-3 font-[100px] text-[20px]"  />
                </button>
            </div>
            )} */}
        </div>
    );
};

export default Pagination;
