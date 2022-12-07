import Link from "next/link";
import clsx from "clsx";
import {
    formatHeading,
    getNotificationAge,
    getNotificationSubHeading,
    notificationActionUrl,
} from "pages/workspace/notification.vm";
import { Notification } from "pages/workspace/notification.vm";

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
                id={"notification-" + index}
                className="shadow-underline py-4 px-2.5 cursor-pointer flex flex-col items-end"
            >
                <span className="flex items-center w-full">
                    <span
                        id={"notification-heading-" + index}
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {formatHeading(notification_type)}
                    </span>
                    <span
                        id={"notification-age-" + index}
                        className="text-gray-600 text-m"
                    >
                        {getNotificationAge(created_at)}
                    </span>

                    {!read_status && (
                        <div
                            id={"notification-dot-" + index}
                            className="h-3 w-3 bg-dtech-notification-alert-secondary ml-1 rounded-full border border-white"
                        />
                    )}
                </span>

                <div className="my-2 text-m font-normal text-gray-800 w-full limit-line">
                    <span id={"notification-detail-" + index}>
                        {getNotificationSubHeading(notification_type)}{" "}
                    </span>
                    <span className="italic font-medium">{description}</span>
                </div>
            </div>
        </a>
    );
};

export default NotificationCard;
