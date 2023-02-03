import DefaultLayout from "components/layouts/default";
import Organisation from "./components/organization";

const OrganisationSearch = () => {
    return (
        <DefaultLayout page="organisation">
            <div className="flex ml-1">
                <Organisation />
            </div>
        </DefaultLayout>
    );
};

export default OrganisationSearch;
