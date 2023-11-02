import DefaultLayout from "components/layouts/default";
import RegisterDataSourceVM from "./register_data_source.vm";
import withAuth from "common/HOCs/with_auth";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store";
import User from "models/user.model";
import Catalogue from "./components/view_catalogue";
import ViewCatalogueVM, { ViewCatalogueVMContext } from "./view_catalogue.vm";
const RegisterDataSourceTabHeaders = dynamic(
    () => import("./components/register_data_source_tabs"),
    {
        ssr: false,
    }
);
const Register = dynamic(() => import("./components/register"), {
    ssr: false,
});

enum tabIndex {
    register,
    viewCatalogue,
}

const RegisterDataSourcePage = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const { asPath } = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const user = useSelector((state: RootState) => state.auth.user);

    const vm = RegisterDataSourceVM();

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
    }, []);
    const viewCatalogueVm = ViewCatalogueVM();

    return (
        <DefaultLayout wrapperClass="!max-w-none">
            <div className="mx-4 md:my-8 md:mx-20 border-t !bg-white">
                <Tab.Group defaultIndex={selectedIndex}>
                    <RegisterDataSourceTabHeaders
                        selectedIndex={selectedIndex}
                        user={User.getRole(user)?.name}
                    />
                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                        <TabPanel className="!bg-white">
                            <Register />
                        </TabPanel>
                        <TabPanel className="!bg-white">
                            <ViewCatalogueVMContext.Provider
                                value={viewCatalogueVm}
                            >
                                <Catalogue />
                            </ViewCatalogueVMContext.Provider>
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(RegisterDataSourcePage);
