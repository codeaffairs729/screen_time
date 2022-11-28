import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationCard from "./notification_card";

const Notification = () => {
    const hasUnreadMessage = true;
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
                <div className="h-2 w-2 bg-dtech-notification-alert rounded absolute right-[2px] border border-white" />
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
                    className="shadow-custom-1 top-[25px] py-2 px-2.5 mt-1 select-none max-h-[80vh] min-h-[300px] overflow-auto absolute z-30 right-0 w-80 origin-top-right bg-white"
                >
                    <div className="flex px-2.5 pt-2 justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                            Notifications
                        </span>
                        <Link href={"#"}>
                            <span className="px-2.5 text-m underline cursor-pointer">
                                View all
                            </span>
                        </Link>
                    </div>
                    {["", "", "", "", "", "", ""].map((notification, index) => (
                        <NotificationCard
                            notification={notification}
                            key={index}
                            index={index}
                        />
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Notification;
