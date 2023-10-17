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
import { useEffect, useState } from "react";
import { MenuItemType } from "components/UI/drop_down";
import { useRouter } from "next/router";

const ITEMS: MenuItemType[] = [
    { label: "My User Workspace" },
    { label: "My Admin Workspace" },
];

enum tabIndex {
    datasets,
    lists,
    history,
    notifications,
}

const WorkspacePage = () => {
    const [workspace, setWorkspace] = useState<string>("My User Workspace");
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const { asPath } = useRouter();
    const menuItems: MenuItemType[] = ITEMS.map((item) => ({
        ...item,
        onClick: () => setWorkspace(item.label),
    }));
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);

    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout className="!bg-gray">
            <div className="py-5 px-4 mx-4 md:mx-20 flex items-center bg-white">
                <span className="text-left text-[26px] font-semibold text-[#727272]">
                    My Workspace
                </span>
                {/* <Dropdown label={workspace} menuItems={menuItems} /> */}
            </div>
            <div className="mx-4 md:mx-20 border-t !bg-white">
                {!loading && (
                    <Tab.Group defaultIndex={selectedIndex}>
                        <TabHeaders selectedIndex={selectedIndex} />
                        <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                            {/* <TabPanel className="bg-white">
                                <p>Work in progress.</p>
                            </TabPanel> */}
                            <TabPanel className="!bg-white">
                                <ListsSection />
                            </TabPanel>
                            {/* <TabPanel className="bg-white">
                                <p>Work in progress.</p>
                            </TabPanel> */}
                            <TabPanel className="!bg-white">
                                <Notifications />
                            </TabPanel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </DefaultLayout>
    );
};

export default withAuth(WorkspacePage);
