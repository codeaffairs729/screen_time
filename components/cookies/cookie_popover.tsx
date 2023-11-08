import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import CookieIcon from "../../public/images/cookie.svg";
import Cookies from "js-cookie";
import Link from "next/link";

export default function CookiePopover() {
    let [isOpen, setIsOpen] = useState(true);
    let [isCookies, setIsCookies] = useState(false);

    function closeModal() {
        setIsOpen(false);
        setIsCookies(true);
    }

    if (isCookies == true) {
        Cookies.set("user", "true");
    }

    // Cookies.remove("user");

    const user = Cookies.get("user");

    return (
        <>
            {!user && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
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
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 flex item-center gap-2"
                                        >
                                            Let&#39;s talk Cookies!
                                            <Image
                                                src={CookieIcon}
                                                width={25}
                                                height={25}
                                                alt="cookie"
                                            />
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                We use cookies to make your
                                                interactions with our website
                                                more meaningful. They help us
                                                better understand how our
                                                website is used, so we can
                                                tailor content for you. Click
                                                &#39;Accept all cookies&#39; to
                                                agree to all cookies that
                                                collect anonymous data. You can
                                                decide which optional cookies to
                                                accept by clicking on ‘Manage
                                                preferences&#39;.
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center gap-4">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center p-4 rounded-[30px] bg-[#6E498E] text-white text-base font-bold border-0"
                                                onClick={closeModal}
                                            >
                                                Accept all cookies
                                            </button>
                                            <p
                                                className="text-[#0065BD]"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <Link href="/cookies">
                                                    Manage preferences
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </>
    );
}