import { Menu } from "@headlessui/react";
import Link from "next/link";
import { MdOutlineFactCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "./notification_card";
import { RootState } from "store";
import {
    Notification,
    NotificationsVMContext,
} from "pages/workspace/notification.vm";
import { useContext } from "react";
import Loader from "components/UI/loader";

const Notifications = () => {
    const { markAllRead, notifications, isLoading } = useContext(
        NotificationsVMContext
    );

    const dispatch = useDispatch();

    if (isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader sizeClass="h-8 w-8"/>
            </div>
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
                    onClick={() => markAllRead(dispatch)}
                    className="flex items-center justify-end cursor-pointer"
                >
                    <MdOutlineFactCheck className="text-dtech-main-dark" />
                    <span className="pl-1.5 pr-2.5 text-sm text-dtech-dark-grey">
                        Mark all as read
                    </span>
                </div>
            </Link>
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <NotificationCard
                        notification={notification}
                        index={index}
                        key={index}
                    />
                ))
            ) : (
                <div className="w-full text-center">No new notifications</div>
            )}
        </Menu>
    );
};

export default Notifications;
