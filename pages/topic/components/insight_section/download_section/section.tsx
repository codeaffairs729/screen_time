import { useContext, useEffect, useState } from "react";

import { DownloadMetricVMContext } from "./download_metric.vm";
import { Tab } from "@headlessui/react";

import { useIsMobile } from "common/hooks";
import ByRegion from "./byRegion";
import ByTime from "./byTime";
import ByRole from "./byRole";
const DownloadSection = () => {
    const {
        selectedDownload: selectedLabel,
        fetchDownloadMetrics,
        setSelectedDownload,
    } = useContext(DownloadMetricVMContext);

    const { isMobile } = useIsMobile();
    const getSelectedLabelIndex = (label: string, types: any) => {
        return types[label];
    };
    const insightTabIndex = {
        "0": "by_region",
        "1": "by_time",
        "2": "by_role",
        by_region: 0,
        by_time: 1,
        by_role: 2,
    };
    const onTabSelect = (selectedTab: string) => {
        setSelectedDownload(
            getSelectedLabelIndex(selectedTab, insightTabIndex)
        );
    };

    useEffect(() => {
        fetchDownloadMetrics();
    }, []);

    return (
        <div>
            <div className="sm:hidden mt-2 mb-4">
                <Tab.Group selectedIndex={selectedLabel}>
                    <Tab.List
                        className={
                            "flex justify-center space-x-10 items-center "
                        }
                    >
                        <div>
                            <HeadTag
                                isSelected={selectedLabel == 0}
                                label={"by_region"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {/* {selectedLabel == 0 && <div>hi</div>} */}
                        </div>
                        <div>
                            <HeadTag
                                isSelected={selectedLabel == 1}
                                label={"by_time"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {/* {selectedLabel == 1 && <div>hiii</div>} */}
                        </div>
                        <div>
                            <HeadTag
                                isSelected={selectedLabel == 2}
                                label={"by_role"}
                                setSelected={onTabSelect}
                            ></HeadTag>
                            {/* {selectedLabel == 2 && <div>hiiiiiiiiii</div>} */}
                        </div>
                    </Tab.List>
                </Tab.Group>
            </div>
            <div className="sm:flex flex-row hidden my-6 relative">
                <div className=" w-[350px] text-dtech-main-dark absolute z-20">
                    Insights &gt; Download Metrics &gt;{" "}
                    {selectedLabel == 0
                        ? "By Region"
                        : selectedLabel == 1
                        ? "By Time"
                        : "By Role"}
                </div>
            </div>
            {selectedLabel == 0 && <ByRegion isMobile={isMobile} />}
            {selectedLabel == 1 && <ByTime isMobile={isMobile} />}
            {selectedLabel == 2 && <ByRole isMobile={isMobile} />}
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
        <Tab
            className={({ selected }) =>
                `${
                    selected &&
                    " !border-b-dtech-dark-teal  text-dtech-dark-teal bg-white"
                } flex items-center justify-center border-b-2 w-full sm:h-20  border-b-[#ACACAC] text-sm font-semibold transition-all duration-300 outline-none  border-y border-gray text-[#727272]`
            }
            onClick={() => setSelected(label)}
        >
            {/* <div
                className={`relative inline-block text-left select-none outline-none ${isSelected && "hidden"
                    }`}
            > */}
            {/* <span className="text-[#727272] font-semibold text-xl hover:underline underline-offset-4"> */}
            {labelToShow}
            {/* </span> */}
            {/* </div> */}
        </Tab>
    );
};
export default DownloadSection;
