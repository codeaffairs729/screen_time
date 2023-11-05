import { Tab } from "@headlessui/react";
import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import AccountDetails from "./components/account_detail_section";
import AccountTabHeaders from "./components/account_tabs";
import SubscriptionSection from "./components/subscription_section";
import { fetchPermissions } from "common/util";
import { AccountContext } from "./account.vm";

enum tabIndex {
    account,
    subscription,
    // payment,
}

const WorkspacePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[router.asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const [permissions, setPermissions] = useState([])
    const { asPath } = useRouter();
    // const accountContext = useContext(AccountContext)
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        const loadPermissions = async () => {
            const fetchedPermissions = await fetchPermissions(user ? user.id : 0, router.pathname.replace("/[id]", ""))
            setPermissions(fetchedPermissions
                .filter((permission: any) => permission.permitted)
                .map((permission: any) => permission.permission_name))
        }
        loadPermissions()
    }, []);

    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout wrapperClass=" !max-w-none">
            <AccountContext.Provider value={{ permissions }}>
                <div className="py-5 px-4 w-full   flex items-center md:bg-white bg-[#EBEBEB]">
                    <span className="text-left text-xl md:text-[26px] font-semibold md:text-[#727272]">
                        My Account
                    </span>
                </div>
                <div className="mx-4 md:my-8 md:mx-20 border-t !bg-white">
                    <Tab.Group defaultIndex={selectedIndex}>
                        <AccountTabHeaders selectedIndex={selectedIndex} />
                        <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                            <TabPanel className="!bg-white">
                                <AccountDetails />
                            </TabPanel>
                            <TabPanel className="!bg-white">
                                <div className="my-20 mt-0">
                                    <SubscriptionSection />
                                </div>
                            </TabPanel>
                            {/* <TabPanel className="!bg-white ">
                                    <div className="my-20">
                                        Work in Progress
                                    </div>
                                </TabPanel> */}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </AccountContext.Provider>
        </DefaultLayout >
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
