import Link from "next/link";
import clsx from "clsx";
import { getNotificationAge } from "pages/workspace/workspace.vm";

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
        <div id={"feedback-request-"+index} className="shadow-underline py-4 px-2.5 cursor-pointer flex flex-col items-end">
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-dtech-additional-dark block text-sm font-semibold mr-auto"
                        )}
                    >
                        {notificationTitle}
                    </a>
                    <span className="text-gray-600 text-m">
                        {getNotificationAge("Fri Nov 22 2022 20:30:32")}
                    </span>
                    {index % 2 == 0 && (
                        <div id="notification-dot" className="h-3 w-3 bg-dtech-notification-alert-secondary ml-1 rounded-full border border-white" />
                    )}
                </span>
            </Link>
            <div className="my-2 text-m font-normal text-gray-800">
                <span>Provide feedback on </span>
                <span className="italic font-medium">{message}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
