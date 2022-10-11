import { Tab } from "@headlessui/react";
import clsx from "clsx";
import TabHeader from "components/UI/tabbed/header";
import { ReactNode } from "react";
import YourInfo from "./your_info";

const TabbedSection = () => {
    return (
        <div className="w-full md:ml-10 overflow-x-auto">
            {/* <div className=" "> */}
            <Tab.Group>
                <Tab.List className="flex">
                    <TabHeader>Your Information</TabHeader>
                    <TabHeader>Favourites</TabHeader>
                </Tab.List>
                <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                    <Tab.Panel className="w-full">
                        <YourInfo />
                    </Tab.Panel>
                    <Tab.Panel className="w-full">Favourites</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {/* </div> */}
        </div>
    );
};

export default TabbedSection;
