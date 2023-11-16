import { ReactNode } from "react";
import clsx from "clsx";
import Nav from "./components/nav";
// import Footer from "./components/footer";
import { useEffect, useState } from "react";

import { BsMegaphone } from "react-icons/bs";
// import SearchVM, { SearchVMContext } from "pages/search/search.vm";
// import OrganizationSearchVM, {
//     OrganizationSearchVMContext,
// } from "pages/search/components/organization/organisation.vm";
import { SearchOption } from "components/UI/dataset_search_input";
import router from "next/router";
import { SingleValue } from "react-select";
import { updateCache } from "store/cache/cache.action";
import { useDispatch } from "react-redux";
import Footer from "pages/home/components/footer";
import NewNavbar from "./components/newNavbar";
import NewSearchBar from "components/UI/white_label_search_bar";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";
import { useIsMobile } from "common/hooks";
import { useRouter } from "next/router";
import Cookies from "js-cookie";


const DefaultLayout = ({
    children,
    className = "",
    showLogo = true,
    showSearchBar = true,
    navContent,
    wrapperClass,
}: {
    children: ReactNode;
    className?: string;
    showLogo?: boolean;
    showSearchBar?: boolean;
    navContent?: ReactNode;
    wrapperClass?: string;
}) => {
    // const vm = SearchVM(page == "dataset");
    // const ovm: any = OrganizationSearchVM(page == "organisation");
    const dispatch = useDispatch();
    const { isMobile} = useIsMobile();
    const [searching, setSearching] = useState(false);

    const route = useRouter();
    useEffect(()=>{
        if(!["/login", "/signup"].includes(route.pathname)){
            Cookies.remove('userData');
        }
    },[])

    const handleSearchFocus = () => {
        setSearching(true);
    };

    const handleSearchBlur = () => {
        setSearching(false);
    };

    const onSearchChange = (
        type: string,
        option: SingleValue<SearchOption>
    ) => {
        if (!option) return;
        const searchType = type === "dataset" ? "" : type;

        dispatch(updateCache("last-search-query", option.value));
        // setCurrentPageNo(1);
        router.push({
            pathname: `/search/${searchType}`,
            query: { ...router.query, q: option.value, page: 1 }, // page is 1 because its a new search
        });
    };
    return (
        <div
            className={clsx(
                "w-full min-h-screen mx-auto flex flex-col relative bg-[#EBEBEB]",
                className
            )}
        >
            {<div className={searching ?" bg-black fixed opacity-50  top-0 left-0 right-0 bottom-0 sm:h-[3000px] h-full w-full  z-20":"hidden"}></div>}
            {/* <OrganizationSearchVMContext.Provider value={ovm}> */}
            {/* <SearchVMContext.Provider value={vm}> */}
            {/* <div className="mx-auto my-2 px-10 py-1 text-gray-800 bg-gray-100 text-sm">
                        <BsMegaphone
                            className="h-4 w-4 text-gray-700 inline mr-2 mb-1"
                            aria-hidden="true"
                        />
                        This is a{" "}
                        <span className="font-semibold">Beta</span> release.
                        Click to
                        <a
                            href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                            className="hover:underline text-blue-600 "
                        >
                            : Report a Bug
                        </a>{" "}
                        or
                        <a
                            href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                            className="hover:underline text-blue-600 ml-1"
                        >
                            Suggest a Feature
                        </a>
                        .
                    </div> */}
            {/* <Nav
                        showSearchBar={showSearchBar}
                        showLogo={showLogo}
                        content={navContent}
                        onSearchChange={onSearchChange}
            /> */}
            <div className="">

            <NewNavbar searching={searching} showSearchBar={true} showLogo={true} handleSearchFocus={handleSearchFocus} handleSearchBlur={handleSearchBlur} />
            </div>
            {isMobile && <div className="flex items-center py-4 mb-4 justify-center">
                <NewSearchBar
                    onChange={(type: string, option: any) => {
                        if (!option) return;
                        const searchType =
                            type === "dataset" ? "" : type;

                        router.push({
                            pathname: `/search/${searchType}`,
                            query: { q: option.value },
                        });
                    }}
                    onFocusSearchBar={handleSearchFocus}
                    onBlurSearchBar={handleSearchBlur}

                    className={` !border-[#727272] rounded-full !bg-white sm:h-10 h-8 w-[90%] border-2  ${searching && "!border-dtech-light-teal"}`}
                />
            </div>}
            <div className={clsx(`max-w-site mx-auto w-full`, wrapperClass)}>{children}</div>
            {/* <div className="mt-auto"> */}
            <Footer />
            {/* </div> */}
            {/* </SearchVMContext.Provider> */}
            {/* </OrganizationSearchVMContext.Provider> */}
        </div>
    );
};

export default DefaultLayout;
