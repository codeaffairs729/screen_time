import clsx from "clsx";
import Link from "next/link";
import {
    formatHeading,
    getNotificationAge,
    getNotificationSubHeading,
    notificationActionUrl,
} from "../../notification.vm";
import { Notification } from "../../notification.vm";

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
        <a href={notificationActionUrl(notification)} target="_blank">
            <div
                id={"workspace-notification-" + index}
                className={`${
                    !read_status ? "bg-dtech-main-light" : "bg-neutral-100"
                } my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end rounded-lg text-dtech-additional-dark min-h-[100px]`}
            >
                <span className="flex items-center w-full">
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
                        {getNotificationAge(created_at)}
                    </span>
                    {!read_status && (
                        <div
                            id={"workspace-notification-dot-" + index}
                            className="ml-3 h-3 w-3 bg-dtech-notification-alert-secondary rounded-full"
                        />
                    )}
                </span>
                <div
                    className={`text-gray-800 text-sm justify-between my-4 mr-auto w-1/2`}
                >
                    <span id={"workspace-notification-detail-" + index}>
                        {getNotificationSubHeading(notification_type)}{" "}
                    </span>
                    <span className="italic font-medium">{description}</span>
                </div>
            </div>
        </a>
    );
};

export default NotificationCard;
