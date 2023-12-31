import Http from "common/http";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useHttpCall } from "common/hooks";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import Dataset from "models/dataset.model";
import MNotification from "models/notification.model";
import { useSelector } from "react-redux";
import { RootState } from "store";

const NOTIFICATION_FETCH_TIME = 15 * 60 * 1000; //Fetch notifications every 15 mins
const TEST_NOTIFICATION_FETCH_TIME = 10 * 1000; //Fetch notifications every 10 seconds

export type Notification = {
    id: number;
    updated_at: string;
    created_at: string;
    read_at: string;
    read_status: string;
    description: string;
    dataset_id: number;
    notification_type: string;
};

export const getAge = (date: string) => {
    let seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const daysAgo = Math.floor(interval) + (Math.floor(interval) === 1 ? " day" : " days") + " ago";
        return daysAgo;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return " just now";
};

export const getNotificationSubHeading = (notification_type: string) => {
    const type = notification_type.replace("test_", "");

    switch (type?.toLowerCase()) {
        case "quality_feedback_request":
            return "Provide data quality feedback on";
        case "usecase_feedback_request":
            return "Provide use case feedback on";
        default:
            return "Provide feedback on";
    }
};

export const notificationActionUrl = (notification: Notification) => {
    const { notification_type, dataset_id: datasetId } = notification;
    const type = notification_type.replace("test_", "");

    switch (type?.toLowerCase()) {
        case "quality_feedback_request":
            return `/datasets/${datasetId}#feedback/quality`;
        default:
            return `/datasets/${datasetId}#feedback/usecase`;
    }
};

export const formatHeading = (notification_type: string) => {
    const notification = notification_type.replace("quality_feedback_request","data_quality_feedback_request") 
    const type = notification.replace("test_", "").replaceAll("_", " ");
    const newType = type.split(" ")[0] === "usecase" ? "use case " + type.split(" ").splice(1).join(" ") : type
    const heading = `${newType[0].toUpperCase()}${newType.slice(1)}`;
    return heading ? heading : "Feedback request";
};

export const NotificationsVM = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<MNotification[]>([]);
    const { execute } = useHttpCall();

    const markAllRead = () => {
        execute(
            () => {
                return Http.patch(`/v1/notifications/mark_all_read`);
            },
            {
                onSuccess: (res) => {
                    toast.success("Notifications expired successfully");
                    const responseNotifications =
                        MNotification.fromJsonList(res);
                    setNotifications(responseNotifications);
                    setIsLoading(false);
                },
                onError: async (error: any) => {
                    toast.error(
                        "Something went wrong while fetching notifications"
                    );
                    setIsLoading(false);
                    console.log(error, "error");
                },
            }
        );
    };

    const fetchNotifications = (user: any) => {
        const fetchTime =
            user.email == "test.registered.user@dtime.ai"
                ? TEST_NOTIFICATION_FETCH_TIME
                : NOTIFICATION_FETCH_TIME; //Notification Fetch time 10s for test user
        console.log(user.email, "user.email");
        execute(
            () => {
                return Http.get(`/v1/notifications/`);
            },
            {
                onSuccess: (res) => {
                    const responseNotifications =
                        MNotification.fromJsonList(res);
                    setNotifications(responseNotifications);
                    setIsLoading(false);
                },
                onError: async (error: any) => {
                    toast.error(
                        "Something went wrong while fetching notifications"
                    );
                    setIsLoading(false);
                    console.log(error, "error");
                },
            }
        );

        if (document.cookie.includes(AUTH_TOKEN)) {
            setTimeout(() => fetchNotifications(user), fetchTime);
        }
    };

    const createFeedbackNotification = (dataset: Dataset, user: any) => {
        const { id: dataset_id, detail } = dataset;
        const { name: title } = detail;
        execute(
            () => {
                return Http.post(`/v1/notifications/feedback_request`, {
                    dataset_id,
                    title,
                    type:
                        user.email == "test.registered.user@dtime.ai"
                            ? "test"
                            : "", // Notification type for test user will be test
                });
            },
            {
                onSuccess: (res) => {
                    console.log("Success");
                },
                onError: async (error: any) => {
                    console.log(error, "error");
                },
            }
        );
    };

    return {
        isLoading,
        notifications,
        markAllRead,
        fetchNotifications,
        createFeedbackNotification,
    };
};

interface INotificationsVMContext {
    notifications: Notification[];
    isLoading: boolean;
    markAllRead: Function;
    fetchNotifications: Function;
    createFeedbackNotification: Function;
}

export const NotificationsVMContext = createContext<INotificationsVMContext>(
    {} as INotificationsVMContext
);
