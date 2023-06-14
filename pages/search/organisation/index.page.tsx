import DefaultLayout from "components/layouts/default";
// import Organisation from ".";
import OrganizationSearchVM, { OrganizationSearchVMContext } from "./organisation.vm";
import SearchHeaders from "../components/search_headers";
import ResultLayout from "../components/result_layout";
import { Data } from "components/UI/result_card";

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
        <DefaultLayout>
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
            />
            <ResultLayout
                error={false} //TODO to get from organisation vm
                isLoading={isFetchingOrganisation} //TODO to get from organisation vm
                recordsData={organisationToResultCardData(organisations)}
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
