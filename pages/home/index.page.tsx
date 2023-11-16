import { useRouter } from "next/router";
// import SearchBar from "components/UI/search_bar_new";
import { useContext, useEffect, useState } from "react";
import NewNavbar from "components/layouts/default/components/newNavbar";
import NewSearchBar from "components/UI/white_label_search_bar";
import Footer from "./components/footer";
import DiscoverByComponent from "./components/discover_by_components";
import Insights from "pages/home/components/insights";
import { NextPageContext } from "next";
import { getCookieFromServer } from "common/utils/cookie.util";
import Http from "common/http";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import LearnMore from "./components/learn_more";
import { Dialog } from "@headlessui/react";
import PopupSubscription from "components/UI/popup_subscription";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import { AiOutlineClose } from "react-icons/ai";
import { useIsMobile } from "common/hooks";
import Cookies from "js-cookie";

const HomePage = ({ home }: { home: any }) => {
    const router = useRouter();
    const { isMobile } = useIsMobile();
    const [searching, setSearching] = useState(false);
    const [betaLabel, setBetaLabel] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const { markAllRead, notifications, isLoading, fetchNotifications } =
        useContext(NotificationsVMContext);

    useEffect(()=>{
        if(!["/login", "/signup"].includes(router.pathname)){
            Cookies.remove('userData');
        }
    },[])

    const handleSearchFocus = () => {
        setSearching(true);
    };

    const handleSearchBlur = () => {
        setSearching(false);
    };





    return (
        <div className={`flex flex-col relative min-w-[22rem]`}>
            {
                <div
                    className={
                        searching
                            ? " bg-black fixed opacity-50 top-0 left-0 right-0 bottom-0 sm:h-[3000px] h-full w-full z-40"
                            : "hidden"
                    }
                ></div>
            }
            <img
                src="/images/home.png"
                className=" -z-10 absolute hidden sm:block w-full sm:h-[750px] xl:h-[800px] 2xl:h-[900px]"
            />
            <img
                src="/images/home_for_mobile.png"
                // width={window.innerWidth}
                className=" -z-100 absolute sm:hidden block w-full "
                style={{ height: "570px",}}
            />

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
                                    className="underline text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black  ml-1"
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
            {/* <CookieConsentForm /> */}

            <NewNavbar
                showSearchBar={false}
                showLogo={false}
                searching={searching}
                handleSearchBlur={handleSearchBlur}
                handleSearchFocus={handleSearchFocus}
            />
            <div className="flex flex-col mb-5 sm:mb-20 px-6 sm:px-[10%] py-12 sm:bg-transparent sm:bg-white">
                <div className="flex flex-row">
                    <div>
                        <div>
                            <img
                                src="/images/dtechtive_without_tagline.png"
                                width={300}
                            />
                        </div>
                        <div className=" text-dtech-new-main-light font-[700] text-xl sm:text-[26px] my-7">
                            Discover the datasets other search engines cannot
                            reach
                        </div>
                        <div className=" sm:font-[400] sm:text-[16px] text-dtech-new-main-light font-semibold text-sm sm:text-[#333333] mb-7">
                            We help you discover and obtain insights on open and
                            commercial datasets using the power of AI.
                        </div>
                    </div>
                    <div className=" hidden lg:block">
                        {/* <img src="/images/icons/txt.svg" className="mt-[48px] ml-[11.5%] z-10 absolute" /> */}
                        <div className=" bg-white w-[58px] mt-[136px] flex items-center justify-center ml-[19%] z-10 absolute">
                            {/* <img src="/images/icons/xls.svg" width={36} className=" " /> */}
                        </div>
                        <img src="/images/working_girl.svg" width={600}></img>
                    </div>
                    <div className="mt-32 sm:hidden block max-w-[8%] mr-8">
                        <img
                            src="/images/1.svg"
                            className=" ml-6"
                            width={25}
                        ></img>
                        <div className="bg-white rounded-full flex w-6 left-10 justify-center items-center">
                            <img
                                src="/images/2.svg"
                                className=" max-w-none rounded-full "
                                width={20}
                            ></img>
                        </div>
                        <img
                            src="/images/3.svg"
                            className="max-w-none ml-6"
                            width={30}
                        ></img>
                        <img
                            src="/images/4.svg"
                            width={60}
                            className=" -ml-2 max-w-none"
                        ></img>
                    </div>
                </div>
                <div className={searching ? "z-50" : "z-15"}>
                    <NewSearchBar
                        onChange={(type: string, option: any) => {
                            if (!option) return;
                            const searchType = type === "dataset" ? "" : type;

                            router.push({
                                pathname: `/search/${searchType}`,
                                query: { q: option.value },
                            });
                        }}
                        className={` rounded-full !border-[#727272] border-[3px] !bg-white sm:h-10 h-8 sm:w-[70%]  ${
                            searching && "!border-dtech-light-teal"
                        }`}
                        onFocusSearchBar={handleSearchFocus}
                        onBlurSearchBar={handleSearchBlur}
                    />
                </div>
            </div>
            <DiscoverByComponent isMobile={isMobile} />
            <LearnMore isMobile={isMobile} />
            <Footer />
        </div>
    );
};

HomePage.getInitialProps = async ({ query, req }: NextPageContext) => {
    try {
        let authToken;
        if (req?.headers.cookie) {
            authToken = getCookieFromServer(AUTH_TOKEN, req);
        }
        const requestMetrics = Http.get(`/v1/metrics/get_metrics_for_home`, {
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });

        const [metrics] = await Promise.all([requestMetrics]);
        const home = {
            metrics: metrics,
        };
        // const home = HomePage.fromJson(res[0]);

        return { home };
    } catch (error) {
        return { home: undefined };
    }
};

export default HomePage;
export interface RecommendationItem {
    title: string;
    subTitle: string;
    imageUrl: string;
    recommended: boolean;
    id: string;
}
