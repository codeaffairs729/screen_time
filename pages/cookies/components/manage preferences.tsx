import { useState } from "react";
import { data } from "./manage_cookies.json";
import CookieIcon from "../../../public/images/cookie.svg";
import Cookies from "js-cookie";
import Image from "next/image";
import SwitchBtn from "components/UI/buttons/switch_btn";
import { useRouter } from "next/router";
import NewNavbar from "components/layouts/default/components/newNavbar";
import DefaultLayout from "components/layouts/default";
import { AiOutlineClose } from "react-icons/ai";

const ManagePreference = () => {
    const router = useRouter();
    const [searching, setSearching] = useState(false);
    const [betaLabel, setBetaLabel] = useState(false);

    const handleSearchFocus = () => {
        setSearching(true);
    };

    const handleSearchBlur = () => {
        setSearching(false);
    };

    const user = Cookies.get("user");
    return (
        <div className="flex flex-col">
            {!betaLabel && (
                <div className="sm:mt-4  flex flex-row justify-between items-center px-6 sm:px-[10%] py-3 bg-dtech-middle-grey sm:bg-white z-10">
                    <div className=" flex flex-row justify-center items-center bg-dtech-middle-grey sm:bg-white z-10">
                        <div>
                            <div className=" bg-dtech-new-main-light text-white font-semibold sm:mt-0 px-4 py-1 sm:py-0 rounded-md">
                                BETA
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm flex flex-col sm:flex-row ml-6 sm:mt-0 ">
                            <div className=" ">
                                This is a new service.&nbsp;
                            </div>
                            <div className="">
                                Click to&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                                    className="underline text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black "
                                >
                                    Report a Bug
                                </a>
                                &nbsp;or
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                                    className="underline text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black"
                                >
                                    Suggest a Feature
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <AiOutlineClose
                            className="w-4 h-4 font-extrabold cursor-pointer"
                            strokeWidth={"2"}
                            onClick={() => setBetaLabel(true)}
                        />
                    </div>
                </div>
            )}

            <NewNavbar
                searching={false}
                showLogo={false}
                showSearchBar={false}
                handleSearchFocus={handleSearchFocus}
                handleSearchBlur={handleSearchBlur}
            />

            <div className="block sm:flex flex-col justify-center items-center">
                <div>
                    <img
                        src="/images/Managepreferences.svg"
                        alt="Managepreferences"
                    />
                </div>

                <div>
                    <div className="mx-0 sm:mx-[50px]">
                        <div className="text-[22px] p-6 sm:p-0  font-bold leading-6 text-[#333333] flex item-center gap-2">
                            Let&#39;s talk Cookies!
                            <Image
                                src={CookieIcon}
                                width={25}
                                height={25}
                                alt="cookie"
                            />
                        </div>
                        <div className="p-5 sm:p-0 sm:mt-2 ">
                            <p className="text-base sm:text-[19px] text-[#333333] font-normal">
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
                                for you. Click &apos;Accept all cookies&apos; to
                                agree to all cookies that collect anonymous data
                                or manage your preferences further below and
                                save them.
                            </p>
                        </div>

                        <div className="mt-2 sm:mt-4 flex sm:justify-start sm:items-center gap-4 justify-center">
                            <button
                                type="button"
                                className="flex items-center justify-center p-3 rounded-[30px] bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white text-base font-bold border-0"
                                onClick={() => {
                                    Cookies.set("user", "true");
                                    router.push("/");
                                }}
                            >
                                Accept all cookies
                            </button>
                        </div>
                    </div>

                    <div className=" border-[1px] border-[#6DCDCB] px-6 pt-6 pb-12 mx-[30px] my-[10px] sm:px-12 sm:mx-[50px] sm:my-[20px] rounded-xl ">
                        <div className="text-[#333333] mb-14">
                            <h1 className="text-xl sm:text-[22px] font-bold mb-4">
                                Turn cookies on or off
                            </h1>
                            <h1 className="text-base text-[19px] font-normal">
                                You can choose which cookies you&apos;re happy
                                for us to use. Any data collected is anonymous.
                            </h1>
                        </div>
                        <div className="bg-[#F4F4F4] border-[#949494] p-3">
                            <div className="py-0 px-0 sm:px-14 sm:py-5 ">
                                <h1 className="text-base sm:text-[19px] text-[#333333] font-bold">
                                    Cookies needed for the website to work
                                </h1>
                                <p className="text-base sm:text-[19px] text-[##727272] font-normal">
                                    These cookies do things like keep the
                                    website secure. They always need to be on.
                                </p>
                            </div>
                            {data.map((item, index) => (
                                <div
                                    className="border-t-[1px] border-[#949494] py-0 px-0 sm:px-14 sm:py-5"
                                    key={index}
                                >
                                    <div className="flex sm:flex justify-between ">
                                        <div>
                                            <h1 className="text-base sm:text-[19px] text-[#333333] font-bold">
                                                {item.title}
                                            </h1>
                                            <p className="text-base sm:text-[19px] text-[##727272] font-normal">
                                                {item.description}
                                            </p>
                                        </div>
                                        <SwitchBtn />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className=" bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white p-4 rounded-full mt-10 font-bold text-sm"
                            onClick={() => {
                                Cookies.set("user", "true");
                                router.push("/");
                            }}
                        >
                            Save cookie preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePreference;
