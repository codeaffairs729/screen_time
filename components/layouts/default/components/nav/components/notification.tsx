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
                    className="top-[25px] py-2 select-none max-h-[80vh] overflow-auto absolute z-30 right-0 w-72 font-medium origin-top-right bg-white shadow-lg border border-dtech-secondary-light"
                >
                    <div className="flex px-2.5 justify-between items-center text-[#7b42fb]">
                        <span className="text-inherit">Notifications</span>
                        <BsFillTriangleFill className="text-inherit" />
                    </div>
                    <Link href={"#"}>
                        <span className="px-2.5 text-[#7b42fb] text-xs underline cursor-pointer">
                            See all
                        </span>
                    </Link>
                    {["", "", "", "", "", "", "", ""].map(
                        (notfication, index) => (
                            <NotificationCard key={index} />
                        )
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const NotificationCard = ({ notification }: any) => {
    const notificationTitle = "Feedback request";
    const isMarkRead = false;
    return (
        <div className="bg-gray-100 my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end">
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-primary-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {notificationTitle}
                    </a>
                    {!isMarkRead && (
                        <div className="h-2 w-2 bg-dtech-alert rounded border border-white" />
                    )}
                </span>
            </Link>
            <div
                className={`${
                    isMarkRead ? "text-gray-500" : "text-semibold text-gray-600"
                } text-sm`}
            >
                Provide feedback on Weekly Covid-19 deaths registered in
                Scotland
            </div>
            <span className="text-gray-600 text-sm">
                {getNotificationAge("Fri Nov 18 2022 15:44:32")}
            </span>
        </div>
    );
};

export default Notification;
