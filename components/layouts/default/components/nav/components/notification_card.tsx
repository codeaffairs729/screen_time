import Link from "next/link";
import clsx from "clsx";
import {
    getNotificationAge,
    getNotificationHeading,
} from "pages/workspace/workspace.vm";
import { Notification } from "pages/workspace/workspace.vm";

const NotificationCard = ({
    notification,
    index,
}: {
    notification: Notification;
    index: number;
}) => {
    const { notification_type, description, read_status } = notification;
    return (
        <div className="shadow-underline py-4 px-2.5 cursor-pointer flex flex-col items-end">
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {notification_type}
                    </a>
                    <span className="text-gray-600 text-m">
                        {getNotificationAge("Fri Nov 22 2022 20:30:32")}
                    </span>
                    {read_status == "True" && (
                        <div className="h-3 w-3 bg-dtech-notification-alert-secondary ml-1 rounded-full border border-white" />
                    )}
                </span>
            </Link>
            <div className="my-2 text-m font-normal text-gray-800">
                <span>{getNotificationHeading(notification_type)} </span>
                <span className="italic font-medium">{description}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
