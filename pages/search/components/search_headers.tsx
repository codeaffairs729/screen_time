import RecordsSortBy from "./organization/components/organization_sortby_field";
import TotalRecords from "./organization/components/total_records";
import Pagination from "components/UI/pagination";
import SortbyField from "./sortby_field";

type SearchHeadersProps = {
    setCurrentPageNo: Function;
    setPageSize: Function;
    totalRecords: number;
    currentPageNo: number;
    totalPages: number;
    pageSize: number;
    recordType?: string;
};

const SearchHeaders = ({
    setCurrentPageNo,
    setPageSize,
    totalRecords,
    currentPageNo,
    totalPages,
    pageSize,
    recordType,
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
            {recordType == "datasets" ? <SortbyField /> : <RecordsSortBy />}
        </div>
    );
};
export default SearchHeaders;
