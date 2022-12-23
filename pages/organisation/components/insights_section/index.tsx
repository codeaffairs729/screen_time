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

enum qualityInsights {
    data_file,
    metadata,
}

enum download {
    by_region,
    by_time,
    by_user_type,
}

const Insights = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<any>(0);
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<any>(10);
    const [selectedDownload, setSelectedDownload] = useState<any>(0);
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

    const onQulaityTypeChange = (label: string) => {
        setSelectedQualityInsights(qualityInsights[label as any]);
    };

    const onDownloadTypeChange = (label: string) => {
        setSelectedDownload(download[label as any]);
    };

    return (
        <div>
            <div className="mb-6 ml-10">
                {!loading && (
                    <Tab.Group selectedIndex={selectedTab}>
                        <TabHeaders
                            setSelectedQualityInsights={onQulaityTypeChange}
                            setSelectedSearchTerm={onSearchTermChange}
                            setSelectedDownload={onDownloadTypeChange}
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
