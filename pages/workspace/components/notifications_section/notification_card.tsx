import clsx from "clsx";
import Link from "next/link";
import {
    formatHeading,
    getNotificationAge,
    getNotificationSubHeading,
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
        <div
            className={`${
                !read_status ? "bg-dtech-main-light" : "bg-neutral-100"
            } my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end rounded-lg text-dtech-additional-dark min-h-[100px]`}
        >
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-inherit block text-sm font-semibold mr-auto"
                        )}
                    >
                        {formatHeading(notification_type)}
                    </a>
                    <span className="text-gray-600 text-sm">
                        {getNotificationAge(created_at)}
                    </span>
                    {!read_status && (
                        <div className="ml-3 h-3 w-3 bg-dtech-notification-alert-secondary rounded-full" />
                    )}
                </span>
            </Link>
            <div
                className={`text-gray-800 text-sm justify-between my-4 mr-auto w-1/2`}
            >
                <span>{getNotificationSubHeading(notification_type)} </span>
                <span className="italic font-medium">{description}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
