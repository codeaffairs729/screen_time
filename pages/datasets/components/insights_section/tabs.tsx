import { Tab } from "@headlessui/react";
import {
    getSelectedLabelIndex,
    insightTabIndex,
} from "pages/datasets/dataset_detail.vm";
import DatasetQualityInsightsHead from "./data_quality/header";
import DatasetDownloadMetricsHead from "./download_metrics/header";
import DatasetUseCasesHead from "./use_cases/header";
import { VscTriangleDown } from "react-icons/vsc";

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
        <div className="">
            <Tab.List className={"flex justify-around space-x-10 items-center "}>
                <div>
                    <div className="flex flex-row items-center">

                        <HeadTag
                            isSelected={selectedInsightTab == 0}
                            label={"dataset_quality"}
                            setSelected={onTabSelect}
                        ></HeadTag>
                        {selectedInsightTab !== 0 && <VscTriangleDown size={24} className=" text-[#727272] ml-1" />}

                    </div>
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
                className={`relative inline-block text-left select-none outline-none hover:top-[-2px] ${isSelected && "hidden"
                    }`}
            >
                <span className=" text-[#727272] text-sm font-semibold sm:text-xl hover:!border-[#727272] pb-2 hover:border-b-4 ">
                    {labelToShow}
                </span>
            </div>
        </Tab>
    );
};

export default DatasetTabHeaders;
