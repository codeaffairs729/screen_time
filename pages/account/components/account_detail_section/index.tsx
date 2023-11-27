import { ReactNode, useState, useContext } from "react";
import { Tab } from "@headlessui/react";
// import TabHeader from "./tabs";
import UserSection from "./components/user";
import AdminSection from "./components/admin";
import { useSelector } from "react-redux";
import { RootState } from "store";
import User from "models/user.model";
import TabHeaders from "./tabs";
import { AccountContext } from "pages/account/account.vm";

enum insightTabIndex {
    user,
    admin,
}

const TabHeader = ({ children, setSelected, label }: { children?: ReactNode; setSelected?: any; label?: string }) => {
    return (
        <Tab onClick={() => setSelected(label)}
            className={({ selected }) =>
                ` text-[#727272] sm:py-3 text-sm font-semibold sm:text-xl hover:!border-[#727272]  hover:border-b-4 ${selected
                    ? `!border-b-dtech-light-teal hover:!border-b-dtech-light-teal sm:text-xl text-dtech-dark-teal bg-white border-b-4 font-semibold transition-all duration-300 `
                    : ""
                }`
            }
        >
            {children}
        </Tab>
    );
};

const AccountDetails = () => {
    const [selectedAccountTab, setSelectedAccountTab] = useState<any>(0);
    const user = useSelector((state: RootState) => state.auth.user);

    const onTabSelect = (selectedTab: string) => {
        setSelectedAccountTab(
            getSelectedLabelIndex(selectedTab, insightTabIndex)
        );
    };
    const { permissions } = useContext(AccountContext); // Access permissions from the context
    const rolesToCheck = ['organisation_administrator'];
    return (
        <div className="mb-6">
            <Tab.Group selectedIndex={selectedAccountTab}>
                {/* <TabHeaders
                    selectedAccountTab={selectedAccountTab}
                    setSelectedAccountTab={setSelectedAccountTab}
                /> */}
                <Tab.List className="flex justify-around">
                    <TabHeader setSelected={onTabSelect} label={"user"}>User</TabHeader>
                    {rolesToCheck.some(role => User.getAllRoles(user)?.includes(role)) ? (
                        <TabHeader setSelected={onTabSelect} label={"admin"}>Admin</TabHeader>
                    ) : (
                        <TabHeader></TabHeader>
                    )}
                </Tab.List>
                <div className=" sm:w-full w-[111%] bg-[#EBEBEB] -ml-[5.5%] sm:-ml-0 sm:h-1 h-[2px] mt-2 sm:-mt-1"></div>
                <Tab.Panels>
                    <Tab.Panel>
                        <UserSection />
                    </Tab.Panel>
                    <Tab.Panel>
                        {rolesToCheck.some(role => User.getAllRoles(user)?.includes(role)) &&
                            <AdminSection />
                        }
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

export default AccountDetails;
