import DefaultLayout from "components/layouts/default";
import SummarySection from "./components/summary_section";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";
import { Tab } from "@headlessui/react";
import SummaryStatistics from "./components/summary_statitics";
import TabHeader from "./components/tab_header";
import FeedbackSection from "./components/feedback_section";

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
          <div className="w-2/3 border">
            {/* <DetailTabs /> */}
            <Tab.Group>
              <Tab.List className="flex justify-between border-b-2 border-gray-400">
                <TabHeader>Summary Statistics</TabHeader>
                <TabHeader>Feedback</TabHeader>
                <TabHeader>You may also like</TabHeader>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <SummaryStatistics />
                </Tab.Panel>
                <Tab.Panel>
                  <FeedbackSection />
                </Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </DatasetDetailVMContext.Provider>
    </DefaultLayout>
  );
};

export default DatasetDetailPage;
