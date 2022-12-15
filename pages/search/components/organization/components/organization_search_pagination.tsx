import OrganizationPagination from "components/UI/organizationPagination";
import { useContext, useState } from "react";
import { OrganizationSearchVMContext } from "pages/search/organisation.vm";

const OrganizationSearchPagination = () => {
    const vm = useContext(OrganizationSearchVMContext);
    return null;
    // return(
    // <OrganizationPagination
    //     currentPageNo={vm.currentPageNo}
    //     setCurrentPageNo={vm.setCurrentPageNo}
    //     totalPages={vm.totalPages}
    // />
    // )
};

export default OrganizationSearchPagination;
