import DefaultLayout from "../../components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar";

const SearchPage = () => {
  return (
    <DefaultLayout>
      <div className="flex">
        <Sidebar className="w-24" />
        <div className="w-full">
          <ResultTable />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SearchPage;
