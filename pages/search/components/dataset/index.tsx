import {
    datasetToResultCardData,
    SearchVMContext,
} from "pages/search/search.vm";
import { useContext } from "react";
import SearchHeaders from "../search_headers";
import ResultLayout from "../result_layout";
import Sidebar from "../sidebar/sidebar";

const Dataset = () => {
    const {
        setCurrentPageNo,
        setPageSize,
        currentPageNo,
        totalPages,
        pageSize,
        error,
        isLoading,
        totalRecords,
        datasets,
        stats,
        isFetchingStats,
    } = useContext(SearchVMContext);
    return (
        <div className="flex">
            <Sidebar className="w-48 shrink-0" />
            <div className="overflow-x-auto w-full">
                <SearchHeaders
                    setCurrentPageNo={setCurrentPageNo}
                    setPageSize={setPageSize}
                    totalRecords={totalRecords}
                    currentPageNo={currentPageNo}
                    totalPages={totalPages}
                    pageSize={pageSize}
                />
                {!isFetchingStats && (
                    <ResultLayout
                        error={error}
                        isLoading={isLoading}
                        recordsData={datasetToResultCardData(datasets, stats)}
                    />
                )}
            </div>
        </div>
    );
};

export default Dataset;
