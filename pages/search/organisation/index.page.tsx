import DefaultLayout from "components/layouts/default";
// import Organisation from ".";
import OrganizationSearchVM, {
    OrganizationSearchVMContext,
} from "./organisation.vm";
import SearchHeaders from "../components/search_headers";
import ResultLayout from "../components/result_layout";
import { Data } from "components/UI/result_card";
import ResultLayoutCard from "./components/result_card_layout";
import Pagination from "components/UI/pagination_for_datasets";

const OrganisationSearch = () => {
    // return (
    //     <div>
    //         yolo
    //     </div>
    // )
    const vm = OrganizationSearchVM();
    const {
        setCurrentPageNo,
        setPageSize,
        currentPageNo,
        totalPages,
        pageSize,
        totalRecords,
        organisations,
        isFetchingOrganisation,
    } = vm;
    return (
        <DefaultLayout className=" !bg-white">
            {/* <div className="flex ml-1">
                <Organisation />
            </div> */}
            <OrganizationSearchVMContext.Provider value={vm}>
                <SearchHeaders
                    setCurrentPageNo={setCurrentPageNo}
                    setPageSize={setPageSize}
                    totalRecords={totalRecords}
                    currentPageNo={currentPageNo}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    recordType={"organisation"}
                    headerClass={" bg-[#EBEBEB] !px-1 !py-1 rounded-full"}
                    dropDownClass={" !mt-[-1px] !bg-[#FFFFFF]"}
                    totalRecordHeader={" ml-[20px] mr-[-10px]"}
                />
                <ResultLayoutCard
                    error={false}
                    isLoading={isFetchingOrganisation}
                    recordsData={organisationToResultCardData(organisations)}
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
            </OrganizationSearchVMContext.Provider>
        </DefaultLayout>
    );
};

export default OrganisationSearch;

export const organisationToResultCardData = (organisations: any): Data[] => {
    if (!organisations?.length) {
        return [];
    }

    return organisations?.map((organisation: any) => ({
        ...organisation,
        id: organisation?.uuid,
        recordType: "organisation",
    }));
};
