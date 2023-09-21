import RecordsSortBy from "../organisation/components/organization_sortby_field";
import TotalRecords from "../organisation/components/total_records";
import Pagination from "components/UI/pagination_for_datasets";
import SortbyField from "./sortby_field";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
import MobileTotalResult from "./mobile_total_result";
import clsx from "clsx";

type SearchHeadersProps = {
    setCurrentPageNo: Function;
    setPageSize: Function;
    totalRecords: number;
    currentPageNo: number;
    totalPages: number;
    pageSize: number;
    recordType?: string;
    headerClass?: string;
    dropDownClass?: string;
    totalRecordHeader?: string;
};

const SearchHeaders = ({
    setCurrentPageNo,
    setPageSize,
    totalRecords,
    currentPageNo,
    totalPages,
    pageSize,
    recordType,
    headerClass,
    dropDownClass,
    totalRecordHeader
}: SearchHeadersProps) => {
    const vm = useContext(SearchVMContext);
    return (
        <div>
            <div className="hidden md:block">
                <div className={clsx("flex lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 px-4 m-4 md:my-10 ", headerClass)}>
                    <TotalRecords
                        totalRecords={totalRecords}
                        setPageSize={setPageSize}
                        pageSize={pageSize}
                        setPageNumber={setCurrentPageNo}
                        totalRecordHeader ={totalRecordHeader}
                        dropDownClass= {dropDownClass}
                    />
                    {recordType == "datasets" && (
                        <SortbyField />
                    ) 
                    }
                </div>
            </div>
            {!vm.showMobileSidebar && recordType == "datasets" && (
                <MobileTotalResult
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    currentPage={currentPageNo}
                />
            )}
        </div>
    );
};
export default SearchHeaders;

