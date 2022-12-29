import { useContext } from "react";
import ResultLayout from "../result_layout";
import {
    organisationToResultCardData,
    OrganizationSearchVMContext,
} from "./organisation.vm";
import SearchHeaders from "../search_headers";

const Organisation = () => {
    const {
        setCurrentPageNo,
        setPageSize,
        currentPageNo,
        totalPages,
        pageSize,
        totalRecords,
        organisations,
    } = useContext(OrganizationSearchVMContext);

    return (
        <div className="overflow-x-auto w-full">
            <SearchHeaders
                setCurrentPageNo={setCurrentPageNo}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                currentPageNo={currentPageNo}
                totalPages={totalPages}
                pageSize={pageSize}
            />
            <ResultLayout
                error={false} //TODO to get from organisation vm
                isLoading={false} //TODO to get from organisation vm
                recordsData={organisationToResultCardData(organisations)}
            />
        </div>
    );
};

export default Organisation;
