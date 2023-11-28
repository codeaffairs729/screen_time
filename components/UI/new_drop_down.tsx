import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useContext, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import isURL from "validator/lib/isURL";
import InfoIcon from "./icons/info_icon";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import Image from "next/image";

function isImageString(image: string) {
    const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".svg",
        ".webp",
    ];
    const lowerCaseStr = image.toLowerCase();

    return imageExtensions.some((extension) =>
        lowerCaseStr.endsWith(extension)
    );
}

export type MenuItemType = {
    label: string;
    link?: string;
    imagePath?: string;
    onClick?: () => void;
    className?: string;
    isLast?: boolean;
    isBlank?: boolean;
    imagePathOnHover?: string;
    isAuthRequired?: boolean;
    isLoggedIn?: boolean;
    rel?: string;
};

const NewDropdown = ({
    label,
    menuItems,
    className = "",
    iconClass = "",
    labelClasses = "",
    menuItemsClasses = "",
    itemsClasses = "",
    dropDownImage,
    imageWidth = 10,
    isMobile = false,
    imageClasses = "",
    isLoggedIn = false,
}: {
    label?: string | ReactNode;
    menuItems: MenuItemType[];
    className?: string;
    iconClass?: string;
    labelClasses?: string;
    menuItemsClasses?: string;
    itemsClasses?: string;
    dropDownImage?: string;
    imageWidth?: number;
    isMobile?: boolean;
    imageClasses?: string;
    isLoggedIn?: boolean;
}) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const currentRoute = router.pathname;
    const onClick = (e: any) => {
        // e.preventDefault();
        e.stopPropagation();
        !showMenu && setShowMenu(true);
    };
    const { notifications } = useContext(NotificationsVMContext);

    return (
        <Menu
            as="div"
            className="relative inline-block text-left select-none outline-none"
        >
            <Menu.Button
                onClick={onClick}
                className={clsx(
                    "cursor-pointer flex items-center  select-none outline- flex-col relative ",
                    className
                )}
            >
                {dropDownImage && isImageString(dropDownImage) ? (
                    <div className={imageClasses}>
                        <img
                            src={dropDownImage}
                            width={imageWidth}
                            height={imageWidth}
                            className=" object-cover"
                        ></img>
                    </div>
                ) : (
                    <span
                        id="profile-dropdown"
                        className=" bg-white rounded-full -mt-1 font-bold text-dtech-main-dark min-w-[24px]"
                    >
                        <span className=" mx-2">{dropDownImage}</span>
                    </span>
                )}
                {label && typeof label == "string" ? (
                    isURL(label) ? (
                        <img
                            src={label}
                            height={50}
                            width={50}
                            className="rounded-full"
                        ></img>
                    ) : (
                        <span
                            id="profile-dropdown"
                            className={clsx(" ", labelClasses)}
                        >
                            {notifications?.length > 0 &&
                                !showMenu &&
                                label === "Profile" && (
                                    <div className=" absolute ml-10 mt-[-27px] h-4 w-4 bg-red-500 rounded-full text-white text-sm flex flex-row justify-center items-center">
                                        {notifications?.length}
                                    </div>
                                )}
                            {label}
                        </span>
                    )
                ) : (
                    <span
                        className={clsx(
                            "text-inherit text-sm select-none outline-nones",
                            labelClasses
                        )}
                        id="dropdown"
                    >
                        {label}
                    </span>
                )}
                {/* <VscTriangleDown
                    className={`ml-2 text-2xl text-inherit transition-all ${showMenu && "rotate-180"
                        } ${iconClass}`}
                /> */}
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
                        `outline-none flex flex-col ${
                            !isMobile && "right-0"
                        } absolute z-30 mt-2 p-2 w-max origin-top-right bg-white shadow-custom-1 rounded-[5px] ${
                            !isLoggedIn && isMobile &&
                            "transition-all delay-700 duration-75"
                        }`,
                        menuItemsClasses
                    )}
                >
                    {menuItems.map((m, i) => (
                        <MenuItem
                            key={i}
                            {...m}
                            isLoggedIn={isLoggedIn}
                            className={itemsClasses}
                        />
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const MenuItem = ({
    label,
    link,
    imagePath,
    onClick,
    isLast,
    rel,
    className,
    isBlank,
    imagePathOnHover,
    isAuthRequired = false,
    isLoggedIn = false,
}: MenuItemType) => {
    const router = useRouter();
    const currentRoute = router.pathname;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (!onClick && !link) {
        return null;
    }

    return (
        <Menu.Item>
            <div
                className=" flex flex-row w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {onClick ? (
                    <button
                        className={clsx(
                            " px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey flex flex-row items-center",
                            className
                        )}
                        onClick={onClick}
                    >
                        <img
                            src={isHovered ? imagePathOnHover : imagePath}
                            className=" mx-2"
                            loading="eager"
                        ></img>
                        {label}
                    </button>
                ) : isBlank ? (
                    <Link href={link as string} passHref>
                        <a
                            target="_blank"
                            rel={rel}
                            className="text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey flex flex-row items-center"
                        >
                            {/* <LinkTag
                                label={label}
                                className={className}
                                link={link}
                                isAuthRequired={isAuthRequired}
                                isLoggedIn={isLoggedIn}
                                isHovered={isHovered}
                            > */}

                            <span
                                className={clsx(
                                    " px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey cursor-pointer flex flex-row items-center relative",
                                    className
                                )}
                            >
                                <div>
                                    <img
                                        src={
                                            isHovered
                                                ? imagePathOnHover
                                                : imagePath
                                        }
                                        className={`mx-2`}
                                        loading="eager"
                                    ></img>
                                </div>
                                <div>{label}</div>
                            </span>

                            {/* </LinkTag> */}
                        </a>
                    </Link>
                ) : (
                    <LinkTag
                        label={label}
                        className={className}
                        link={link}
                        isAuthRequired={isAuthRequired}
                        isLoggedIn={isLoggedIn}
                        isHovered={isHovered}
                    >
                        <img
                            src={isHovered ? imagePathOnHover : imagePath}
                            className=" mx-2"
                            loading="eager"
                        ></img>
                    </LinkTag>
                )}
            </div>
        </Menu.Item>
    );
};

const LinkTag = React.forwardRef(
    (
        {
            link,
            className,
            children,
            isAuthRequired,
            isLoggedIn,
            label,
            isHovered,
        }: {
            link?: string;
            className?: string;
            label: string;
            isAuthRequired: boolean;
            isLoggedIn: boolean;
            children: ReactNode;
            isHovered: boolean;
        },
        ref: any
    ) => {
        const tooltipId = `dtechtive-info-tooltip-${uuidv4()}`;

        const { notifications } = useContext(NotificationsVMContext);
        return (
            <div className=" w-full">
                {isAuthRequired && !isLoggedIn ? (
                    <div
                        data-tip="Please login to access this"
                        data-for={tooltipId}
                        ref={ref}
                        className={clsx(
                            " px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey cursor-pointer flex flex-row items-center",
                            className
                        )}
                    >
                        <div>{children}</div>
                        <div>{label}</div>
                        <ReactTooltip
                            overridePosition={({ left, top }, _e, _t, node) => {
                                return {
                                    top,
                                    left:
                                        typeof node === "string"
                                            ? left
                                            : Math.max(left, 0),
                                };
                            }}
                            className=" font-bold !bg-dtech-dark-teal"
                        />
                    </div>
                ) : (
                    <Link href={link || "#"}>
                        <span
                            ref={ref}
                            className={clsx(
                                " px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey cursor-pointer flex flex-row items-center relative",
                                className
                            )}
                        >
                            <div>{children}</div>
                            {notifications?.length > 0 &&
                                label == "Notifications" && (
                                    <div className=" absolute ml-[7.5rem] h-4 w-4 bg-red-500 rounded-full text-white text-sm flex flex-row justify-center items-center">
                                        {notifications?.length}
                                    </div>
                                )}
                            <div>{label}</div>
                        </span>
                    </Link>
                )}
                <ReactTooltip
                    id={tooltipId}
                    className="!bg-dtech-dark-teal"
                    overridePosition={({ left, top }, _e, _t, node) => {
                        return {
                            top,
                            left:
                                typeof node === "string"
                                    ? left
                                    : Math.max(left, 0),
                        };
                    }}
                    textColor={"white"}
                    backgroundColor="#4CA7A5"
                />
            </div>
        );
    }
);
LinkTag.displayName = "LinkTag";

export default NewDropdown;
