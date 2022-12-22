import { Tab } from "@headlessui/react";
import { ReactNode, useState } from "react";
import SearchTermHeader from "./search_term_section/header";
import DownloadHeader from "./download_section/header";
import QualityInsightsHeader from "./quality_insights/header";

enum headers {
    dataset_quality,
    search_term,
    download_metrics,
}

const TabHeaders = ({
    setSelectedQualityInsights,
    setSelectedSearchTerm,
    setSelectedDownload,
    setSelected,
    selected = 0,
}: {
    setSelectedQualityInsights?: any;
    setSelectedSearchTerm?: any;
    setSelectedDownload?: any;
    setSelected?: any;
    selected?: number;
}) => {
    const onTabSelect = (selectedTab: string) => {
        setSelected(headers[selectedTab as any]);
    };

    return (
        <div className="ml-10 mr-28">
            <Tab.List className={"flex justify-between items-center "}>
                <HeadTag
                    isSelected={selected == 0}
                    label={"dataset_quality"}
                    setSelected={onTabSelect}
                >
                    <QualityInsightsHeader
                        onChange={setSelectedQualityInsights}
                    />
                </HeadTag>
                <HeadTag
                    isSelected={selected == 1}
                    label={"search_term"}
                    setSelected={onTabSelect}
                >
                    <SearchTermHeader onChange={setSelectedSearchTerm} />
                </HeadTag>
                <HeadTag
                    isSelected={selected == 2}
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
