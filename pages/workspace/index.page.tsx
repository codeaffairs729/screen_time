import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ListsSection from "./components/lists_section";
import { Tab } from "@headlessui/react";
import { Children, ReactNode, useState } from "react";
import TabPanel from "components/UI/tabbed/panel";
import Notifications from "./components/notifications";
import { RiFoldersLine } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { GrDocumentTime } from "react-icons/gr";

const WorkspacePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout>
            <div className="my-10 mx-4 md:mx-20 text-left text-[26px] font-semibold">
                My Workspace
            </div>
            <div className="flex mx-4 md:mx-20 border-y bg-[#FAFAFA]">
                <Tab.Group>
                    <div>
                        <Tab.List className="relative text-dtech-main-dark">
                            <TabHeader>
                                <RiFoldersLine className="text-dtech-main-dark w-9 h-9" />
                                <span className="text-dtech-main-dark">Datasets</span>
                            </TabHeader>
                            <TabHeader>
                                <FiFileText className="text-dtech-main-dark w-9 h-9" />
                                <span className="text-dtech-main-dark">Lists</span>
                            </TabHeader>
                            <TabHeader>
                                <GrDocumentTime className="text-dtech-main-dark w-9 h-9" />
                                <span className="text-dtech-main-dark">History</span>
                            </TabHeader>
                            <TabHeader>
                                <IoMdNotifications className="text-dtech-main-dark w-9 h-9" />
                                <span className="text-dtech-main-dark">
                                    Notifications
                                </span>
                            </TabHeader>
                        </Tab.List>
                    </div>
                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                        <TabPanel className="bg-[#FAFAFA]">
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel className="bg-[#FAFAFA]">
                            <ListsSection />
                        </TabPanel>
                        <TabPanel className="bg-[#FAFAFA]">
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel className="bg-[#FAFAFA]">
                            <Notifications />
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                `${
                    selected && "border-l-4 border-l-dtech-main-dark"
                } flex text-sm font-semibold transition-all duration-300 outline-none w-full border-y`
            }
        >
            <div className="w-50 h-26 flex flex-col items-center justify-center">
                {children}
            </div>
        </Tab>
    );
};

export default withAuth(WorkspacePage);
