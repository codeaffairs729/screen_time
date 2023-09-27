import { Tab } from "@headlessui/react";
import SearchTermHeader from "./search_term_section/header";
import DownloadHeader from "./download_section/header";
import QualityInsightsHeader from "./quality_insights/header";
import {
    getSelectedLabelIndex,
    insightTabIndex,
} from "pages/organisation/organisation_detail.vm";
import { VscTriangleDown } from "react-icons/vsc";

const TabHeaders = ({
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
            <Tab.List className={"flex justify-evenly items-center "}>
                <div className="">
                    <div className=" flex flex-row items-center">
                        <HeadTag
                            isSelected={selectedInsightTab == 0}
                            label={"dataset_quality"}
                            setSelected={onTabSelect}
                        ></HeadTag>
                        {selectedInsightTab !== 0 && <VscTriangleDown size={24} className=" text-[#727272] ml-1" />}
                    </div>
                    {selectedInsightTab == 0 && <QualityInsightsHeader />}
                </div>
                <div>
                    <HeadTag
                        isSelected={selectedInsightTab == 1}
                        label={"use_cases"}
                        setSelected={onTabSelect}
                    ></HeadTag>
                    {selectedInsightTab == 1 && <Tab
                        className={
                            `!border-b-dtech-dark-teal text-xl text-dtech-dark-teal bg-white  border-b-4 w-full font-semibold transition-all duration-300 `
                        }
                    >
                        Use Cases
                    </Tab>
                    }
                </div>
                <div>
                    <div className=" flex flex-row items-center">
                        <HeadTag
                            isSelected={selectedInsightTab == 2}
                            label={"search_terms"}
                            setSelected={onTabSelect}
                        ></HeadTag>
                        {selectedInsightTab !== 2 && <VscTriangleDown size={24} className=" text-[#727272] ml-1" />}
                    </div>
                    {selectedInsightTab == 2 && <SearchTermHeader />}
                </div>
                <div>
                    <div className=" flex flex-row justify-center">

                        <HeadTag
                            isSelected={selectedInsightTab == 3}
                            label={"download_metrics"}
                            setSelected={onTabSelect}
                        ></HeadTag>
                        {selectedInsightTab !== 3 && <VscTriangleDown size={24} className=" text-[#727272] ml-1" />}
                    </div>

                    {selectedInsightTab == 3 && <DownloadHeader />}
                </div>

            </Tab.List>
            <div className=" h-1 bg-[#EBEBEB] -mt-1"></div>
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
                className={`relative inline-block text-left select-none outline-none ${isSelected && "hidden"
                    }`}
            >
                <span className="text-[#727272] font-semibold text-xl hover:underline underline-offset-4">
                    {labelToShow}
                </span>
            </div>
        </Tab>
    );
};

export default TabHeaders;
