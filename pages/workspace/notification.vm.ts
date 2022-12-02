import Http from "common/http";
import { SearchOption } from "components/UI/dataset_search_input";
import { isEqual } from "lodash-es";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SingleValue } from "react-select";
import { updateCache } from "store/cache/cache.action";
import useSWR from "swr";
import Dataset from "../../models/dataset.model.v4";
import { usereventSearchQueryResults } from "services/usermetrics.service";
import { useHttpCall } from "common/hooks";
import { updateNotifications } from "store/user/user.action";
import { AUTH_TOKEN } from "common/constants/cookie.key";

const NOTIFICATION_FETCH_TIME = 60 * 1000; //Fetch notifications every 30 mins

export type Notification = {
    id: number;
    updated_at: string;
    created_at: string;
    read_at: string;
    read_status: string;
    description: string;
    notification_type: string;
};

export const getNotificationAge = (date: string) => {
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
        return Math.floor(interval) + " days ago";
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

export const getNotificationSubHeading = (type: string) => {
    switch (type?.toLowerCase()) {
        case "feedback_request":
            return "Provide feedback on";
        default:
            return "Provide feedback on";
    }
};

export const formatHeading = (type: string) => {
    const heading = type
        ?.split("_")
        .reduce((pv, cv) => `${pv} ${cv[0].toUpperCase()}${cv.slice(1)}`);
    return heading ? heading : "Feedback request";
};

export const NotificationsVM = () => {
    const [notifications, setNotifications] = useState([]);
    const { isLoading, execute } = useHttpCall();

    const markAllRead = () => {
        execute(
            () => {
                return Http.get(`/v1/notifications/mark_all_read`);
            },
            {
                onSuccess: (res) => {
                    toast.success("Notifications expired successfully");
                    console.log(res, "data");
                    //   dispatch({ notifications: [] });
                },
                onError: async (error: any) => {
                    toast.error(
                        "Something went wrong while fetching notifications"
                    );
                    console.log(error, "error");
                },
            }
        );
    };

    const fetchNotifications = (dispatch: any) => {
        const ref = setInterval(() => {
            document.cookie.includes(AUTH_TOKEN)
                ? execute(
                      () => {
                          return Http.get(`/v1/notifications/`);
                      },
                      {
                          onSuccess: (res) => {
                              console.log(res, "data");
                              dispatch(updateNotifications(res));
                          },
                          onError: async (error: any) => {
                              toast.error(
                                  "Something went wrong while fetching notifications"
                              );
                              console.log(error, "error");
                          },
                      }
                  )
                : clearInterval(ref);
        }, NOTIFICATION_FETCH_TIME);
    };

    return {
        isLoading,
        notifications,
        markAllRead,
        fetchNotifications,
    };
};
