import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ListsSection from "./components/lists_section";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import Notifications from "./components/notifications_section";
import TabHeaders from "./components/tabs";
import Dropdown from "components/UI/drop_down";
import { useState } from "react";
import { MenuItemType } from "components/UI/drop_down";
import SearchBar from "components/UI/search_bar";
import SearchVM from "pages/search/search.vm";

const ITEMS: MenuItemType[] = [
    { label: "My User Workspace" },
    { label: "My Admin Workspace" },
];

const WorkspacePage = () => {
    const vm = SearchVM();
    const [workspace, setWorkspace] = useState<string>("My User Workspace");
    const menuItems: MenuItemType[] = ITEMS.map((item) => ({
        ...item,
        onClick: () => setWorkspace(item.label),
    }));
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout navContent={<SearchBar onChange={vm.onSearchChange} />}>
            <div className="my-10 mx-4 md:mx-20 flex items-center">
                <span className="text-left text-[26px] font-semibold">
                    My Workspace
                </span>
                <Dropdown label={workspace} menuItems={menuItems} />
            </div>
            <div className="flex mx-4 md:mx-20 border-t bg-white">
                <Tab.Group>
                    <TabHeaders />
                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                        <TabPanel className="bg-white">
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel className="bg-white">
                            <ListsSection />
                        </TabPanel>
                        <TabPanel className="bg-white">
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel className="bg-white">
                            <Notifications />
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(WorkspacePage);
