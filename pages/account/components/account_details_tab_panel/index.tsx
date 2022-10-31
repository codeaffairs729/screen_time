import { Tab } from "@headlessui/react";
import clsx from "clsx";

import TabPanel from "components/UI/tabbed/panel";
import { Fragment, ReactNode } from "react";
import AdminTabPanel from "./components/admin_tab_panel";
import UserTabPanel from "./components/user_tab_panel";

const AccountDetailsTabPanel = () => {
    return (
        <TabPanel>
            <Tab.Group>
                <Tab.List className="flex space-x-2 mb-20">
                    <TabButton className="max-w-[150px] text-center">User</TabButton>
                    <TabButton className="max-w-[150px] text-center">Admin</TabButton>
                </Tab.List>
                <Tab.Panels>
                    <UserTabPanel />
                    <AdminTabPanel/>
                </Tab.Panels>
            </Tab.Group>
        </TabPanel>
    );
};

const TabButton = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <Tab
            as={"button"}
            className={({ selected }) =>
                clsx(
                    "text-sm font-semibold px-1 py-1 outline-none w-full rounded-full border-dtech-primary-dark border-[1px]",
                    selected
                        ? "bg-dtech-primary-dark text-white "
                        : "text-dtech-primary-dark",
                    className
                )
            }
        >
            {children}
        </Tab>
    );
};

export default AccountDetailsTabPanel;
