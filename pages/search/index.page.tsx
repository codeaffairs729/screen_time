import DefaultLayout from "components/layouts/default";
// import Dataset from "./components/dataset";
// import { error } from "loglevel";
// import datasets from "pages/organisation/components/datasets";
import ResultLayout from "./components/result_layout";
import SearchHeaders from "./components/search_headers";
import Sidebar from "./components/sidebar/sidebar";
import SearchVM, {
    SearchVMContext,
    // datasetToResultCardData,
} from "./search.vm";
import { datasetToResultCardData } from "common/utils/datasets.util";
import Pagination from "components/UI/pagination_for_datasets";
import LoadingDatasetSearchCard from "components/UI/loading_dataset_search_card";

const SearchPage = () => {
    const vm = SearchVM();
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
    } = vm;
    return (
        <DefaultLayout>
            <SearchVMContext.Provider value={vm}>
                {/* <Dataset /> */}
                <div className="flex relative bg-white min-h-screen">
                    <Sidebar className="md:w-1/5 shrink-0" />
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
                        {!isFetchingStats ? (
                            <>
                                <ResultLayout
                                    error={error}
                                    isLoading={isLoading}
                                    recordsData={datasetToResultCardData(
                                        datasets,
                                        stats
                                    )}
                                    className="-mt-[18px] mx-4"
                                />
                                <div className="my-14">
                                    <Pagination
                                        currentPage={currentPageNo}
                                        setPageNumber={setCurrentPageNo}
                                        totalPages={totalPages}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="mt-20 ml-[-30px] w-[100%]">
                                <LoadingDatasetSearchCard />
                            </div>
                        )}
                    </div>
                </div>
            </SearchVMContext.Provider>
        </DefaultLayout>
    );
};

export default SearchPage;
