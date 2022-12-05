import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import NotificationCard from "./notification_card";
import { RootState } from "store";
import {
    Notification,
    NotificationsVMContext,
} from "pages/workspace/notification.vm";
import Loader from "components/UI/loader";

const Notification = () => {
    const { isLoading, notifications } = useContext(NotificationsVMContext);

    const hasUnreadMessage = notifications.some(
        (notification: Notification) => !notification.read_status
    );
    return (
        <Menu as="div" className="relative inline-block text-left m-2 flex">
            <Menu.Button
                aria-label="profile dropdown button"
                data-selector="profile-dropdown-button"
                className="text-2xl select-none"
            >
                <IoMdNotificationsOutline
                    id="notification-bell-icon"
                    className="text-gray-600"
                />
            </Menu.Button>
            {hasUnreadMessage && (
                <div id="notification-alert" className="h-2 w-2 bg-dtech-notification-alert rounded absolute right-[2px] border border-white" />
            )}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    aria-label="profile dropdown menu"
                    className="shadow-custom-1 top-[25px] py-2 px-2.5 mt-1 select-none max-h-[80vh] overflow-auto absolute z-30 right-0 w-80 origin-top-right bg-white"
                >
                    <div className="flex px-2.5 pt-2 justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                            Notifications
                        </span>
                        <Link href={"/workspace#notifications"}>
                            <span id="view-all" className="px-2.5 text-m underline cursor-pointer">
                                View all
                            </span>
                        </Link>
                    </div>
                    {isLoading ? (
                        <div className="w-full py-6 px-2.5 h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : notifications.length ? (
                        notifications.map((notification, index) => (
                            <NotificationCard
                                notification={notification}
                                key={index}
                                index={index}
                            />
                        ))
                    ) : (
                        <div id="notification-not-found" className="w-full text-center p-4">
                            No new notifications
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Notification;
