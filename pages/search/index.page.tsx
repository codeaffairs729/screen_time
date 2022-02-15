import DatasetSearchInput from "components/UI/dataset_search_input";
import DefaultLayout from "../../components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar";
import SearchVM, { SearchVMContext } from "./search.vm";

const SearchPage = () => {
  const vm = SearchVM();

  return (
    <DefaultLayout
      navContent={
        <DatasetSearchInput
          className="max-w-xs w-full pt-4 px-4"
          onChange={vm.onSearchChange}
        />
      }
    >
      <SearchVMContext.Provider value={vm}>
        <div className="flex">
          <Sidebar className="w-24" />
          {/* <div className="w-full"> */}
          <ResultTable />
          {/* </div> */}
        </div>
      </SearchVMContext.Provider>
    </DefaultLayout>
  );
};

export default SearchPage;
