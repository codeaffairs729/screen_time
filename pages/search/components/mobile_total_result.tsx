const MobileTotalResult = ({
    pageSize,
    totalPages,
    totalRecords,
    currentPage,
}: {
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    currentPage: number;
}) => {
    const pageResult =
        totalPages == currentPage
            ? totalRecords - pageSize * (currentPage - 1)
            : pageSize;

    return (
        <div className="block md:hidden absolute right-3 top-[-10px]">
            <div className="flex justify-end mx-1 px-2 my-10 text-base">
                <span>
                    Showing {pageResult} out of {totalRecords} results
                </span>
            </div>
        </div>
    );
};

export default MobileTotalResult;
