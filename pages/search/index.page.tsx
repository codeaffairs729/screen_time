import DefaultLayout from "components/layouts/default";
import Dataset from "./components/dataset";

const SearchPage = () => {
    return (
        <DefaultLayout page="dataset">
            <Dataset />
        </DefaultLayout>
    );
};

export default SearchPage;
