import { Tab } from "@headlessui/react";
import { ReactNode, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "store";
import ErrorAlert from "components/UI/alerts/error_alert";
import LoginAlert from "components/UI/alerts/login_alert";

import DataQualityFeedback from "./data_quality_feedback";
import DataUseFeedback from "./data_use_feedback";
import { useRouter } from "next/router";

enum tabIndex {
    usecase,
    quality,
}

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                ` text-[#727272] sm:py-3 text-sm font-semibold sm:text-xl hover:!border-[#727272]  hover:border-b-4 ${
                    selected?
                    `!border-b-dtech-light-teal hover:!border-b-dtech-light-teal sm:text-xl text-dtech-dark-teal bg-white border-b-4 font-semibold transition-all duration-300 `
                        : ""
                }`
            }
        >
            {children}
        </Tab>
    );
};

const DatasetFeedbackSection = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { asPath } = useRouter();
    const [selected, setSelected] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[1] as any] || 0
    );
    if (!user) {
        return <LoginAlert />;
    }
    return (
        <div className="">
            <div></div>
            <Tab.Group defaultIndex={selected}>
                <Tab.List className="flex justify-around">
                    <TabHeader>Data use cases</TabHeader>
                    <TabHeader>Data quality</TabHeader>
                </Tab.List>
                    <div className=" sm:w-full w-[111%] bg-[#EBEBEB] -ml-[5.5%] sm:-ml-0 sm:h-1 h-[2px] mt-2 sm:-mt-1"></div>
                <Tab.Panels className="mt-5">
                    <Tab.Panel className="w-full">
                        <DataUseFeedback />
                    </Tab.Panel>
                    <Tab.Panel className="w-full">
                        <DataQualityFeedback />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default DatasetFeedbackSection;
