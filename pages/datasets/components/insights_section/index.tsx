import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import DatasetTabHeaders from "./tabs";
import DatasetQualityInsightsBody from "./data_quality/section";
import DatasetUseCasesBody from "./use_cases/section";
import DatasetDownloadMetricsBody from "./download_metrics/section";
import QualityMetricsVM, {
    QualityMetricsVMContext,
} from "./data_quality/quality_metric.vm";
import UseCaseMetricsVM, {
    UseCaseMetricsVMContext,
} from "./use_cases/usecase_metric.vm";
import DownloadMetricsVM, {
    DownloadMetricsVMContext,
} from "./download_metrics/download_metric.vm";
import Loader from "components/UI/loader";
import Accordian from "pages/organisation/components/insights_section/accordian";

const DatasetInsights = () => {
    const [selectedInsightTab, setSelectedInsightTab] = useState<number>(0);
    const [loading, Setloading] = useState(true);
    const [isMobile, setIsMobile] = useState(false)
    const qualityMetricVM = QualityMetricsVM();
    const useCaseMetricVM = UseCaseMetricsVM();
    const downloadMetricVM = DownloadMetricsVM();
    useEffect(() => {
        Setloading(false);
        return () => { Setloading(true); }
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
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
            {!loading && <QualityMetricsVMContext.Provider value={qualityMetricVM}>
                <UseCaseMetricsVMContext.Provider value={useCaseMetricVM}>
                    <DownloadMetricsVMContext.Provider value={downloadMetricVM}>
                        {!isMobile ? <div className="mb-6">
                            <Tab.Group defaultIndex={selectedInsightTab}>
                                <DatasetTabHeaders
                                    setSelectedInsightTab={
                                        setSelectedInsightTab
                                    }
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
                            :
                            <div className="" >
                                <Accordian className=" " label={"Dataset Quality"} key="Dataset Quality">
                                    <DatasetQualityInsightsBody />
                                </Accordian>
                                <Accordian label={"Use Cases"}>
                                    <DatasetUseCasesBody />
                                </Accordian>
                                <Accordian label={"Download Metrics"} key={"Download Metrics"}>
                                    <DatasetDownloadMetricsBody />
                                </Accordian>
                            </div>}
                    </DownloadMetricsVMContext.Provider>
                </UseCaseMetricsVMContext.Provider>
            </QualityMetricsVMContext.Provider>}
        </div>
    );
};
export default DatasetInsights;
