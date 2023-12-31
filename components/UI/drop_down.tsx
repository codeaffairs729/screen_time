import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import isURL from "validator/lib/isURL";
import { BsChevronDown } from "react-icons/bs";

export type MenuItemType = {
    label: string;
    link?: string;
    onClick?: () => void;
    className?: string;
    isLast?: boolean;
};

const Dropdown = ({
    menuTitle,
    label,
    menuItems,
    className = "",
    iconClass = "",
    labelClasses = "",
    menuItemsClasses = "",
    itemsClasses = "",
    dropdownIcon = "",
}: {
    menuTitle?: string;
    label: string | ReactNode;
    menuItems: MenuItemType[];
    className?: string;
    iconClass?: string;
    labelClasses?: string;
    menuItemsClasses?: string;
    itemsClasses?: string;
    dropdownIcon?: string;
}) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const currentRoute = router.pathname;
    const onClick = (e: any) => {
        // e.preventDefault();
        e.stopPropagation();
        !showMenu && setShowMenu(true);
    };
    return (
        <Menu
            as="div"
            className="relative inline-block text-left select-none outline-none"
        >
            <Menu.Button
                onClick={onClick}
                className={clsx(
                    "cursor-pointer flex items-center  hover:text-dtech-main-dark select-none outline-none",
                    className
                )}
            >
                {typeof label=="string" ? isURL(label)?<img src={label} height={50} width={50} className="rounded-full"></img>:<span
                    id="profile-dropdown"
                    className={clsx(
                        " ",
                        labelClasses
                        )}
                        >
                    {label}
                </span>:<span
                    className={clsx(
                        "text-inherit text-sm select-none outline-nones",
                        labelClasses
                        )}
                        id="dropdown"
                >
                    {label}
                </span>}
                {dropdownIcon == "arrow" ? (
                    <BsChevronDown
                        className={`font-medium text-gray-500 transition-all ${
                            showMenu && "rotate-180"
                        } ${iconClass}`}
                    />
                ) : (
                    <VscTriangleDown
                        className={`ml-1 text-2xl text-inherit transition-all ${
                            showMenu && "rotate-180"
                        } ${iconClass}`}
                    />
                )}
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
                    className={clsx(
                        "outline-none flex flex-col right-0 absolute z-30 mt-2 w-56 origin-top-right bg-white shadow-custom-1 p-2",
                        menuItemsClasses
                    )}
                >
                    {menuTitle && (
                        <div
                            id="menu-title"
                            className="text-dtech-dark-grey text-sm px-2.5 py-1 text-center italic"
                        >
                            {menuTitle}
                        </div>
                    )}
                    {menuItems.map((m, i) => (
                        <MenuItem key={i} {...m} className={itemsClasses} />
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const MenuItem = ({
    label,
    link,
    onClick,
    isLast,
    className,
}: MenuItemType) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    if (!onClick && !link) {
        return null;
    }

    return (
        <Menu.Item>
            {onClick ? (
                <button
                    className={clsx(
                        "hover:bg-dtech-main-light px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey",
                        className
                    )}
                    onClick={onClick}
                >
                    {label}
                </button>
            ) : (
                <LinkTag label={label} className={className} link={link} />
            )}
        </Menu.Item>
    );
};

const LinkTag = React.forwardRef(
    (
        {
            link,
            className,
            label,
        }: { link?: string; className?: string; label: string },
        ref: any
    ) => (
        <Link href={link || "#"}>
            <span
                ref={ref}
                className={clsx(
                    "hover:bg-dtech-main-light px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey cursor-pointer",
                    className
                )}
            >
                {label}
            </span>
        </Link>
    )
);
LinkTag.displayName = "LinkTag";

export default Dropdown;
