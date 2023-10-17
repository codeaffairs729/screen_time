import clsx from "clsx";
import Link from "next/link";
import {
    formatHeading,
    getAge,
    getNotificationSubHeading,
    notificationActionUrl,
} from "../../notification.vm";
import { Notification } from "../../notification.vm";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const NotificationCard = ({
    notification,
    index,
}: {
    notification: Notification;
    index: number;
}) => {
    const { notification_type, description, read_status, created_at } =
        notification;
    return (
        <a
            href={notificationActionUrl(notification)}
            target="_blank"
            rel="noreferrer"
        >
            <div
                id={"workspace-notification-" + index}
                className={`${
                    !read_status ? "" : "bg-neutral-100"
                } my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end shadow-md text-dtech-new-main-light min-h-[100px] hover:bg-[#F5F5F5]`}
            >
                <div className="flex items-center w-full">
                    <span
                        id={"workspace-notification-heading-" + index}
                        className={clsx(
                            "text-inherit block text-sm font-semibold mr-auto"
                        )}
                    >
                        {formatHeading(notification_type)}
                    </span>
                    <span
                        id={"workspace-notification-age-" + index}
                        className="text-gray-600 text-sm"
                    >
                        {getAge(created_at)}
                    </span>
                    {!read_status && (
                        <div
                            id={"workspace-notification-dot-" + index}
                            className="ml-3 h-3 w-3 bg-dtech-light-teal rounded-full"
                        />
                    )}
                </div>
                <div
                    className={`text-gray-800 text-sm justify-between my-4 mr-auto w-full`}
                >
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>
                            <span id={"workspace-notification-detail-" + index}>
                                {getNotificationSubHeading(notification_type)}{" "}
                            </span>
                            <span className="italic font-medium">
                                {description}
                            </span>
                        </div>
                        <div className="mr-16">
                            <BiDotsHorizontalRounded className=" w-10 h-6 text-[#727272]" onClick={() => {}}/>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default NotificationCard;
