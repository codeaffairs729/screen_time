import { Fragment, useContext } from "react";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  totalPages,
  setCurrentPageNo,
  currentPageNo,
}: {
  totalPages: number;
  setCurrentPageNo: (newPageNo: number) => void;
  currentPageNo: number;
}) => {
  if (totalPages < 1) return <div />;

  return (
    <div className="mx-auto flex items-center justify-center space-x-2 my-4">
      <button
        type="button"
        className="focus:outline-none h-6 disabled:text-gray-500"
        disabled={currentPageNo == 1}
        onClick={() => setCurrentPageNo(Math.max(currentPageNo - 1, 1))}
      >
        <FaChevronLeft />
      </button>
      <div className="flex">
        {totalPages <= 6 &&
          [...Array(totalPages)].map((_, i) => (
            <PageNoItem
              pageNo={i + 1}
              key={i + 1}
              setCurrentPageNo={setCurrentPageNo}
              currentPageNo={currentPageNo}
            />
          ))}
        {totalPages > 6 && [
          currentPageNo > 2 && (
            <Fragment key={1}>
              <PageNoItem
                pageNo={1}
                key={1}
                setCurrentPageNo={setCurrentPageNo}
                currentPageNo={currentPageNo}
              />
              {currentPageNo > 3 && (
                <span className="mx-2" key="first-dots">
                  ...
                </span>
              )}
            </Fragment>
          ),
          currentPageNo > 1 && (
            <PageNoItem
              pageNo={currentPageNo - 1}
              key={currentPageNo - 1}
              setCurrentPageNo={setCurrentPageNo}
              currentPageNo={currentPageNo}
            />
          ),
          <PageNoItem
            pageNo={currentPageNo}
            key={currentPageNo}
            setCurrentPageNo={setCurrentPageNo}
            currentPageNo={currentPageNo}
          />,
          currentPageNo < totalPages && (
            <PageNoItem
              pageNo={currentPageNo + 1}
              key={currentPageNo + 1}
              setCurrentPageNo={setCurrentPageNo}
              currentPageNo={currentPageNo}
            />
          ),
          currentPageNo < totalPages - 1 && (
            <Fragment key={totalPages}>
              {currentPageNo < totalPages - 2 && (
                <span className="mx-2" key="last-dots">
                  ...
                </span>
              )}
              <PageNoItem
                pageNo={totalPages}
                key={totalPages}
                setCurrentPageNo={setCurrentPageNo}
                currentPageNo={currentPageNo}
              />
            </Fragment>
          ),
        ]}
      </div>
      <button
        type="button"
        className="focus:outline-none h-6 disabled:text-gray-500"
        disabled={currentPageNo == totalPages}
        onClick={() => setCurrentPageNo(Math.min(currentPageNo + 1, totalPages))}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

const PageNoItem = ({
  pageNo,
  setCurrentPageNo,
  currentPageNo,
}: {
  pageNo: number;
  setCurrentPageNo: (pageNo: number) => void;
  currentPageNo: number;
}) => {
  return (
    <button
      key={pageNo}
      onClick={() => setCurrentPageNo(pageNo)}
      disabled={currentPageNo == pageNo}
      className={clsx(
        "px-2 h-6 flex items-center justify-center border border-gray-800 text-sm font-medium cursor-pointer",
        currentPageNo == pageNo ? "text-dtech-secondary-dark" : ""
      )}
    >
      {pageNo}
    </button>
  );
};

export default Pagination;
