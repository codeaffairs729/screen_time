import DefaultLayout from "components/layouts/default";
import OrganizationFilter from "./components/organization/filter";
import OraganizationTable from "./components/organization/components/organization_table";
const OrganisationSearch = () => {
    return (
        <DefaultLayout>
            <div className="flex ml-1">
                <div className="overflow-x-auto w-full">
                    <OrganizationFilter />
                    <OraganizationTable />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default OrganisationSearch;
