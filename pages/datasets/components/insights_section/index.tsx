import { useState, useEffect, useContext } from "react";
import { Tab } from "@headlessui/react";
import DatasetTabHeaders from "./tabs";
import DatasetQualityInsightsBody from "./data_quality/section";
import DatasetUseCasesBody from "./use_cases/section";
import DatasetDownloadMetricsBody from "./download_metrics/section";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";


const DatasetInsights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const vm = useContext(DatasetDetailVMContext);

    return (
        <div>
            <div className="mb-6">
                <Tab.Group selectedIndex={selectedInsightTab}>
                    <DatasetTabHeaders
                        setSelectedInsightTab={setSelectedInsightTab}
                        selectedInsightTab={selectedInsightTab}
                    />
                    <Tab.Panels>
                        <Tab.Panel>
                            <DatasetQualityInsightsBody />
                        </Tab.Panel>
                        <Tab.Panel>
                            <DatasetUseCasesBody />
                        </Tab.Panel>
                        <Tab.Panel>
                            <DatasetDownloadMetricsBody />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};
export default DatasetInsights;