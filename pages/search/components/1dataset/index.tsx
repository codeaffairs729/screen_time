import {
    // datasetToResultCardData,
    SearchVMContext,
} from "pages/search/search.vm";
import { useContext, useLayoutEffect } from "react";
import SearchHeaders from "../search_headers";
import ResultLayout from "../result_layout";
import Sidebar from "../sidebar/sidebar";
import { datasetToResultCardData } from "common/utils/datasets.util";

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
        <div className="flex relative">
            <Sidebar className="md:w-48 shrink-0" />
            <div className="overflow-x-auto w-full">
                <SearchHeaders
                    setCurrentPageNo={setCurrentPageNo}
                    setPageSize={setPageSize}
                    totalRecords={totalRecords}
                    currentPageNo={currentPageNo}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    recordType={"datasets"}
                />
                {!isFetchingStats && (
                    <ResultLayout
                        error={error}
                        isLoading={isLoading}
                        recordsData={datasetToResultCardData(datasets, stats)}
                        className="-mt-[18px] mx-4"
                    />
                )}
            </div>
        </div>
    );
};

export default Dataset;
