import { Tab } from "@headlessui/react";

import DownloadHeader from "./download_section/header";
import {
    getSelectedLabelIndex,
    insightTabIndex,
} from "pages/organisation/organisation_detail.vm";
import { VscTriangleDown } from "react-icons/vsc";
import QualityInsightsHead from "./quality_section/header";
import SearchTermHeader from "./search_term_section/header";

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
                    {selectedInsightTab == 0 ? (
                        <QualityInsightsHead />
                    ) : (
                        <div className=" flex flex-row items-center hover:!border-[#727272] hover:border-b-4">
                            <HeadTag
                                isSelected={selectedInsightTab == 0}
                                label={"dataset_quality"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {selectedInsightTab !== 0 && (
                                <VscTriangleDown
                                    size={24}
                                    className=" text-[#727272] ml-1"
                                />
                            )}
                        </div>
                    )}
                </div>

                <div>
                    {selectedInsightTab == 1 ? (
                        <Tab
                            className={`!border-b-dtech-dark-teal text-xl text-dtech-dark-teal bg-white  border-b-4 w-full font-semibold transition-all duration-300 `}
                        >
                            Use Cases
                        </Tab>
                    ) : (
                        <div className=" hover:!border-[#727272] hover:border-b-4">
                            <HeadTag
                                isSelected={selectedInsightTab == 1}
                                label={"use_cases"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                        </div>
                    )}
                </div>
                <div>
                    {selectedInsightTab == 2 ? (
                        <SearchTermHeader />
                    ) : (
                        <div className=" flex flex-row items-center hover:!border-[#727272] hover:border-b-4">
                            <HeadTag
                                isSelected={selectedInsightTab == 2}
                                label={"search_terms"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {selectedInsightTab !== 2 && (
                                <VscTriangleDown
                                    size={24}
                                    className=" text-[#727272] ml-1"
                                />
                            )}
                        </div>
                    )}
                </div>
                <div>
                    {selectedInsightTab == 3 ? (
                        <DownloadHeader />
                    ) : (
                        <div className=" flex flex-row justify-center hover:!border-[#727272] hover:border-b-4">
                            <HeadTag
                                isSelected={selectedInsightTab == 3}
                                label={"download_metrics"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {selectedInsightTab !== 3 && (
                                <VscTriangleDown
                                    size={24}
                                    className=" text-[#727272] ml-1"
                                />
                            )}
                        </div>
                    )}
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
                className={`relative inline-block text-left select-none outline-none ${
                    isSelected && "hidden"
                }`}
            >
                <span className="text-[#727272] font-semibold text-xl ">
                    {labelToShow}
                </span>
            </div>
        </Tab>
    );
};

export default TabHeaders;
