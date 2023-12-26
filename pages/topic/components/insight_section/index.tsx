import { useState, useEffect } from "react";
import Accordian from "components/UI/new_accordian";
import { Tab } from "@headlessui/react";
import dynamic from "next/dynamic";
const DownloadSection = dynamic(() => import("./download_section/section"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
});
const SearchTermSection = dynamic(
    () => import("./search_term_section/section"),
    {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
    }
);

import Loader from "components/UI/loader";

import { useIsMobile } from "common/hooks";

import QualityBody from "./quality_section/section";
import UseCaseBody from "./usecase_section/section";

import QualityMetricVM, {
    QualityMetricVMContext,
} from "./quality_section/quality_metric.vm";
import SearchTermVM, {
    SearchTermVMContext,
} from "./search_term_section/search_term.vm";
import DownloadMetricVM, {
    DownloadMetricVMContext,
} from "./download_section/download_metric.vm";
import TabHeaders from "./tabs";

const InsightSection = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const [loading, Setloading] = useState(true);
    const { isMobile } = useIsMobile();

    const qualityMetricVm = QualityMetricVM();
    const searchTermVm = SearchTermVM();
    const downloadMetricVm = DownloadMetricVM();

    useEffect(() => {
        Setloading(false);
        return () => {
            Setloading(true);
        };
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
                            {!isMobile ? (
                                <div className="mb-6 " key={1234}>
                                    <Tab.Group
                                        selectedIndex={selectedInsightTab}
                                    >
                                        <TabHeaders
                                            setSelectedInsightTab={
                                                setSelectedInsightTab
                                            }
                                            selectedInsightTab={
                                                selectedInsightTab
                                            }
                                        />
                                        <Tab.Panels>
                                            {selectedInsightTab == 0 && (
                                                <QualityBody />
                                            )}
                                            {selectedInsightTab == 1 && (
                                                <UseCaseBody />
                                            )}

                                            {selectedInsightTab == 2 && (
                                                <SearchTermSection />
                                            )}
                                            {selectedInsightTab == 3 && (
                                                <DownloadSection />
                                            )}
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>
                            ) : (
                                <div className="">
                                    <Accordian
                                        className=" "
                                        label={"Dataset Quality"}
                                        key="Dataset Quality"
                                    >
                                        <QualityBody />
                                    </Accordian>
                                    <Accordian label={"Use Cases"}>
                                        <UseCaseBody />
                                    </Accordian>
                                    <Accordian
                                        label={"Search Term"}
                                        key={"Search Term"}
                                    >
                                        <SearchTermSection />
                                    </Accordian>
                                    <Accordian
                                        label={"Download Metrics"}
                                        key={"Download Metrics"}
                                    >
                                        <DownloadSection />
                                    </Accordian>
                                </div>
                            )}
                        </DownloadMetricVMContext.Provider>
                    </SearchTermVMContext.Provider>
                </QualityMetricVMContext.Provider>
            )}
        </div>
    );
};

export default InsightSection;
