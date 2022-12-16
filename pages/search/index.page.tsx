import DefaultLayout from "components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar/sidebar";
import SortbyField from "./components/sortby_field";
import SearchPagination from "./components/searchPagination";

const SearchPage = () => {
    return (
        <DefaultLayout>
            <div className="flex">
                <Sidebar className="w-40 shrink-0" />
                <div className="overflow-x-auto w-full">
                    <div className="flex items-center justify-between w-full">
                        <SearchPagination />
                        <SortbyField />
                    </div>
                    <ResultTable />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default SearchPage;
