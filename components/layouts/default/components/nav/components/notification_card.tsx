import Link from "next/link";
import clsx from "clsx";
import {
    formatHeading,
    getNotificationAge,
    getNotificationSubHeading,
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
        <div className="shadow-underline py-4 px-2.5 cursor-pointer flex flex-col items-end">
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {formatHeading(notification_type)}
                    </a>
                    <span className="text-gray-600 text-m">
                        {getNotificationAge(created_at)}
                    </span>
                    {!read_status && (
                        <div className="h-3 w-3 bg-dtech-notification-alert-secondary ml-1 rounded-full border border-white" />
                    )}
                </span>
            </Link>
            <div className="my-2 text-m font-normal text-gray-800 w-full">
                <span>{getNotificationSubHeading(notification_type)} </span>
                <span className="italic font-medium">{description}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
