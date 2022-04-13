import { Fragment, useContext, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  FaCaretLeft,
  FaCaretRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import debounce from "debounce-promise";

const Pagination = ({
  totalPages,
  setCurrentPageNo,
  currentPageNo,
}: {
  totalPages: number;
  setCurrentPageNo: (newPageNo: number) => void;
  currentPageNo: number;
}) => {
  const pageNoInputRef = useRef<HTMLInputElement>(null);
  const debouncedSetCurrentPageNo = useMemo(
    () => debounce((newPageNo: number) => setCurrentPageNo(newPageNo), 500),
    []
  );
  if (totalPages < 1) return <div />;

  return (
    <div className="flex items-center justify-center my-4 text-xs text-gray-700 font-light">
      <span className="">Page:</span>
      <input
        min={1}
        max={totalPages}
        type="number"
        className="w-10 px-1 p-0.5 text-xs rounded border-gray-400 mx-1"
        defaultValue={1}
        ref={pageNoInputRef}
        onKeyDown={(e) => {
          if (e.key == "Enter" && pageNoInputRef.current) {
            setCurrentPageNo(Number(pageNoInputRef.current.value));
          }
        }}
      />
      <span className="">
        of <span className="font-medium">{totalPages}</span>
      </span>
      <span className="flex space-x-1">
        <button
          className="overflow-hidden w-5"
          onClick={() => {
            const newPageNo = Number(pageNoInputRef?.current?.value ?? 0) - 1;
            if (newPageNo <= totalPages) {
              debouncedSetCurrentPageNo(newPageNo);
              if (pageNoInputRef.current) {
                pageNoInputRef.current.value = newPageNo.toString();
              }
            }
          }}
        >
          <AiFillCaretLeft className="text-2xl relative -right-0.5 text-dtech-secondary-light" />
        </button>
        <button
          className="overflow-hidden w-5"
          onClick={() => {
            const newPageNo = Number(pageNoInputRef?.current?.value ?? 0) + 1;
            if (newPageNo > 0) {
              debouncedSetCurrentPageNo(newPageNo);
              if (pageNoInputRef.current) {
                pageNoInputRef.current.value = newPageNo.toString();
              }
            }
          }}
        >
          <AiFillCaretRight className="text-2xl relative -left-1 text-dtech-secondary-light" />
        </button>
      </span>
    </div>
  );
};

export default Pagination;
