import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillTriangleFill } from "react-icons/bs";
import { getNotificationAge } from "pages/workspace/workspace.vm";

const Notification = () => {
    const hasUnreadMessage = true;
    return (
        <Menu as="div" className="relative inline-block text-left m-2 flex">
            <Menu.Button
                aria-label="profile dropdown button"
                data-selector="profile-dropdown-button"
                className="text-2xl select-none"
            >
                <IoMdNotificationsOutline className="text-gray-600" />
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
                    className="shadow-custom-1 top-[25px] py-2 px-2.5 mt-1 select-none max-h-[80vh] min-h-[300px] overflow-auto absolute z-30 right-0 w-80 font-medium origin-top-right bg-white"
                >
                    {["", "", "", "", "", "", ""].map(
                        (notification, index) => (
                            <NotificationCard
                                notification={notification}
                                key={index}
                                index={index}
                            />
                        )
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const NotificationCard = ({
    notification,
    index,
}: {
    notification: any;
    index: number;
}) => {
    const notificationTitle = "Feedback request";
    const isMarkRead = false;
    const message = "Weekly Covid-19 deaths registered in Scotland";
    return (
        <div className="shadow-underline py-4 px-2.5 cursor-pointer flex flex-col items-end">
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {notificationTitle}
                    </a>
                    <span className="text-gray-600 text-[13px]">
                        {getNotificationAge("Fri Nov 22 2022 20:30:32")}
                    </span>
                    {index % 2 == 0 && (
                        <div className="h-3 w-3 bg-dtech-notification-alert-secondary ml-1 rounded-full border border-white" />
                    )}
                </span>
            </Link>
            <div className="my-2 text-[13px] font-normal">
                <span>Provide feedback on </span>
                <span className="italic font-medium">{message}</span>
            </div>
        </div>
    );
};

export default Notification;
