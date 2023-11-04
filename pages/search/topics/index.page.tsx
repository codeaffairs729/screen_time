import DefaultLayout from "components/layouts/default";
// import Organisation from ".";
import TopicSearchVM, { TopicSearchVMContext } from "./topics.vm";
import SearchHeaders from "../components/search_headers";
import ResultLayout from "../components/result_layout";
import { Data } from "components/UI/result_card";
import Pagination from "components/UI/pagination_for_datasets";
import TopicLayoutCard from "./components/topic_card_layout";

const TopicSearchPage = () => {
    const vm = TopicSearchVM();
    const {
        setCurrentPageNo,
        setPageSize,
        currentPageNo,
        totalPages,
        pageSize,
        totalRecords,
        topics,
        isFetchingOrganisation,
    } = vm;

    return (
        <DefaultLayout className=" !bg-white">
            <TopicSearchVMContext.Provider value={vm}>
                <SearchHeaders
                    setCurrentPageNo={setCurrentPageNo}
                    setPageSize={setPageSize}
                    totalRecords={totalRecords}
                    currentPageNo={currentPageNo}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    recordType={"topics"}
                    headerClass={" bg-[#EBEBEB] !px-1 !py-1 rounded-full"}
                    dropDownClass={" !mt-[-1px] !bg-[#FFFFFF]"}
                    totalRecordHeader={" ml-[20px] mr-[-10px]"}
                />
                <TopicLayoutCard
                    error={false}
                    isLoading={isFetchingOrganisation}
                    recordsData={TopicToResultCardData(topics)}
                    currentPage={currentPageNo}
                    pageSize={pageSize}
                    totalRecords={totalRecords}
                    totalPages={totalPages}
                />
                <Pagination
                    currentPage={currentPageNo}
                    setPageNumber={setCurrentPageNo}
                    totalPages={totalPages}
                />
            </TopicSearchVMContext.Provider>
        </DefaultLayout>
    );
};

export default TopicSearchPage;

export const TopicToResultCardData = (topics: any): Data[] => {
    if (!topics?.length) {
        return [];
    }
    return topics?.map((topic: any) => ({
        ...topic,
        id: topic?.uuid,
        recordType: "topic",
    }));
};
