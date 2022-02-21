import DefaultLayout from "components/layouts/default";
import DetailTabs from "./components/detail_tabs";
import SummarySection from "./components/summary_section";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";

const DatasetDetailPage = () => {
  const vm = DatasetDetailVM();
  return (
    <DefaultLayout>
      {/* <SearchVMContext.Provider value={vm}>
      <div className="flex">
        <Sidebar className="w-40 shrink-0" />
        <ResultTable />
      </div>
    </SearchVMContext.Provider> */}

      <DatasetDetailVMContext.Provider value={vm}>
        <div className="flex">
          <div className="w-1/3">
            <SummarySection />
          </div>
          <div className="w-2/3">
            <DetailTabs />
          </div>
        </div>
      </DatasetDetailVMContext.Provider>
    </DefaultLayout>
  );
};

export default DatasetDetailPage;
