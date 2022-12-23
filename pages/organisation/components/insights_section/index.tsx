import { useState, useEffect } from "react";
import QualityInsightsSection from "./quality_insights/section";
// import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import SearchTermSection from "./search_term_section/section";
import DownloadSection from "./download_section/section";
import TabHeaders from "./tabs";

const Insights = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<number>(10);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div>
            <div className="mb-6 ml-10">
                {!loading && (
                    <Tab.Group selectedIndex={selectedInsightTab}>
                        <TabHeaders
                            setSelectedQualityInsights={
                                setSelectedQualityInsights
                            }
                            setSelectedSearchTerm={setSelectedSearchTerm}
                            setSelectedDownload={setSelectedDownload}
                            setSelectedInsightTab={setSelectedInsightTab}
                            selectedInsightTab={selectedInsightTab}
                        />
                        <Tab.Panels>
                            <Tab.Panel>
                                <QualityInsightsSection
                                    selectedLabel={selectedQualityInsights}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <SearchTermSection
                                    selectedSearchTerm={selectedSearchTerm}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <DownloadSection
                                    selectedLabel={selectedDownload}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </div>
    );
};

export default Insights;
