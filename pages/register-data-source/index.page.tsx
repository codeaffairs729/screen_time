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
import { CiSearch } from "react-icons/ci";
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
    const [searchValue, setSearchValue] = useState("");
    const { asPath } = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const user = useSelector((state: RootState) => state.auth.user);

    const vm = RegisterDataSourceVM();

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
    }, [tabIndex[asPath.split("#")[1]?.split("/")[0] as any]]);
    const viewCatalogueVm = ViewCatalogueVM();

    const handleSerch = (e: any) => {
        setSearchValue(e.target.value);
    };
    return (
        <DefaultLayout wrapperClass="!max-w-none">
            <div className="mx-4 md:my-8 md:mx-20 border-t !bg-white">
                <Tab.Group key={selectedIndex} defaultIndex={selectedIndex}>
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
                                <div className="flex">
                                    <div className="relative w-1/3">
                                        <input
                                            type="search"
                                            onChange={handleSerch}
                                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-700"
                                            placeholder="Search"
                                            required
                                        />
                                        <div className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full rounded-lg">
                                            <CiSearch fontSize={"20px"} />
                                        </div>
                                    </div>
                                </div>
                                <Catalogue searchValue={searchValue} />
                            </ViewCatalogueVMContext.Provider>
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(RegisterDataSourcePage);
