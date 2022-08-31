import { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import SummaryStatistics from "./summary_statistics";
import DownloadMetrics from "./download_metrics";

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                `text-sm font-medium px-3 py-1 mx-5 rounded-full  ${
                    selected
                        ? "bg-dtech-primary-dark text-white"
                        : "border-[1px] border-black"
                }`
            }
        >
            {children}
        </Tab>
    );
};

const SummaryInsights = () => {
    return (
        <div className="p-3">
            <div className="">
                <Tab.Group>
                    <Tab.List className="flex">
                        <TabHeader>Summary</TabHeader>
                        <TabHeader>Download metrics</TabHeader>
                    </Tab.List>
                    <Tab.Panels className="mt-5">
                        <Tab.Panel className="w-full">
                            <SummaryStatistics />
                        </Tab.Panel>
                        <Tab.Panel className="w-full">
                            <DownloadMetrics />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default SummaryInsights;
