import { Dialog, Transition } from "@headlessui/react";
import PrimaryBtn from "components/UI/form/primary_btn";
import User from "models/user.model";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AuthService from "services/auth.service";
import { RootState } from "store";

/**
 * Make sure the new session is valid
 *
 * Session can become invalid if the user has closed his browser tab without
 * logging out and `sessionTimeoutTime` time has passed.
 * In such a case this function is called on mount to check whether the
 * new session[the newly loaded page] is valid
 */
const isSessionValid = (enableIdleTimeout: boolean) => {
    if (!enableIdleTimeout) {
        return true;
    }
    const sessionTimeoutTime =
        Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT_TIME) * 1000;
    const currentTimeStamp = Date.now();
    const lastActivityTimeStamp = Number(
        localStorage.getItem("lastActivityTimeStamp")
    );
    return (
        !lastActivityTimeStamp ||
        currentTimeStamp - lastActivityTimeStamp < sessionTimeoutTime
    );
};

const IdleTimeoutModal = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const rememberMe = useSelector(
        (state: RootState) => state.auth.extraDetails?.rememberMe
    );
    const enableIdleTimeout = !!(user && !rememberMe); // done enable idle timeout if user not logged in or has enabled remember me when signing in
    const sessionTimeoutTime =
        Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT_TIME) * 1000; // Seconds after which the modal will be displayed
    const modalTimeoutTime = 300 * 1000; // [300|5mins]Seconds after modal is opened, user will be redirected to login page, unless user chooses to stay logged in
    const [isOpen, setIsOpen] = useState(false);
    const [timer, setTimer] = useState("00");
    const sessionTimeOut: any = useRef(null);
    const modalTimeOut: any = useRef(null);
    const modalTimer: any = useRef(null);

    // User click on "Stay Logged in"
    const stayLoggedIn = () => {
        setIsOpen(false);
        clearTimeout(sessionTimeOut.current);
        clearTimeout(modalTimeOut.current);
        clearInterval(modalTimer.current);
        sessionTimeOut.current = setTimeout(() => {
            setIsOpen(true);
        }, sessionTimeoutTime);
    };
    // User click on "Log out"
    const logOff = () => {
        clearTimeout(sessionTimeOut.current);
        clearTimeout(modalTimeOut.current);
        clearInterval(modalTimer.current);
        setIsOpen(false);
        AuthService.logout();
    };
    // Call back fired user presses a key or moves the pointer
    const userEventsListener = useCallback(() => {
        clearTimeout(sessionTimeOut.current);
        localStorage.setItem(
            "lastActivityTimeStamp",
            JSON.stringify(Date.now())
        );
        sessionTimeOut.current = setTimeout(() => {
            setIsOpen(true);
        }, sessionTimeoutTime);
    }, []);

    useEffect(() => {
        if (!isSessionValid(enableIdleTimeout)) {
            logOff();
        }
    }, []);

    useEffect(() => {
        // if user not logged in clear all timers
        if (!enableIdleTimeout) {
            clearTimeout(sessionTimeOut.current);
            clearTimeout(modalTimeOut.current);
            clearInterval(modalTimer.current);
            return;
        }
        stayLoggedIn();
        const userEvents = ["keydown", "mousemove"];
        userEvents.forEach((event) => {
            window.addEventListener(event, userEventsListener);
        });
        return () => {
            clearTimeout(sessionTimeOut.current);
            userEvents.forEach((event) => {
                window.removeEventListener(event, userEventsListener);
            });
        };
    }, [enableIdleTimeout]);

    useEffect(() => {
        if (!enableIdleTimeout) return;
        if (isOpen) {
            // Setup timer to be shown on the modal
            const currDt = new Date();
            currDt.setSeconds(currDt.getSeconds() + modalTimeoutTime / 1000);
            modalTimer.current = setInterval(() => {
                const diff =
                    Date.parse(currDt.toString()) -
                    Date.parse(new Date().toString());
                if (diff >= 0) {
                    const seconds = Math.floor(diff / 1000);
                    setTimer(`${seconds}`);
                } else {
                    clearInterval(modalTimer.current);
                    logOff();
                }
            }, 1000);
            // Setup timer to be to logout user if no action is taken
            modalTimeOut.current = setTimeout(() => {
                logOff();
            }, modalTimeoutTime);
        }
        return () => {
            clearInterval(modalTimer.current);
            clearTimeout(modalTimeOut.current);
        };
    }, [isOpen, enableIdleTimeout]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-40"
                open={isOpen}
                onClose={stayLoggedIn}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform rounded bg-white py-5 px-6 text-left align-middle shadow-xl transition-all border border-dtech-main-dark">
                                <Dialog.Title className="w-min mx-auto text-gray-700 whitespace-nowrap mb-4 font-semibold">
                                    Session Timeout
                                </Dialog.Title>
                                <div>
                                    Your session is about to expire and will be
                                    logged out in {timer} seconds. Do you need
                                    more time?
                                </div>
                                <div className="text-center mt-2 flex mt-10">
                                    <PrimaryBtn
                                        className="bg-dtech-main-dark w-min whitespace-nowrap  !px-16  !py-2 !rounded-lg !text-sm mx-auto"
                                        label="Log Off"
                                        onClick={logOff}
                                    />
                                    <PrimaryBtn
                                        className="bg-dtech-main-dark w-min whitespace-nowrap  !px-16  !py-2 !rounded-lg !text-sm mx-auto"
                                        label="Stay Logged In"
                                        onClick={stayLoggedIn}
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default IdleTimeoutModal;
