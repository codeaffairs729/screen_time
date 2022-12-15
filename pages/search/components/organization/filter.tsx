import OrganizationSearchPagination from "./components/organization_search_pagination";
import OrganizationSortBy from "./components/organization_sortby_field";
import OrganizationTotal from "./components/organization_total";

const OrganizationFilter = () => {
    return (
        <div className="flex items-center justify-between w-full p-2.5">
            <OrganizationTotal />
            <OrganizationSearchPagination/>
            <OrganizationSortBy/>
        </div>
    );
};
export default OrganizationFilter;
