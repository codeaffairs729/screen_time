import { useState } from "react";
import useSWR from "swr";
import DefaultLayout from "../../components/layouts/default";
import ResultTable from "./components/result_table";
import Sidebar from "./components/sidebar";
import SearchVM, { SearchVMContext } from "./search.vm";

const SearchPage = () => {
  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_DTECHTIVE_API_ROOT}/v2/dataset?searchterm=health`,
  //   (url) => fetch(url).then((res) => res.json())
  // );
  // if (error) return <p>Loading failed...</p>;
  // if (!data) return <h1>Loading...</h1>;
  const vm = SearchVM();

  return (
    <DefaultLayout>
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
