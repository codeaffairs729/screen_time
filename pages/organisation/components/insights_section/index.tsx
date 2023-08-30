import { useState, useEffect } from "react";
import QualityInsightsSection from "./quality_insights/section";
import { Tab } from "@headlessui/react";
// import SearchTermSection from "./search_term_section/section";
// import DownloadSection from "./download_section/section";
import TabHeaders from "./tabs";
import dynamic from "next/dynamic";
const DownloadSection = dynamic(() => import("./download_section/section"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
});
const SearchTermSection = dynamic(() => import("./search_term_section/section"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
});
// const TagCloud2 = dynamic(() => import("./tagCloud2"), {
//     loading: () => <p>A map is loading</p>,
//     ssr: false, // This line is important. It's what prevents server-side render
// });
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
import Accordian from "./accordian";
import UseCaseSection from "./use_case_section/section";

const Insights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const [loading, Setloading] = useState(true);
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const qualityMetricVm = QualityMetricVM();
    const searchTermVm = SearchTermVM();
    const downloadMetricVm = DownloadMetricVM();

    useEffect(() => {
        Setloading(false);
        return () => { Setloading(true); }
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
                            {!isMobile ? <div className="mb-6 " key={1234}>
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
                                            <UseCaseSection />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <SearchTermSection />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <DownloadSection />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div> :
                                <div className="" >
                                    <Accordian className=" " label={"Dataset Quality"} key="Dataset Quality">
                                        <QualityInsightsSection />
                                    </Accordian>
                                    <Accordian label={"Use Cases"}>
                                        <UseCaseSection />
                                    </Accordian>
                                    <Accordian label={"Search Term"} key={"Search Term"}>
                                        <SearchTermSection />
                                    </Accordian>
                                    <Accordian label={"Download Metrics"} key={"Download Metrics"}>
                                        <DownloadSection />
                                    </Accordian>
                                </div>}
                        </DownloadMetricVMContext.Provider>
                    </SearchTermVMContext.Provider>
                </QualityMetricVMContext.Provider>
            )}
        </div>
    );
};

export default Insights;
