import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import DataQualityFeedback from "./data_quality_feedback";
import DataUseFeedback from "./data_use_feedback";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ErrorAlert from "components/UI/alerts/error_alert";
import LoginAlert from "components/UI/alerts/login_alert";

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

const FeedbackSection = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    // if (!user) {
    //     return <LoginAlert />;
    // }

    return (
        <div className="">
            <div></div>
            <Tab.Group>
                <Tab.List className="flex">
                    <TabHeader>Data quality</TabHeader>
                    <TabHeader>Data use cases</TabHeader>
                </Tab.List>
                <Tab.Panels className="mt-5">
                    <Tab.Panel className="w-full">
                        <DataQualityFeedback />
                    </Tab.Panel>
                    <Tab.Panel className="w-full">
                        <DataUseFeedback />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default FeedbackSection;
