import { useEffect, useState } from "react";
import { useContext } from "react";
import ByRegion from "./by_region";
import ByRole from "./by_role";
import ByTime from "./by_time";
import { DownloadMetricsVMContext } from "./download_metric.vm";
import { Tab } from "@headlessui/react";

const DatasetDownloadMetricsBody = () => {
    const { selectedDownload: selectedLabel, fetchDatasetMetrics, setSelectedDownload } = useContext(
        DownloadMetricsVMContext
    );
    const [isMobile, setIsMobile] = useState(false)
    const insightTabIndex = {
        "0": "by_region",
        "1": "by_time",
        "2": "by_role",
        "by_region": 0,
        "by_time": 1,
        "by_role": 2
    }
    useEffect(() => {
        fetchDatasetMetrics();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const onTabSelect = (selectedTab: string) => {
        setSelectedDownload(
            getSelectedLabelIndex(selectedTab, insightTabIndex)
        );
    };
    const getSelectedLabelIndex = (label: string, types: any) => {
        return types[label];
    };
    return (
        <div className="">
            <div className="sm:hidden mt-2 mb-4">
                <Tab.Group selectedIndex={selectedLabel} >
                    <Tab.List className={"flex lg:!justify-evenly lg:space-x-10 items-center justify-around "}>
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
            <div className="sm:flex flex-row hidden my-6 mb-20 relative">
                <div className=" w-[350px] text-dtech-main-dark absolute z-20 ml-8">Insights &gt; Download Metrics &gt; {selectedLabel == 0 ? "By Region" : selectedLabel == 1 ? "By Time" : "By Role"}</div>
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
                `${selected && " !border-b-dtech-dark-teal border-b-2 text-dtech-dark-teal bg-white"
                } flex items-center justify-center  w-full sm:h-20  text-sm font-semibold transition-all duration-300 outline-none text-[#727272]`
            }
            onClick={() => setSelected(label)}>
           {labelToShow}
        </Tab>
    );
};
export default DatasetDownloadMetricsBody;
