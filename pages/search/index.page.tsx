import DefaultLayout from "components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar/sidebar";
import SortbyField from "./components/sortby_field";
import SearchVM, { SearchVMContext } from "./search.vm";
import Pagination from "components/UI/pagination";

const SearchPage = () => {
  const vm = SearchVM();

  return (
    <DefaultLayout>
      <SearchVMContext.Provider value={vm}>
        <div className="flex">
          <Sidebar className="w-40 shrink-0" />
          <div className="overflow-x-auto w-full">
            <div className="flex items-center justify-between w-full">
              <Pagination
                currentPageNo={vm.currentPageNo}
                setCurrentPageNo={vm.setCurrentPageNo}
                totalPages={vm.totalPages}
              />
              <SortbyField />
            </div>
            <ResultTable />
          </div>
        </div>
      </SearchVMContext.Provider>
    </DefaultLayout>
  );
};

export default SearchPage;
