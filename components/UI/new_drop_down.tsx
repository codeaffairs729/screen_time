import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import isURL from "validator/lib/isURL";

function isImageString(image: string) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']; 
    const lowerCaseStr = image.toLowerCase();

    return imageExtensions.some(extension => lowerCaseStr.endsWith(extension));
}

export type MenuItemType = {
    label: string;
    link?: string;
    imagePath?: string;
    onClick?: () => void;
    className?: string;
    isLast?: boolean;
    isBlank?: boolean
    imagePathOnHover?: string;
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
    imageClasses =""
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
        imageClasses?: string
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
                    "cursor-pointer flex items-center  select-none outline- flex-col",
                    className
                )}
            >
                {dropDownImage && isImageString(dropDownImage) ? <div className={imageClasses}><img src={dropDownImage} width={imageWidth} height={imageWidth} className=" object-cover"></img></div> : <span
                    id="profile-dropdown"
                    className=" bg-white rounded-full -mt-1 font-bold text-dtech-main-dark w-6"
                >
                    {dropDownImage}
                </span>}
                {label&&typeof label == "string" ? isURL(label) ? <img src={label} height={50} width={50} className="rounded-full"></img> : <span
                    id="profile-dropdown"
                    className={clsx(
                        " ",
                        labelClasses
                    )}
                >
                    {label}
                </span> : <span
                    className={clsx(
                        "text-inherit text-sm select-none outline-nones",
                        labelClasses
                    )}
                    id="dropdown"
                >
                    {label}
                </span>}
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
                        `outline-none flex flex-col ${!isMobile && "right-0"} absolute z-30 mt-2 p-2 w-max origin-top-right bg-white shadow-custom-1`,
                        menuItemsClasses
                    )}
                >
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
    imagePath,
    onClick,
    isLast,
    className,
    isBlank,
    imagePathOnHover
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
            <div className=" flex flex-row"
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
                        <img src={isHovered ? imagePathOnHover : imagePath} className=" mx-2"></img>
                        {label}
                    </button>
                ) : isBlank ? (
                    <a target="_blank">
                        <LinkTag label={label} className={className} link={link} >
                                <img src={isHovered ? imagePathOnHover : imagePath} className=" mx-2"></img>
                        </LinkTag>
                    </a>
                ) : (
                    <LinkTag label={label} className={className} link={link} >
                                <img src={isHovered ? imagePathOnHover : imagePath} className=" mx-2"></img>
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
            label,
        }: { link?: string; className?: string; label: string, children: ReactNode },
        ref: any
    ) => (
        <Link href={link || "#"}>
            <span
                ref={ref}
                className={clsx(
                    " px-2.5 py-2 text-sm w-full text-left boder-b-1 shadow-dtech-dark-grey text-dtech-dark-grey cursor-pointer flex flex-row items-center",
                    className
                )}
            >
                <div>{children}</div>
                <div>{label}</div>
            </span>
        </Link>
    )
);
LinkTag.displayName = "LinkTag";

export default NewDropdown;
