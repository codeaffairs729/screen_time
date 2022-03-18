import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
import TableBody from "./table_body";
import TableHeader from "./table_header";

const ResultTable = () => {
  const vm = useContext(SearchVMContext);
  if (vm.error) {
    return (
      <div className="w-full flex items-start justify-center">
        <ErrorAlert
          className="max-w-xl mx-auto"
          message="Something went wrong while fetching datasets. Please try again later."
        />
      </div>
    );
  }

  if (vm.isLoading) {
    return (
      <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid gap-px [grid-template-columns:2fr_repeat(5,120px)] p-px">
      <TableHeader />
      <TableBody />
    </div>
  );
};

export default ResultTable;
