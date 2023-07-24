import NewDropdown from "components/UI/new_drop_down"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { usereventLogout } from "services/usermetrics.service";
import { RootState } from "store";

const NewNavMenuDropdown = ({isLoggedIn=false}:{isLoggedIn:boolean}) => {
    const [isMobile, setIsMobile] = useState(false)
    const menuItems =
        [
            { label: "Data Source Registeration", link: "/register-data-source", imagePath: "/images/icons/data_source.svg", imagePathOnHover: "/images/icons/transparent_data_source.svg", isAuthRequired:true },
            // { label: "Data Source Catalogue", link: "https://api.dtechtive.com/docs", imagePath: "/images/icons/data_source_catalogue.svg", imagePathOnHover: "/images/icons/transparent_data_source_catalogue.svg", isBlank: true },
            { label: "API", link: "https://api.dtechtive.com/docs", imagePath: "/images/icons/api.svg", imagePathOnHover: "/images/icons/transparent_api.svg" },
            // { label: "Subscription", link: "/account#subscription", imagePath: "/images/icons/subscription.svg", imagePathOnHover: "/images/icons/transparent_subscription.svg" },
        ]
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
        <NewDropdown
            menuItems={menuItems}
            label="Menu"
            labelClasses=" hidden sm:block mt-[1px]"
            itemsClasses=" hover:bg-dtech-main-dark hover:text-white "
            dropDownImage={isMobile ? "/images/icons/profile/menu_mobile.svg" :"/images/icons/profile/menu.svg"}
            imageWidth={22}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
        />
    )
}
export default NewNavMenuDropdown