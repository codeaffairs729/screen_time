import { ReactNode } from "react";
import clsx from "clsx";
import Nav from "./components/nav";
import Footer from "./components/footer";

import { BsMegaphone } from "react-icons/bs";
import SearchVM, { SearchVMContext } from "pages/search/search.vm";
import OrganizationSearchVM, {
    OrganizationSearchVMContext,
} from "pages/search/components/organization/organisation.vm";

const DefaultLayout = ({
    children,
    className = "",
    showLogo = true,
    showSearchBar = true,
    page = "dataset",
    navContent,
}: {
    children: ReactNode;
    className?: string;
    showLogo?: boolean;
    page?: string;
    showSearchBar?: boolean;
    navContent?: ReactNode;
}) => {
    const vm = SearchVM(page == "dataset");
    const ovm: any = OrganizationSearchVM(page == "organisation");
    return (
        <div
            className={clsx(
                "w-full min-h-screen mx-auto flex flex-col",
                className
            )}
        >
            <OrganizationSearchVMContext.Provider value={ovm}>
                <SearchVMContext.Provider value={vm}>
                    <div className="mx-auto my-2 px-10 py-1 text-gray-800 bg-gray-100 text-sm">
                        <BsMegaphone
                            className="h-4 w-4 text-gray-700 inline mr-2 mb-1"
                            aria-hidden="true"
                        />
                        This is a{" "}
                        <span className="font-semibold">Pre-Beta</span> release.
                        Click to:
                        <a
                            href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                            className="hover:underline text-blue-600 "
                        >
                            Report a Bug
                        </a>{" "}
                        or
                        <a
                            href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                            className="hover:underline text-blue-600 ml-1"
                        >
                            Suggest a Feature
                        </a>
                        .
                    </div>
                    <Nav
                        showSearchBar={showSearchBar}
                        showLogo={showLogo}
                        content={navContent}
                        onSearchChange={vm.onSearchChange}
                    />
                    <div className="max-w-site mx-auto w-full">{children}</div>
                    {/* <div className="mt-auto"> */}
                    <Footer className="mt-8 bg-[#F5F5F5]" />
                    {/* </div> */}
                </SearchVMContext.Provider>
            </OrganizationSearchVMContext.Provider>
        </div>
    );
};

export default DefaultLayout;
