import { Tab } from "@headlessui/react";
import { ReactNode, useState } from "react";
import SearchTermHeader from "./search_term_section/header";
import DownloadHeader from "./download_section/header";
import QualityInsightsHeader from "./quality_insights/header";
import {
    getSelectedLabelIndex,
    insightTabIndex,
} from "pages/organisation/organisation_detail.vm";

const TabHeaders = ({
    selectedInsightTab,
    setSelectedQualityInsights,
    setSelectedSearchTerm,
    setSelectedDownload,
    setSelectedInsightTab,
}: {
    selectedInsightTab: number;
    setSelectedQualityInsights: Function;
    setSelectedSearchTerm: Function;
    setSelectedDownload: Function;
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
                <HeadTag
                    isSelected={selectedInsightTab == 0}
                    label={"dataset_quality"}
                    setSelected={onTabSelect}
                >
                    <QualityInsightsHeader
                        onChange={setSelectedQualityInsights}
                    />
                </HeadTag>
                <HeadTag
                    isSelected={selectedInsightTab == 1}
                    label={"search_term"}
                    setSelected={onTabSelect}
                >
                    <SearchTermHeader onChange={setSelectedSearchTerm} />
                </HeadTag>
                <HeadTag
                    isSelected={selectedInsightTab == 2}
                    label={"download_metrics"}
                    setSelected={onTabSelect}
                >
                    <DownloadHeader onChange={setSelectedDownload} />
                </HeadTag>
            </Tab.List>
        </div>
    );
};

const HeadTag = ({
    children,
    isSelected = false,
    label,
    setSelected,
}: {
    label: string;
    children: ReactNode;
    isSelected?: boolean;
    setSelected: Function;
}) => {
    const labelToShow = label
        .split("_")
        .map((w: string) => `${w[0].toUpperCase()}${w.slice(1)}`)
        .join(" ");

    return (
        <Tab onClick={() => setSelected(label)}>
            <span className={`${!isSelected && "hidden"}`}>{children}</span>
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

export default TabHeaders;
