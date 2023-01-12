import { useState, useEffect } from "react";
import QualityInsightsSection from "./quality_insights/section";
import { Tab } from "@headlessui/react";
import SearchTermSection from "./search_term_section/section";
import DownloadSection from "./download_section/section";
import TabHeaders from "./tabs";

const Insights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);

    return (
        <div>
            <div className="mb-6">
                <Tab.Group selectedIndex={selectedInsightTab}>
                    <TabHeaders
                        setSelectedInsightTab={setSelectedInsightTab}
                        selectedInsightTab={selectedInsightTab}
                    />
                    <Tab.Panels>
                        <Tab.Panel>
                            <QualityInsightsSection />
                        </Tab.Panel>
                        <Tab.Panel>
                            <SearchTermSection />
                        </Tab.Panel>
                        <Tab.Panel>
                            <DownloadSection />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default Insights;
