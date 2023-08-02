import Link from "next/link"
import { useRouter } from "next/router";
import NewProfileDropdown from "./components/new_profile_dropdown";
import NewNavMenuDropdown from "./components/new_nav_menu_dropdown";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import NewSearchBar from "components/UI/white_label_search_bar";
import clsx from "clsx";

const NewNavbar = ({ showSearchBar, showLogo }: { showSearchBar: boolean, showLogo: boolean }) => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false)
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={clsx("sm:bg-[#512C71] text-white sm:pr-[10%] px-[5%] py-1 z-10 ", !isMobile && showLogo ? "flex justify-between items-center" : " bg-dtech-main-dark", (router.route === "/" && isMobile) && " bg-transparent", showLogo && !isMobile && "!p-5 !px-8")}>
            {showLogo && !isMobile && <Link href="/"><img className=" cursor-pointer" src="/images/Dtechtive_Logo_Header.png" /></Link>}
            {showSearchBar && !isMobile && <NewSearchBar
                onChange={(type: string, option: any) => {
                    if (!option) return;
                    const searchType =
                        type === "dataset" ? "" : type;

                    router.push({
                        pathname: `/search/${searchType}`,
                        query: { q: option.value },
                    });
                }}
                className=" rounded-full !bg-white sm:h-10 h-8 sm:w-[40%]"
            />}
            <div>

                {
                    user || isMobile
                        ?
                        <div className="flex flex-col p-2 float-right items-center hover:bg-opacity-60 hover:bg-white">
                            <NewProfileDropdown />
                        </div>
                        :
                        <div className="flex flex-col p-2 float-right items-left -mt-1">
                            <div className=" text-sm">
                                Hi there!
                            </div>
                            <div className="flex sm:flex-row flex-col mt-[1px]">
                                <Link href="/login"><div className=" font-semibold cursor-pointer">Login</div></Link>
                                <div>&nbsp; or &nbsp;</div>
                                <Link href="/signup"><div className=" font-semibold cursor-pointer">Signup</div></Link>
                            </div>

                        </div>
                }
                <div className=" float-left p-2 sm:float-right flex flex-col items-center hover:bg-opacity-60 hover:bg-white">
                    <NewNavMenuDropdown isLoggedIn={user ? true : false} />
                </div>
                <Link href="/">
                    <div className=" hover:cursor-pointer p-2 float-right items-center flex flex-col hover:bg-opacity-60 hover:bg-white">
                        <img src={(isMobile && (router.route == "/")) ? "/images/icons/profile/home_mobile.svg" : "/images/icons/profile/home.svg"} width={15} />
                        <div className="hidden sm:block">Home</div>
                        {router.route === "/" && <div className={!isMobile ? ` h-[2px] w-full bg-white` : `h-[2px] w-full bg-dtech-main-dark mt-[1px]`}></div>}
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default NewNavbar