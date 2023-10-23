import { Menu } from "@headlessui/react";
import Link from "next/link";
import { MdOutlineFactCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "./notification_card";
import { RootState } from "store";
import {
    Notification,
    NotificationsVMContext,
} from "pages/workspace/notification.vm";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import Loader from "components/UI/loader";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Accordian from "components/UI/new_accordian";
import { useIsMobile } from "common/hooks";

const Notifications = () => {
    const { markAllRead, notifications, isLoading } = useContext(
        NotificationsVMContext
    );
    const [selectedIndex, setSelectedIndex] = useState<any>(0);

    const { isMobile } = useIsMobile();

    const qualityFeedbackNotifications = useMemo(
        () =>
            notifications.filter((notification) =>
                notification.notification_type.includes(
                    "quality_feedback_request"
                )
            ),
        [notifications]
    );

    const usecaseFeedbackNotifications = useMemo(
        () =>
            notifications.filter((notification) =>
                notification.notification_type.includes(
                    "usecase_feedback_request"
                )
            ),
        [notifications]
    );

    if (isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader sizeClass="h-8 w-8" />
            </div>
        );

    return (
        <>
            {!isMobile ? (
                <div>
                    <Link href={"#"}>
                        <div
                            id="mark-read"
                            onClick={() => markAllRead()}
                            className="flex items-center justify-end cursor-pointer mr-8 hover:font-bold"
                        >
                            <AiOutlineCheckCircle className="" />
                            <span className="pl-1.5 pr-2.5 text-sm text-dtech-dark-grey ">
                                Delete all
                            </span>
                        </div>
                    </Link>
                    <Tab.Group defaultIndex={selectedIndex}>
                        <div className=" md:flex ">
                            <Tab.List className=" items-center px-6 my-7 w-[30%]">
                                <FilterDropdown label="Categories">
                                    {[
                                        "All",
                                        "Use case feedback request",
                                        "Data quality feedback request",
                                    ].map((list: any, idx: any) => (
                                        <TabHeader
                                            key={idx}
                                            selectedIndex={selectedIndex}
                                            index={idx}
                                            onClick={() =>
                                                setSelectedIndex(idx)
                                            }
                                        >
                                            {list}
                                        </TabHeader>
                                    ))}
                                </FilterDropdown>
                            </Tab.List>
                            <Tab.Panels className="w-full flex">
                                <TabPanel className="!bg-white">
                                    {notifications.length > 0 ? (
                                        notifications.map(
                                            (notification, index) => (
                                                <NotificationCard
                                                    notification={notification}
                                                    index={index}
                                                    key={index}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div
                                            id="notification-tab"
                                            className="w-full text-center my-3"
                                        >
                                            No new notifications
                                        </div>
                                    )}
                                </TabPanel>
                                <TabPanel className="!bg-white">
                                    {usecaseFeedbackNotifications.length > 0 ? (
                                        usecaseFeedbackNotifications?.map(
                                            (notification, index) => (
                                                <NotificationCard
                                                    notification={notification}
                                                    index={index}
                                                    key={index}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div
                                            id="notification-tab"
                                            className="w-full text-center my-3"
                                        >
                                            No new notifications
                                        </div>
                                    )}
                                </TabPanel>
                                <TabPanel className="!bg-white">
                                    {qualityFeedbackNotifications.length > 0 ? (
                                        qualityFeedbackNotifications?.map(
                                            (notification, index) => (
                                                <NotificationCard
                                                    notification={notification}
                                                    index={index}
                                                    key={index}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div
                                            id="notification-tab"
                                            className="w-full text-center my-3"
                                        >
                                            No new notifications
                                        </div>
                                    )}
                                </TabPanel>
                            </Tab.Panels>
                        </div>
                    </Tab.Group>
                </div>
            ) : (
                <div className=" my-3">
                    <Link href={"#"}>
                        <div
                            id="mark-read"
                            onClick={() => markAllRead()}
                            className="flex items-center justify-end cursor-pointer mr-8"
                        >
                            <AiOutlineCheckCircle className="w-5 h-5" />
                            <span className="pl-1.5 pr-2.5 text-base text-dtech-dark-grey">
                                Delete all
                            </span>
                        </div>
                    </Link>
                    <Accordian
                        className=" "
                        label={"All"}
                        key="All"
                        section={"workspace"}
                    >
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <NotificationCard
                                    notification={notification}
                                    index={index}
                                    key={index}
                                />
                            ))
                        ) : (
                            <div
                                id="notification-tab"
                                className="w-full text-center"
                            >
                                No new notifications
                            </div>
                        )}
                    </Accordian>
                    <Accordian
                        className=" "
                        label={"Use case feedback request"}
                        key="Use_case_feedback_request"
                        section={"workspace"}
                    >
                        {usecaseFeedbackNotifications.length > 0 ? (
                            usecaseFeedbackNotifications?.map(
                                (notification, index) => (
                                    <NotificationCard
                                        notification={notification}
                                        index={index}
                                        key={index}
                                    />
                                )
                            )
                        ) : (
                            <div
                                id="notification-tab"
                                className="w-full text-center"
                            >
                                No new notifications
                            </div>
                        )}
                    </Accordian>
                    <Accordian
                        className=" "
                        label={"Data quality feedback request"}
                        key="Data_quality_feedback_request"
                        section={"workspace"}
                    >
                        {qualityFeedbackNotifications.length > 0 ? (
                            qualityFeedbackNotifications?.map(
                                (notification, index) => (
                                    <NotificationCard
                                        notification={notification}
                                        index={index}
                                        key={index}
                                    />
                                )
                            )
                        ) : (
                            <div
                                id="notification-tab"
                                className="w-full text-center"
                            >
                                No new notifications
                            </div>
                        )}
                    </Accordian>
                </div>
            )}
        </>
    );
};

export default Notifications;

const FilterDropdown = ({
    children,
    label,
}: {
    children: ReactNode;
    label: string;
}) => {
    return (
        <div className="my-1">
            <div className=" flex  justify-between items-center py-1.5 bg-[#6DCDCB]  px-3 cursor-pointer">
                <span>{label}</span>
            </div>
            <div className="flex flex-col flex-start my-1 ">{children}</div>
        </div>
    );
};

const TabHeader = ({
    children,
    onClick,
    selectedIndex,
    index,
}: {
    children: ReactNode;
    onClick: Function;
    selectedIndex: number;
    index: number;
}) => {
    return (
        <Tab
            className={({ selected }) =>
                `transition-all h-fit text-base outline-none text-left  hover:bg-[#EBEBEB] whitespace-nowrap
            text-[#727272] my-0.5 ${
                selected && " bg-gray-300 !text-gray-500 hover:text-black  "
            }
            `
            }
            onClick={() => onClick()}
        >
            <div className="flex items-center mx-2 my-2">
                {selectedIndex == index && (
                    <div
                        className={`cursor-pointer border-l-[3px]  border-[#6E498E] h-5 mx-2`}
                    ></div>
                )}
                <div className={`${selectedIndex !== index && "ml-[17px]"}`}>
                    {children}
                </div>
            </div>
        </Tab>
    );
};
