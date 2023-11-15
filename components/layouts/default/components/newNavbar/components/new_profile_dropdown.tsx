import NewDropdown from "components/UI/new_drop_down"
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { usereventLogout } from "services/usermetrics.service";
import { RootState } from "store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { useIsMobile } from "common/hooks";
const NewProfileDropdown = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user);
    const  { isMobile } = useIsMobile();
    const nameInitial = user
        ? user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
        : (isMobile && (router.route == "/")) ? "/images/icons/profile/user_mobile.svg" : "/images/icons/profile/user.svg";
    const image = user?.user_image_url;

    const menuItems =
        user ? [
            { label: "My Account", link: "/account", imagePath: "/images/icons/profile/my_account.svg", imagePathOnHover: "/images/icons/profile/transparent_my_account.svg" },
            { label: "My Workspace", link: "/workspace", imagePath: "/images/icons/profile/my_workspace.svg", imagePathOnHover: "/images/icons/profile/transparent_my_workspace.svg" },
            { label: "Notifications", link: "/workspace#notifications", imagePath: "/images/icons/profile/notifications.svg", imagePathOnHover: "/images/icons/profile/transparent_notifications.svg" },
            {
                label: "Log Out",
                imagePath: "/images/icons/lock.svg",
                imagePathOnHover: "images/icons/transparent_lock.svg",
                onClick: () => {
                    AuthService.logout();
                    usereventLogout();
                },
            },
        ] :
            [
                { label: "Sign up", link: "/signup", imagePath: "/images/icons/profile/person_add.svg", imagePathOnHover: "/images/icons/profile/transparent_person_add.svg" },
                { label: "Log in", link: "/login", imagePath: "/images/icons/profile/lock_open.svg", imagePathOnHover: "/images/icons/profile/transparent_lock_open.svg" },
            ];

    return (
        <NewDropdown
            menuItems={menuItems}
            label="Profile"
            labelClasses=" hidden sm:block"
            itemsClasses=" hover:bg-dtech-light-teal hover:text-white rounded-[10px]"
            dropDownImage={image ?? nameInitial}
            imageWidth={20}
            imageClasses="rounded-full overflow-hidden flex items-center justify-center"
        />
    )
}
export default NewProfileDropdown