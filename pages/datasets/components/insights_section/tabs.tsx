import { Tab } from "@headlessui/react";
import {
    getSelectedLabelIndex,
    insightTabIndex,
} from "pages/datasets/dataset_detail.vm";
import DatasetQualityInsightsHead from "./data_quality/header";
import DatasetDownloadMetricsHead from "./download_metrics/header";
import DatasetUseCasesHead from "./use_cases/header";

const DatasetTabHeaders = ({
    selectedInsightTab,
    setSelectedInsightTab,
}: {
    selectedInsightTab: number;
    setSelectedInsightTab: Function;
}) => {
    const onTabSelect = (selectedTab: string) => {
        setSelectedInsightTab(
            getSelectedLabelIndex(selectedTab, insightTabIndex)
        );
    };

    return (
        <div className="ml-10 mr-28">
            <Tab.List className={"flex justify-between items-center "}>
                <div>
                    <HeadTag
                        isSelected={selectedInsightTab == 0}
                        label={"data_quality"}
                        setSelected={onTabSelect}
                    ></HeadTag>
                    {selectedInsightTab == 0 && <DatasetQualityInsightsHead />}
                </div>
                <div>
                    <HeadTag
                        isSelected={selectedInsightTab == 1}
                        label={"use_cases"}
                        setSelected={onTabSelect}
                    ></HeadTag>
                    {selectedInsightTab == 1 && <DatasetUseCasesHead />}
                </div>
                <div>
                    <HeadTag
                        isSelected={selectedInsightTab == 2}
                        label={"download_metrics"}
                        setSelected={onTabSelect}
                    ></HeadTag>
                    {selectedInsightTab == 2 && <DatasetDownloadMetricsHead />}
                </div>
            </Tab.List>
        </div>
    );
};

const HeadTag = ({
    isSelected = false,
    label,
    setSelected,
}: {
    label: string;
    isSelected?: boolean;
    setSelected: Function;
}) => {
    const labelToShow = label
        .split("_")
        .map((w: string) => `${w[0].toUpperCase()}${w.slice(1)}`)
        .join(" ");

    return (
        <Tab onClick={() => setSelected(label)}>
            <div
                className={`relative inline-block text-left select-none outline-none ${
                    isSelected && "hidden"
                }`}
            >
                <span className="text-dtech-main-dark text-xl hover:underline underline-offset-4">
                    {labelToShow}
                </span>
            </div>
        </Tab>
    );
};

export default DatasetTabHeaders;
