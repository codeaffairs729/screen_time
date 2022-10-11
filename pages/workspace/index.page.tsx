import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ListsSection from "./components/lists_section";
import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";

const WorkspacePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout>
            <div className="text-center mb-10 text-lg font-semibold">
                My Workspace
            </div>
            <div className="mx-4 md:mx-20 border">
                <Tab.Group>
                    <Tab.List className="flex flex-row justify-between">
                        <TabHeader>My Lists</TabHeader>
                        <TabHeader>History</TabHeader>
                        <TabHeader>Notifications</TabHeader>
                    </Tab.List>
                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                        <TabPanel>
                            <ListsSection />
                        </TabPanel>
                        <TabPanel>
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Work in progress.</p>
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(WorkspacePage);
