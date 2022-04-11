import DatasetSearchInput from "components/UI/dataset_search_input";
import DefaultLayout from "components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar/sidebar";
import SortbyField from "./components/sortby_field";
import SearchVM, { SearchVMContext } from "./search.vm";
import Pagination from "components/UI/pagination";

const SearchPage = () => {
  const vm = SearchVM();

  return (
    <DefaultLayout
      navContent={
        <DatasetSearchInput
          className="max-w-xs w-full ml-4"
          onChange={vm.onSearchChange}
        />
      }
    >
      <SearchVMContext.Provider value={vm}>
        <div className="flex">
          <Sidebar className="w-40 shrink-0" />
          <div className="overflow-x-auto w-full">
            <div className="text-right">
              <SortbyField />
            </div>
            <ResultTable />
            <Pagination
              currentPageNo={vm.currentPageNo}
              setCurrentPageNo={vm.setCurrentPageNo}
              totalPages={vm.totalPages}
            />
          </div>
        </div>
      </SearchVMContext.Provider>
    </DefaultLayout>
  );
};

export default SearchPage;
