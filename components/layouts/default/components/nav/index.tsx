import clsx from "clsx";
import SearchBar from "components/UI/search_bar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchVM from "pages/search/search.vm";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
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

    return (
        <nav className="flex p-2 h-[var(--nav-height)] items-center">
            {showLogo && (
                <Link href="/">
                    <a className="block max-w-[200px] p-2.5">
                        <Image
                            src="/images/logo/dtechtive_without_strapline.png"
                            width="89"
                            height="44"
                            alt="Dtechtive logo"
                        />
                    </a>
                </Link>
            )}
            {showSearchBar && <SearchBar onChange={onSearchChange} />}
            {content}
            <div className="ml-auto flex items-center">
                <NavItem label="Home" link="/" />
                {user && (
                    <NavMenuDropdown
                        label="User contributions"
                        menuItems={[
                            {
                                label: "Data Source Registration",
                                link: "/register-data-source",
                            },
                            {
                                label: "Domain Vocabulary Generator",
                                link: "/user-vocabulary-generator",
                            },
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
                <ProfileDropdown />
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
