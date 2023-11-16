import NewDropdown from "components/UI/new_drop_down"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { usereventLogout } from "services/usermetrics.service";
import { RootState } from "store";
import {useRouter} from "next/router"
import { useIsMobile } from "common/hooks";
const NewNavMenuDropdown = ({isLoggedIn=false}:{isLoggedIn:boolean}) => {
    const {isMobile} = useIsMobile();
    const router =useRouter()
    const menuItems =
        [
            { label: "Data Source Registration", link: "/register-data-source#register", imagePath: "/images/icons/data_source.svg", imagePathOnHover: "/images/icons/transparent_data_source.svg", isAuthRequired:true },
            { label: "Data Source Catalogue", link: "/register-data-source#viewCatalogue", imagePath: "/images/icons/data_source_catalogue.svg", imagePathOnHover: "/images/icons/transparent_data_source_catalogue.svg", isAuthRequired:true  },
            { label: "API", link: "https://api.dtechtive.com/docs", imagePath: "/images/icons/api.svg", imagePathOnHover: "/images/icons/transparent_api.svg" , isBlank: true , rel: "noreferrer"},
            // { label: "Subscription", link: "/account#subscription", imagePath: "/images/icons/subscription.svg", imagePathOnHover: "/images/icons/transparent_subscription.svg" },
        ]

    return (
        <NewDropdown
            menuItems={menuItems}
            label="Menu"
            labelClasses=" hidden sm:block pt-[2px]"
            itemsClasses=" hover:bg-dtech-light-teal hover:text-white rounded-[5px] "
            dropDownImage={(isMobile && (router.route == "/")) ? "/images/icons/profile/menu_mobile.svg" :"/images/icons/profile/menu.svg"}
            imageWidth={22}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
        />
    )
}
export default NewNavMenuDropdown