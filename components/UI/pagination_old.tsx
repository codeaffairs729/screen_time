import { useEffect, useMemo, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import debounce from "debounce-promise";
import clsx from "clsx";

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
  useEffect(() => {
    if (pageNoInputRef.current)
      pageNoInputRef.current.value = `${currentPageNo}`;
  }, [currentPageNo]);

  if (totalPages < 1) return <div />;

  const isPageNoValid = (next: number) =>
    Number(pageNoInputRef?.current?.value ?? 1) + next > 0 &&
    Number(pageNoInputRef?.current?.value ?? 1) + next <= totalPages;

  return (
    <div className="flex items-center justify-center my-4 text-xs text-gray-700 font-light">
      <span className="">Page:</span>
      <input
        min={1}
        max={totalPages}
        type="number"
        className="w-7 px-1 p-0.5 text-xs rounded border-gray-400 mx-1 appearance-none"
        defaultValue={1}
        ref={pageNoInputRef}
        onKeyDown={(e) => {
          if (e.key == "Enter" && pageNoInputRef.current && isPageNoValid(0)) {
            setCurrentPageNo(Number(pageNoInputRef.current.value));
          }
        }}
      />
      <span className="">
        of{" "}
        <span className="font-medium">
          {totalPages} {JSON.stringify(isPageNoValid)}
        </span>
      </span>
      <span className="flex space-x-1">
        <button
          className="overflow-hidden w-5"
          onClick={() => {
            const newPageNo = Number(pageNoInputRef?.current?.value ?? 0) - 1;
            if (isPageNoValid(-1)) {
              debouncedSetCurrentPageNo(newPageNo);
              if (pageNoInputRef.current) {
                pageNoInputRef.current.value = newPageNo.toString();
              }
            }
          }}
        >
          <AiFillCaretLeft
            className={clsx(
              "text-2xl relative -right-0.5",
              `${
                isPageNoValid(-1)
                  ? "text-dtech-secondary-light"
                  : "text-gray-500"
              }`
            )}
          />
        </button>
        <button
          className="overflow-hidden w-5"
          onClick={() => {
            const newPageNo = Number(pageNoInputRef?.current?.value ?? 0) + 1;
            if (isPageNoValid(1)) {
              debouncedSetCurrentPageNo(newPageNo);
              if (pageNoInputRef.current) {
                pageNoInputRef.current.value = newPageNo.toString();
              }
            }
          }}
        >
          <AiFillCaretRight
            className={clsx(
              "text-2xl relative -left-1",
              `${
                isPageNoValid(1)
                  ? "text-dtech-secondary-light"
                  : "text-gray-500"
              }`
            )}
          />
        </button>
      </span>
      <style jsx global>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
