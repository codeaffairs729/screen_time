import { useContext } from "react";
import ResultLayout from "../components/result_layout";
import {
    organisationToResultCardData,
    OrganizationSearchVMContext,
} from "./organisation.vm";
import SearchHeaders from "../components/search_headers";

const Organisation = () => {
    const {
        setCurrentPageNo,
        setPageSize,
        currentPageNo,
        totalPages,
        pageSize,
        totalRecords,
        organisations,
        isFetchingOrganisation,
    } = useContext(OrganizationSearchVMContext);

    return (
        <div className="overflow-x-auto w-full min-h-[calc(100vh-var(--nav-height))]">
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
        </div>
    );
};

export default Organisation;
