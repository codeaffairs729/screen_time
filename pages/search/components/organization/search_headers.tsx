import RecordsSortBy from "./components/organization_sortby_field";
import TotalRecords from "./components/total_records";
import Pagination from "components/UI/pagination";

type SearchHeadersProps = {
    setCurrentPageNo: Function;
    setPageSize: Function;
    totalRecords: number;
    currentPageNo: number;
    totalPages: number;
    pageSize: number;
};

const SearchHeaders = ({
    setCurrentPageNo,
    setPageSize,
    totalRecords,
    currentPageNo,
    totalPages,
    pageSize,
}: SearchHeadersProps) => {
    return (
        <div className="flex items-center justify-between w-full p-2.5">
            <TotalRecords
                totalRecords={totalRecords}
                setPageSize={setPageSize}
                pageSize={pageSize}
            />
            <Pagination
                currentPageNo={currentPageNo}
                setCurrentPageNo={setCurrentPageNo}
                totalPages={totalPages}
            />
            <RecordsSortBy />
        </div>
    );
};
export default SearchHeaders;
