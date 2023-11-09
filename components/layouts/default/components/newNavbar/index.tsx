import Link from "next/link";
import { useRouter } from "next/router";
import NewProfileDropdown from "./components/new_profile_dropdown";
import NewNavMenuDropdown from "./components/new_nav_menu_dropdown";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useContext, useEffect, useState } from "react";
import NewSearchBar from "components/UI/white_label_search_bar";
import clsx from "clsx";
import { useIsMobile } from "common/hooks";
import { NotificationsVMContext } from "pages/workspace/notification.vm";

const NewNavbar = ({
    searching,
    showSearchBar,
    showLogo,
    handleSearchFocus,
    handleSearchBlur,
}: {
    searching: boolean;
    showSearchBar: boolean;
    showLogo: boolean;
    handleSearchFocus: () => void;
    handleSearchBlur: () => void;
}) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { isMobile } = useIsMobile();
    const { notifications } = useContext(NotificationsVMContext);

    return (
        <div
            className={clsx(
                "sm:bg-[#512C71] text-white sm:pr-[10%] h-10 sm:h-full px-[5%] py-2 z-10 ",
                !isMobile && showLogo
                    ? "flex justify-between items-center"
                    : " bg-dtech-main-dark",
                router.route === "/" && isMobile && " bg-transparent",
                showLogo && !isMobile && "!p-5 !px-8"
            )}
        >
            {showLogo && !isMobile && (
                <Link href="/">
                    <img
                        className=" cursor-pointer"
                        src="/images/Dtechtive_Logo_Header.svg"
                    />
                </Link>
            )}
            {showSearchBar && !isMobile && (
                <NewSearchBar
                    onChange={(type: string, option: any) => {
                        if (!option) return;
                        const searchType = type === "dataset" ? "" : type;

                        router.push({
                            pathname: `/search/${searchType}`,
                            query: { q: option.value },
                        });
                    }}
                    className={` !border-[#727272] border-[3px] rounded-full !bg-white sm:h-10 h-8 sm:w-[40%] ${
                        searching && "!border-dtech-light-teal"
                    }`}
                    onFocusSearchBar={handleSearchFocus}
                    onBlurSearchBar={handleSearchBlur}
                />
            )}
            <div>
                {user || isMobile || router.asPath != "/" ? (
                    <div className="flex flex-col p-2 float-right items-center hover:bg-opacity-60 hover:bg-white relative hover:rounded-[5px]">
                        {/* {notifications?.length > 0  && (
                            <div className=" absolute ml-10 mt-[-9px] h-4 w-4 bg-red-500 rounded-full text-white text-sm flex flex-row justify-center items-center">
                                {notifications?.length}
                            </div>
                        )} */}
                        <NewProfileDropdown />
                    </div>
                ) : (
                    <>
                        <Link href="/signup">
                            <div className=" hover:cursor-pointer p-2 float-right items-center flex flex-col hover:bg-opacity-60 hover:bg-white hover:rounded-[5px]">
                                <img
                                    src={
                                        "/images/icons/profile/add_person_desktop.svg"
                                    }
                                    width={25}
                                    // height={15}
                                />
                                <div className="hidden sm:block">Signup</div>
                            </div>
                        </Link>
                        <Link href="/login">
                            <div className=" hover:cursor-pointer p-2 float-right items-center flex flex-col hover:bg-opacity-60 hover:bg-white hover:rounded-[5px]">
                                <img
                                    src={
                                        "/images/icons/profile/lock_open_desktop.svg"
                                    }
                                    width={15}
                                />
                                <div className="hidden sm:block">Login</div>
                            </div>
                        </Link>
                    </>
                    // <div className="flex flex-col p-2 float-right items-left -mt-1">
                    //     <div className=" text-sm">Hi there!</div>
                    //     <div className="flex sm:flex-row flex-col mt-[1px]">
                    //         <Link href="/login">
                    //             <div className=" font-semibold cursor-pointer">
                    //                 Login
                    //             </div>
                    //         </Link>

                    //         <div>&nbsp; or &nbsp;</div>
                    //         <Link href="/signup">
                    //             <div className=" font-semibold cursor-pointer">
                    //                 Signup
                    //             </div>
                    //         </Link>
                    //     </div>
                    // </div>
                )}
                <div className=" float-left p-2 sm:float-right flex flex-col items-center hover:bg-opacity-60 hover:bg-white hover:rounded-[5px]">
                    <NewNavMenuDropdown isLoggedIn={user ? true : false} />
                </div>
                <Link href="/">
                    <div className=" hover:cursor-pointer p-2 float-right items-center flex flex-col hover:bg-opacity-60 hover:bg-white  hover:rounded-[5px]">
                        <img
                            src={
                                isMobile && router.route == "/"
                                    ? "/images/icons/profile/home_mobile.svg"
                                    : "/images/icons/profile/home.svg"
                            }
                            width={15}
                        />
                        <div className="hidden sm:block">Home</div>
                        {router.route === "/" && (
                            <div
                                className={
                                    !isMobile
                                        ? ` h-[2px] w-full bg-white`
                                        : `h-[2px] w-full bg-dtech-main-dark mt-[1px]`
                                }
                            ></div>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default NewNavbar;
