import clsx from "clsx";
import SearchBar from "components/UI/search_bar_new";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchVM from "pages/search/search.vm";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { RxHamburgerMenu } from "react-icons/rx";
import NavMenuDropdown from "./components/nav_menu_dropdown";
import Notification from "./components/notification";
import ProfileDropdown from "./components/profile_dropdown";
import SignupDropdown from "./components/signup_dropdown";

const Nav = ({
    content,
    showLogo = true,
    showSearchBar = true,
    onSearchChange,
}: {
    content?: ReactNode;
    showLogo?: boolean;
    showSearchBar?: boolean;
    onSearchChange: any;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);

    return (
        <nav className="flex p-2 h-[var(--nav-height)] items-center relative mb-12 sm:mb-0 w-full max-w-site mx-auto">
            {showLogo && (
                <Link href="/">
                    <a className="block max-w-[200px] p-2.5">
                        <Image
                            src="/images/logo/dtechtive_without_tagline.svg"
                            width="89"
                            height="44"
                            alt="Dtechtive logo"
                        />
                    </a>
                </Link>
            )}
            {content}
            <div className="flex items-center justify-end grow">
                {showSearchBar && (
                    // <SearchBar
                    //     onChange={onSearchChange}
                    //     className="mr-24 ml-auto"
                    // />
                    <SearchBar
                        onChange={onSearchChange}
                        className="h-9 max-w-xl grow absolute inset-x-0 sm:relative top-20 sm:top-0 mx-4 sm:mx-auto"
                    />
                )}
                <div className="flex md:items-center flex-row-reverse md:flex-row relative">
                    <button
                        className="md:hidden w-10 h-10 text-dtech-dark-grey"
                        onClick={() =>
                            setShowResponsiveMenu(!showResponsiveMenu)
                        }
                    >
                        <RxHamburgerMenu />
                    </button>
                    <div
                        className={clsx(
                            "flex md:flex flex-col md:flex-row items-center absolute md:relative top-full bg-white md:bg-transparent px-5 md:px-0 shadow-lg md:shadow-none",
                            { hidden: !showResponsiveMenu }
                        )}
                    >
                        <NavItem label="Home" link="/" />
                        <NavItem label="About" link="/about-us" />
                        {user && (
                            <NavMenuDropdown
                                label="User contributions"
                                menuItems={[
                                    {
                                        label: "Register a data source",
                                        link: "/register-data-source",
                                    },
                                    // {
                                    //     label: "Domain Vocabulary Generator",
                                    //     link: "/user-vocabulary-generator",
                                    // },
                                ]}
                            />
                        )}

                        <NavItem
                            label="API"
                            link="https://api.dtechtive.com/docs"
                            openInNewTab={true}
                        />
                        {user && <Notification />}
                        {!user && <SignupDropdown />}
                        {!user && <NavItem label="Log In" link="/login" />}
                    </div>
                    <ProfileDropdown className="mx-4 md:mx-0" />
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({
    label,
    link,
    openInNewTab = false,
}: {
    label: string;
    link: string;
    openInNewTab?: boolean;
}) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <Link href={link}>
            <a
                target={openInNewTab ? "_blank" : "_self"}
                className={clsx(
                    "font-semibold text-sm text-gray-600 m-3 hover:text-dtech-secondary-dark whitespace-nowrap underline-offset-4 decoration-dtech-secondary-dark decoration-4",
                    { underline: currentRoute == link }
                )}
            >
                {label}
            </a>
        </Link>
    );
};

export default Nav;
