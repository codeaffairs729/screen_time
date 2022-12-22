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

enum tabIndex {
    dataset_quality,
    Search_term,
    download_metrics,
}

enum searchTerms {
    top_10 = 10,
    top_25 = 25,
}

const Insights = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<string>("");
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<any>(10);
    const [selectedDownload, setSelectedDownload] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<any>(0);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        setSelectedTab(tabIndex[selected]);
        setLoading(false);
    }, []);

    const onSearchTermChange = (selectedTermsCount: string) => {
        setSelectedSearchTerm(searchTerms[selectedTermsCount as any]);
    };

    return (
        <div>
            <div className="mb-6 ml-10">
                {!loading && (
                    <Tab.Group selectedIndex={selectedTab}>
                        <TabHeaders
                            setSelectedQualityInsights={
                                setSelectedQualityInsights
                            }
                            setSelectedSearchTerm={onSearchTermChange}
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
