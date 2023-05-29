import { Tab } from "@headlessui/react";
import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import AccountDetails from "./components/account_detail_section";
import AccountTabHeaders from "./components/account_tabs";
import SubscriptionSection from "./components/subscription_section";
enum tabIndex {
    account,
    subscription,
    payment,
}

const WorkspacePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { asPath } = useRouter();
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
    }, []);

    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout>
                <div className="my-10 mx-4 md:mx-20 flex items-center">
                    <span className="text-left text-[26px] font-semibold">
                        My Account
                    </span>
                    {/* <Dropdown label={workspace} menuItems={menuItems} /> */}
                </div>
            <div className=" px-16">
                <div className=" bg-white border-1 ">
                    <div className="md:flex md:px-4">
                        <Tab.Group defaultIndex={selectedIndex}>
                            <AccountTabHeaders selectedIndex={selectedIndex} />
                            <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                <TabPanel
                                    className="!bg-white border-t border-
                                gray !p-0"
                                >
                                    <AccountDetails />
                                </TabPanel>
                                <TabPanel className="!bg-white">
                                    <div className="my-20">
                                        <SubscriptionSection />
                                    </div>
                                </TabPanel>
                                <TabPanel className="!bg-white">
                                    <div className="my-20">
                                        Work in Progress
                                    </div>
                                </TabPanel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

const MyAccountTabHeader = ({
    text,
    icon,
}: {
    text: string;
    icon: ReactNode;
}) => {
    return (
        <TabHeader className="flex flex-col items-center">
            <span className="text-xl text-gray-500 w-min mb-1">{icon}</span>
            <h4 className="text-sm font-medium">{text}</h4>
        </TabHeader>
    );
};

export default withAuth(WorkspacePage);
