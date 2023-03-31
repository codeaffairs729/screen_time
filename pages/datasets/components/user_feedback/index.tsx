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
                ` text-xl font-normal px-3 py-1 mx-5 ${
                    selected
                        ? "text-dtech-main-dark underline underline-offset-8 border-none"
                        : ""
                }`
            }
        >
            {children}
        </Tab>
    );
};

const DatasetFeedbackSection = () => {
    // const user = useSelector((state: RootState) => state.auth.user);
    const { asPath } = useRouter();
    const [selected, setSelected] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[1] as any] || 0
    );
    // if (!user) {
    //     return <LoginAlert />;
    // }
    console.log("as path", selected);
    return (
        <div className="ml-10">
            <div></div>
            <Tab.Group defaultIndex={selected}>
                <Tab.List className="flex">
                    <TabHeader>Data use cases</TabHeader>
                    <TabHeader>Data quality</TabHeader>
                </Tab.List>
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
