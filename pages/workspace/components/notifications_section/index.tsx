import { Menu } from "@headlessui/react";
import Link from "next/link";
import { MdOutlineFactCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import NotificationCard from "./notification_card";
import { RootState } from "store";
import { Notification, NotificationsVM } from "pages/workspace/workspace.vm";

const Notifications = () => {
    const { markAllRead } = NotificationsVM();
    const notifications: Notification[] = useSelector(
        (state: RootState) => state.user.notifications
    );

    return (
        <Menu
            as="div"
            className={`relative inline-block text-left m-2 flex flex-col w-full ${
                notifications.length && "lg:w-3/4"
            }`}
        >
            <Link href={"#"}>
                <div
                    id="mark-read"
                    onClick={() => markAllRead()}
                    className="flex items-center justify-end cursor-pointer"
                >
                    <MdOutlineFactCheck className="text-dtech-main-dark" />
                    <span className="pl-1.5 pr-2.5 text-sm text-dtech-dark-grey">
                        Mark all as read
                    </span>
                </div>
            </Link>
            {notifications.length > 0 ? (
                notifications.map((notfication, index) => (
                    <NotificationCard
                        notfication={notfication}
                        index={index}
                        key={index}
                    />
                ))
            ) : (
                <div id="notification-tab" className="w-full text-center">
                    No new notifications
                </div>
            )}
        </Menu>
    );
};

export default Notifications;
