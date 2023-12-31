import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { RootState } from "store";
import { usereventLogout } from "services/usermetrics.service";
import { BsPersonCircle } from "react-icons/bs";
import Dropdown from "components/UI/drop_down";

const ProfileDropdown = ({ className = "" }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const name = user ? user.name : "Guest";
    const menuItems = [
        { label: "My Workspace", link: "/workspace" },
        { label: "My Account", link: "/account" },
        {
            label: "Log Out",
            onClick: () => {
                AuthService.logout();
                usereventLogout();
            },
        },
    ];

    const nameInitial = user
        ? user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
        : "G";
    
    const image = user?.user_image_url;

    return (
        <Dropdown
            className={className}
            menuTitle={`Hi, ${name}!`}
            label={image??nameInitial}
            menuItems={user ? menuItems : []}
            labelClasses="text-inherit text-sm w-[50px] h-[50px] flex justify-center items-center bg-[#f5f5f5] rounded-full text-[#e2e2e2] font-medium text-[24px] mr-[-1rem]"
            itemsClasses="rounded-[10px] shadow-none "
            menuItemsClasses="rounded-[10px]"
        />
    );
};

export default ProfileDropdown;
