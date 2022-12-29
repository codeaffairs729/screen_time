import { useEffect, useMemo, useRef } from "react";
// import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import debounce from "debounce-promise";
import Link from "next/link";
// import clsx from "clsx";

const Pagination = ({
    totalPages,
    setCurrentPageNo,
    currentPageNo,
}: {
    totalPages: number;
    setCurrentPageNo: Function;
    currentPageNo: number;
}) => {
    useEffect(() => {
        setCurrentPageNo(1);
    }, [totalPages]);

    if (totalPages < 1) return null;

    const debouncedSetCurrentPageNo = debounce(
        (newPageNo: number) => setCurrentPageNo(newPageNo),
        500
    );

    const pageNumbers = Array(totalPages)
        .fill(1)
        .map((x, y) => x + y);

    const isValidPageNumber = (index: number) => {
        const isInBound =
            index >= currentPageNo - 1 && index <= currentPageNo + 1;

        return index <= 1 || index >= totalPages || isInBound;
    };

    const showExtendedDots = (index: number) => {
        if (currentPageNo - 1 >= 3 || totalPages - currentPageNo >= 3) {
            return currentPageNo - 2 == index || currentPageNo + 2 == index;
        }
        return false;
    };

    return (
        <div className="flex items-center justify-center my-4 text-xs text-gray-700 font-light">
            <span className="font-medium text-[17px] mr-4">Page</span>
            {pageNumbers.map((index) =>
                isValidPageNumber(index) ? (
                    <a
                        key={index}
                        onClick={() => {
                            debouncedSetCurrentPageNo(index);
                        }}
                        className={`${
                            currentPageNo == index && "bg-dtech-main-light"
                        } px-2 leading-tight font-medium hover:bg-dtech-main-light hover:text-dtech-dark-grey cursor-pointer rounded-sm`}
                    >
                        <span className="text-[17px]">{index}</span>
                    </a>
                ) : (
                    showExtendedDots(index) && (
                        <div
                            key={index}
                            className="px-1 font-medium text-[17px]"
                        >
                            ...
                        </div>
                    )
                )
            )}
        </div>
    );
};

export default Pagination;
