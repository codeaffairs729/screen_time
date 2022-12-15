import { useEffect, useMemo, useRef } from "react";
// import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import debounce from "debounce-promise";
import Link from "next/link";
// import clsx from "clsx";

const OrganizationPagination = ({
    totalPages,
    setCurrentPageNo,
    currentPageNo,
}: {
    totalPages: number;
    setCurrentPageNo: (newPageNo: number) => void;
    currentPageNo: number;
}) => {
    const pageNoInputRef = useRef<HTMLInputElement>(null);
    // const debouncedSetCurrentPageNo = useMemo(
    //     () => debounce((newPageNo: number) => setCurrentPageNo(newPageNo), 500),
    //     []
    // );
    useEffect(() => {
        // if (pageNoInputRef.current)
        //     pageNoInputRef.current.value = `${currentPageNo}`;
            setCurrentPageNo(1);
    }, [totalPages]);

    if (totalPages < 1) return <div />;

    // const isPageNoValid = (next: number) =>
    //     Number(pageNoInputRef?.current?.value ?? 1) + next > 0 &&
    //     Number(pageNoInputRef?.current?.value ?? 1) + next <= totalPages;

    const pageNumbers = [];
    console.log("current page : ", currentPageNo);
    for (let i = 1; i <= totalPages; i++) {
        if (
            i <= 1 ||
            i >= totalPages - 1 ||
            (i >= currentPageNo - 1 && i <= currentPageNo + 1)
        ) {
            pageNumbers.push(
                <a
                    onClick={() => {
                        setCurrentPageNo(i);
                    }}
                    className={
                        (currentPageNo == i)
                            ? "bg-dtech-main-light px-3 py-2 leading-tight font-semibold  hover:bg-dtech-main-light hover:text-dtech-dark-grey cursor-pointer"
                            : "px-3 py-2 leading-tight font-semibold hover:bg-dtech-main-light hover:text-dtech-dark-grey cursor-pointer "
                    }
                >
                    <span>{i}</span>
                </a>
            );
        } else {
            pageNumbers.push(<div>...</div>);
            i = i < currentPageNo ? currentPageNo - 2 : totalPages - 2;
        }
    }

    return (
        <div className="flex items-center justify-center my-4 text-xs text-gray-700 font-light">
            <span className="font-semibold mr-4">Page</span>
            {pageNumbers.map((page, index) => page)}
        </div>
    );
};

export default OrganizationPagination;
