import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

export type MenuItemType = {
    label: string;
    link?: string;
    onClick?: () => void;
    isLast?: boolean;
};

const Dropdown = ({
    label,
    menuItems,
}: {
    label: string;
    menuItems: MenuItemType[];
}) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const currentRoute = router.pathname;
    // const isCurrentRoute = menuItems
    //     .map((m) => m.link)
    //     .filter((l) => l)
    //     .includes(currentRoute);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                onClick={() => !showMenu && setShowMenu(true)}
                className="cursor-pointer flex items-center ml-6 hover:text-dtech-main-dark outline-none"
            >
                <span className="text-inherit text-sm">{label}</span>
                <VscTriangleDown
                    className={`ml-2 text-2xl text-inherit transition-all ${
                        showMenu && "rotate-180"
                    }`}
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                afterLeave={() => setShowMenu(!showMenu)}
            >
                <Menu.Items
                    aria-label="profile dropdown menu"
                    className="absolute z-30 left-[-25%] mt-2 w-56 origin-top-right bg-white shadow-custom-1"
                >
                    {menuItems.map((m, i) => (
                        <MenuItem key={i} {...m} />
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const MenuItem = ({ label, link, onClick, isLast }: MenuItemType) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    if (!onClick && !link) {
        return null;
    }

    return (
        <Menu.Item>
            {onClick ? (
                <button
                    className="hover:bg-dtech-main-light text-dtech-primary-dark px-2.5 py-2 text-sm w-full shadow-underline text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey"
                    onClick={onClick}
                >
                    {label}
                </button>
            ) : (
                <Link href={link || "#"}>
                    <a className="hover:bg-dtech-main-light text-dtech-primary-dark px-2.5 py-2 text-sm w-full shadow-underline text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey">
                        {label}
                    </a>
                </Link>
            )}
        </Menu.Item>
    );
};

export default Dropdown;
