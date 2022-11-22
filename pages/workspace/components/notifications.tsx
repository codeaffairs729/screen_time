import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { getNotificationAge } from "../workspace.vm";
import { MdOutlineFactCheck } from "react-icons/md";

const Notifications = () => {
    return (
        <Menu
            as="div"
            className="relative inline-block text-left m-2 flex flex-col"
        >
            <Link href={"#"}>
                <div className="flex items-center justify-end cursor-pointer">
                    <MdOutlineFactCheck className="text-dtech-main-dark" />
                    <span className="pl-1.5 pr-2.5 text-sm">
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

const NotificationCard = ({ notification, index }: any) => {
    const notificationTitle = "Feedback request";
    const isMarkRead = false;
    const message =
        "Weekly Covid-19 deaths registered in Scotland. Provide feedback on Weekly Covid-19 deaths registered in Scotland";
    return (
        <div
            className={`${
                index % 2 == 0 ? "bg-dtech-main-light" : "bg-neutral-100"
            } my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end rounded-lg`}
        >
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {notificationTitle}
                    </a>
                    <span className="text-gray-600 text-sm">
                        {getNotificationAge("Fri Nov 18 2022 15:44:32")}
                    </span>
                    {index % 2 == 0 && (
                        <div className="ml-3 h-3 w-3 bg-dtech-notification-alert-secondary rounded-full" />
                    )}
                </span>
            </Link>
            <div
                className={`text-gray-800 text-sm justify-between my-4 mr-auto w-1/2`}
            >
                <span>Provide feedback on </span>
                <span className="italic font-medium">{message}</span>
            </div>
        </div>
    );
};

export default Notifications;
