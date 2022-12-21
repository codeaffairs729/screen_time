import { useState, useEffect } from "react";
import QualityInsightsHeader from "./quality_insights/header";
import QualityInsightsSection from "./quality_insights/section";
import SearchTermHeader from "./search_term_section/header";
import DownloadHeader from "./download_section/header";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import SearchTermSection from "./search_term_section/section";
import DownloadSection from "./download_section/section";
import TabHeaders from "./tabs";
const Insights = () => {
    enum tabIndex {
        datasetQuality,
        SearchTerm,
        downloadMatrics,
    }
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<string>("");
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<string>("");
    const [selectedDownload, setSelectedDownload] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [selected, setSelected] = useState<number>(0);
    useEffect(() => {
        setSelectedIndex(tabIndex[selected]);
        setLoading(false);
    }, []);
    return (
        <div>
            <div className="mb-6 ml-10">
                {!loading && (
                    <Tab.Group defaultIndex={selectedIndex}>
                        <TabHeaders
                            selectedIndex={selectedIndex}
                            selectedQualityInsights={selectedQualityInsights}
                            setSelectedQualityInsights={
                                setSelectedQualityInsights
                            }
                            selectedSearchTerm={selectedSearchTerm}
                            setSelectedSearchTerm={setSelectedSearchTerm}
                            selectedDownload={selectedDownload}
                            setSelectedDownload={setSelectedDownload}
                            setSelected={setSelected}
                            selected={selected}
                        />
                        <Tab.Panels>
                            <Tab.Panel>
                                <QualityInsightsSection
                                    selectedLabel={selectedQualityInsights}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <SearchTermSection />
                            </Tab.Panel>
                            <Tab.Panel>
                                <DownloadSection selectedLabel={selectedDownload}/>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </div>
    );
};

export default Insights;
