import { useState } from "react";
import { Tab } from "@headlessui/react";
import TabHeader from "./tabs";
import UserSection from "./components/user";
import AdminSection from "./components/admin";
import { useSelector } from "react-redux";
import { RootState } from "store";
import User from "models/user.model";

const AccountDetails = () => {
    const [selectedAccountTab, setSelectedAccountTab] = useState<any>(0);
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="mb-6">
            <Tab.Group selectedIndex={selectedAccountTab}>
                <TabHeader
                    selectedAccountTab={selectedAccountTab}
                    setSelectedAccountTab={setSelectedAccountTab}
                />
                <Tab.Panels>
                    <Tab.Panel>
                        <UserSection />
                    </Tab.Panel>
                    <Tab.Panel>
                        {User.isOrgAdmin(user) && <AdminSection />}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};
export default AccountDetails;
