import NewDropdown from "components/UI/new_drop_down"
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { usereventLogout } from "services/usermetrics.service";
import { RootState } from "store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
const NewProfileDropdown = () => {
    const router = useRouter()
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
            { label: "Notifications", link: "/workspace", imagePath: "/images/icons/profile/notifications.svg", imagePathOnHover: "/images/icons/profile/transparent_notifications.svg" },
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
            itemsClasses=" hover:bg-dtech-main-dark hover:text-white"
            dropDownImage={image ?? nameInitial}
            imageWidth={20}
            imageClasses="rounded-full overflow-hidden flex items-center justify-center"
        />
    )
}
export default NewProfileDropdown