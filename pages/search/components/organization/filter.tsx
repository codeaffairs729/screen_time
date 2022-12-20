import OrganizationSortBy from "./components/organization_sortby_field";
import OrganizationTotal from "./components/organization_total";
import Pagination from "components/UI/pagination";
import { OrganizationSearchVMContext } from "pages/search/organisation.vm";
import { useContext } from "react";

const OrganizationFilter = () => {
    const vm = useContext(OrganizationSearchVMContext);
    return (
        <div className="flex items-center justify-between w-full p-2.5">
            <OrganizationTotal />
            <Pagination
                currentPageNo={vm.currentPageNo}
                setCurrentPageNo={vm.setCurrentPageNo}
                totalPages={vm.totalPages}
            />
            <OrganizationSortBy />
        </div>
    );
};
export default OrganizationFilter;
