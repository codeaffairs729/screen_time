import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import TabHeaders from "pages/workspace/components/tabs";
import DatasetTabHeaders from "./tabs";
import DatasetQualityInsightsBody from "./data_quality/section";


const DatasetInsights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);

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
                            {/* <SearchTermSection /> */}
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* <DownloadSection /> */}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};
export default DatasetInsights;