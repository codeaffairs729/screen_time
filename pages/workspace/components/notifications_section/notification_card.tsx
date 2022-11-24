import clsx from "clsx";
import Link from "next/link";
import { getNotificationAge } from "../../workspace.vm";

const NotificationCard = ({ notification, index }: any) => {
    const notificationTitle = "Feedback request";
    const isMarkRead = false;
    const message =
        "Weekly Covid-19 deaths registered in Scotland. Provide feedback on Weekly Covid-19 deaths registered in Scotland";
    return (
        <div
            className={`${
                index % 2 == 0 ? "bg-dtech-main-light" : "bg-neutral-100"
            } my-4 px-2.5 py-2 cursor-pointer flex flex-col items-end rounded-lg text-dtech-additional-dark`}
        >
            <Link href={"#"}>
                <span className="flex items-center w-full">
                    <a
                        className={clsx(
                            "text-inherit block text-sm font-semibold mr-auto"
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

export default NotificationCard;
