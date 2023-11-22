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
            {!user && isOpen &&(
                <div className="w-full h-full bg-black/25 fixed z-50 ">
                    <div className="w-[98%] m-auto left-0 right-0 top-3 fixed transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div
                            className="text-lg font-medium leading-6 text-gray-900 flex item-center gap-2"
                        >
                            Let&#39;s talk Cookies!
                            <Image
                                src={CookieIcon}
                                width={25}
                                height={25}
                                alt="cookie"
                            />
                        </div>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                We use{" "}
                                <a
                                    href="https://ico.org.uk/for-the-public/online/cookies/"
                                    className="outline-none text-blue-700 hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    cookies
                                </a>{" "}
                                to make your interactions with our website more
                                meaningful. They help us better understand how
                                our website is used, so we can tailor content
                                for you. Click &#39;Accept all cookies&#39; to
                                agree to all cookies that collect anonymous
                                data. You can decide which optional cookies to
                                accept by clicking on ‘Manage preferences&#39;.
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center p-4 rounded-[30px] bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white text-base font-bold border-0"
                                onClick={closeModal}
                            >
                                Accept all cookies
                            </button>
                            <p
                                className="text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black "
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <Link href="/cookies">Manage preferences</Link>
                            </p>
                        </div>
                    </div>
                </div>
                // <Transition appear show={isOpen} as={Fragment}>
                //     <Dialog
                //         as="div"
                //         className="relative z-50"
                //         onClose={closeModal}
                //     >
                //         <Transition.Child
                //             as={Fragment}
                //             enter="ease-out duration-300"
                //             enterFrom="opacity-0"
                //             enterTo="opacity-100"
                //             leave="ease-in duration-200"
                //             leaveFrom="opacity-100"
                //             leaveTo="opacity-0"
                //         >
                //             <div className="fixed inset-0 bg-black/25" />
                //         </Transition.Child>

                //         <Dialog.Panel
                //             className="fixed inset-0 overflow-y-auto"
                //             as="div"
                //         >
                //             <div className="flex justify-center p-4 text-center">
                //                 <Transition.Child
                //                     as={Fragment}
                //                     enter="ease-out duration-300"
                //                     enterFrom="opacity-0 scale-95"
                //                     enterTo="opacity-100 scale-100"
                //                     leave="ease-in duration-200"
                //                     leaveFrom="opacity-100 scale-100"
                //                     leaveTo="opacity-0 scale-95"
                //                 >
                //                     <div className="w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                //                         <Dialog.Title
                //                             as="h3"
                //                             className="text-lg font-medium leading-6 text-gray-900 flex item-center gap-2"
                //                         >
                //                             Let&#39;s talk Cookies!
                //                             <Image
                //                                 src={CookieIcon}
                //                                 width={25}
                //                                 height={25}
                //                                 alt="cookie"
                //                             />
                //                         </Dialog.Title>
                //                         <div className="mt-2">
                //                             <p className="text-sm text-gray-500">
                //                                 We use{" "}
                //                                 <a
                //                                     href="https://ico.org.uk/for-the-public/online/cookies/"
                //                                     className="outline-none text-blue-700 hover:underline"
                //                                     target="_blank"
                //                                     rel="noreferrer"
                //                                 >
                //                                     cookies
                //                                 </a>{" "}
                //                                 to make your interactions with
                //                                 our website more meaningful.
                //                                 They help us better understand
                //                                 how our website is used, so we
                //                                 can tailor content for you.
                //                                 Click &#39;Accept all
                //                                 cookies&#39; to agree to all
                //                                 cookies that collect anonymous
                //                                 data. You can decide which
                //                                 optional cookies to accept by
                //                                 clicking on ‘Manage
                //                                 preferences&#39;.
                //                             </p>
                //                         </div>

                //                         <div className="mt-4 flex items-center gap-4">
                //                             <button
                //                                 type="button"
                //                                 className="flex items-center justify-center p-4 rounded-[30px] bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white text-base font-bold border-0"
                //                                 onClick={closeModal}
                //                             >
                //                                 Accept all cookies
                //                             </button>
                //                             <p
                //                                 className="text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black "
                //                                 onClick={() => {
                //                                     setIsOpen(false);
                //                                 }}
                //                             >
                //                                 <Link href="/cookies">
                //                                     Manage preferences
                //                                 </Link>
                //                             </p>
                //                         </div>
                //                     </div>
                //                 </Transition.Child>
                //             </div>
                //         </Dialog.Panel>
                //     </Dialog>
                // </Transition>
            )}
        </>
    );
}
