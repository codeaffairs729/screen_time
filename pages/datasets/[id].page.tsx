import DefaultLayout from "components/layouts/default";
import SummarySection from "./components/summary_section";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";
import { Tab } from "@headlessui/react";
import SummaryStatistics from "./components/summary_statitics";
import TabHeader from "./components/tab_header";
import FeedbackSection from "./components/feedback_section";
import { NextPageContext } from "next";
import Http from "common/http";
import Dataset from "models/dataset.model";
import ErrorAlert from "components/UI/alerts/error_alert";
import MayAlsoLike from "./components/may_also_like";
import BackBtn from "components/UI/buttons/back_btn";
import log from "common/logger";
import { getCookieFromServer } from "common/utils/cookie.util";
import { AUTH_TOKEN } from "common/constants/cookie.key";

const DatasetDetailPage = ({ dataset }: { dataset: Dataset | undefined }) => {
  if (!dataset) {
    return (
      <DefaultLayout>
        <ErrorAlert
          className="max-w-xl mx-auto"
          message="Something went wrong while fetching dataset data. Please try again later."
        />
      </DefaultLayout>
    );
  }
  const vm = DatasetDetailVM(dataset);

  return (
    <DefaultLayout>
      <DatasetDetailVMContext.Provider value={vm}>
        <BackBtn />
        <div className="flex">
          <div className="w-1/3">
            <SummarySection />
          </div>
          <div className="w-2/3 border">
            <Tab.Group>
              <Tab.List className="flex justify-between border-b-2 border-gray-400">
                <TabHeader>Summary Statistics</TabHeader>
                <TabHeader>Feedback</TabHeader>
                <TabHeader>You may also like</TabHeader>
              </Tab.List>
              <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                <Tab.Panel className="w-full">
                  <SummaryStatistics />
                </Tab.Panel>
                <Tab.Panel className="w-full">
                  <FeedbackSection />
                </Tab.Panel>
                <Tab.Panel className="w-full">
                  <MayAlsoLike />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </DatasetDetailVMContext.Provider>
    </DefaultLayout>
  );
};

DatasetDetailPage.getInitialProps = async ({ query, req }: NextPageContext) => {
  try {
    const datasetId = query["id"];
    let authToken;
    if (req?.headers.cookie) {
      authToken = getCookieFromServer(AUTH_TOKEN, req);
    }
    const datasetData = await Http.get(`/v3/datasets/${datasetId}`, {
      baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
      extraHeaders: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    });
    const dataset = Dataset.fromJson(
      datasetData[0]["user_search"][0]["results"][0]
    );
    return { dataset };
  } catch (error) {
    return { dataset: undefined };
  }
};

export default DatasetDetailPage;
