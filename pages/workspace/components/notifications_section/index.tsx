import { Menu } from "@headlessui/react";
import Link from "next/link";
import { MdOutlineFactCheck } from "react-icons/md";
import NotificationCard from "./notification_card";

const Notifications = () => {
    return (
        <Menu
            as="div"
            className="relative inline-block text-left m-2 flex flex-col w-full lg:w-3/4"
        >
            <Link href={"#"}>
                <div className="flex items-center justify-end cursor-pointer">
                    <MdOutlineFactCheck className="text-dtech-main-dark" />
                    <span className="pl-1.5 pr-2.5 text-sm text-dtech-dark-grey">
                        Mark all as read
                    </span>
                </div>
            </Link>
            {["", "", "", "", "", "", "", ""].map((notfication, index) => (
                <NotificationCard
                    notfication={notfication}
                    index={index}
                    key={index}
                />
            ))}
        </Menu>
    );
};

export default Notifications;
