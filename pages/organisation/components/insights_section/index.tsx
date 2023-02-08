import { useState, useEffect } from "react";
import QualityInsightsSection from "./quality_insights/section";
import { Tab } from "@headlessui/react";
import SearchTermSection from "./search_term_section/section";
import DownloadSection from "./download_section/section";
import TabHeaders from "./tabs";
import SearchTermVM, {
    SearchTermVMContext,
} from "./search_term_section/search_term.vm";
import DownloadMetricVM, {
    DownloadMetricVMContext,
} from "./download_section/download_metric.vm";
import QualityMetricVM, {
    QualityMetricVMContext,
} from "./quality_insights/quality_metric.vm";
import Loader from "components/UI/loader";

const Insights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const [loading, Setloading] = useState(true);
    const qualityMetricVm = QualityMetricVM();
    const searchTermVm = SearchTermVM();
    const downloadMetricVm = DownloadMetricVM();

    useEffect(() => {
        Setloading(false);
        return ()=> { Setloading(true);}
    }, []);

    if (loading) {
        return (
            <div className="h-[calc(40vh-var(--nav-height))] w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {!loading && (
                <QualityMetricVMContext.Provider value={qualityMetricVm}>
                    <SearchTermVMContext.Provider value={searchTermVm}>
                        <DownloadMetricVMContext.Provider
                            value={downloadMetricVm}
                        >
                            <div className="mb-6">
                                <Tab.Group selectedIndex={selectedInsightTab}>
                                    <TabHeaders
                                        setSelectedInsightTab={
                                            setSelectedInsightTab
                                        }
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
                        </DownloadMetricVMContext.Provider>
                    </SearchTermVMContext.Provider>
                </QualityMetricVMContext.Provider>
            )}
        </div>
    );
};

export default Insights;
