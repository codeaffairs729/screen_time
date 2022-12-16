import { Tab } from "@headlessui/react";
import { useState } from "react";
import SearchTermHeader from "./search_term_section/header";
import DownloadHeader from "./download_section/header";
import QualityInsightsHeader from "./quality_insights/header";
const TabHeaders = ({
    selectedIndex = 0,
    selectedQualityInsights = "",
    setSelectedQualityInsights,
    selectedSearchTerm = "",
    setSelectedSearchTerm,
    selectedDownload = "",
    setSelectedDownload,
    setSelected,
    selected = 0,
}: {
    selectedIndex?: number;
    selectedQualityInsights?: string;
    setSelectedQualityInsights?: any;
    selectedSearchTerm?: string;
    setSelectedSearchTerm?: any;
    selectedDownload?: string;
    setSelectedDownload?: any;
    setSelected?: any;
    selected?: number;
}) => {
    return (
        <div className="ml-10 mr-28">
            <Tab.List className={"flex justify-between items-center "}>
                <Tab onClick={() => setSelected(0)}>
                    {selected == 0 ? (
                        <span className="hover:underline underline-offset-4">
                            <QualityInsightsHeader
                                selectedLabel={selectedQualityInsights}
                                onChange={setSelectedQualityInsights}
                            />
                        </span>
                    ) : (
                        <div className="relative inline-block text-left">
                            <span className="text-dtech-main-dark text-xl  hover:underline underline-offset-4">
                                Dataset quality
                            </span>
                        </div>
                    )}
                </Tab>
                <Tab onClick={() => setSelected(1)}>
                    {selected == 1 ? (
                        <SearchTermHeader
                            selectedLabel={selectedSearchTerm}
                            onChange={setSelectedSearchTerm}
                        />
                    ) : (
                        <div className="relative inline-block text-left">
                            <span className="text-dtech-main-dark text-xl hover:underline underline-offset-4">
                                Search Term
                            </span>
                        </div>
                    )}
                </Tab>
                <Tab onClick={() => setSelected(2)}>
                    {selected == 2 ? (
                        <DownloadHeader
                            selectedLabel={selectedDownload}
                            onChange={setSelectedDownload}
                        />
                    ) : (
                        <div className="relative inline-block text-left">
                            <span className="text-dtech-main-dark text-xl hover:underline underline-offset-4">
                                Download Metrics
                            </span>
                        </div>
                    )}
                </Tab>
            </Tab.List>
        </div>
    );
};

export default TabHeaders;
