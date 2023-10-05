import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";
// import SearchBar from "components/UI/search_bar_new";
import { useEffect, useState } from "react";
import NewNavbar from "components/layouts/default/components/newNavbar";
import NewSearchBar from "components/UI/white_label_search_bar";
import HelpComponent from "./components/help_component";
import Link from "next/link";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import CardComponent from "./components/card_component";
import HomeVM from "./home.vm";
import { AiOutlineArrowUp } from "react-icons/ai";
import CookieConsentForm from "./components/cookie_consent_form";
import Footer from "./components/footer";
import InfoIcon from "components/UI/icons/info_icon";
import HowItWorks from "./components/how_it_works";
import DiscoverByComponent from "./components/discover_by_components";
import Insights from "pages/home/components/insights";
import { Transition } from '@headlessui/react';
import clsx from "clsx";
import { NextPageContext } from "next";
import { getCookieFromServer } from "common/utils/cookie.util";
import Http from "common/http";
import { AUTH_TOKEN } from "common/constants/cookie.key";

const HomePage = ({ home }: { home: any }) => {
    const router = useRouter()
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [learnMore, setLearnMore] = useState<boolean>(false)
    const [searching, setSearching] = useState(false);

    const handleSearchFocus = () => {
        setSearching(true);
    };

    const handleSearchBlur = () => {
        setSearching(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const helpData = [{
        img: "/images/helping_data_users.svg",
        label: "DATA USERS",
        title: "Spend less of your time searching for datasets and more time using them.",
        summary: [
            "Discover datasets hidden deep in the web",
            "Search using simple terms and find relevant datasets",
            "Preview and download data files",
            "Get recommendations on datasets of interest",
            "Save datasets and share with others",
            "Get notifications on dataset updates",
            "Give feedback to data providers",
            "Gather data provider, topic and regional level insights",

        ]
    },
    {
        img: "/images/helping_data_providers.svg",
        label: "DATA PROVIDER",
        title: "Promote your datasets, get guidance on enhancing dataset quality, learn how users use your datasets, and improve your understanding of user needs.",
        summary: [
            "Make datasets more discoverable",
            "Promote datasets and increase userbase",
            "Gather insights on metadata and data file quality",
            "Gather insights on dataset usage and engagement",
            "Generate reports on dataset quality and usage insights",
        ]
    },
    {
        img: "/images/helping_data_enablers.svg",
        label: "DATA ENABLERS",
        title: "Improve your organisation’s data discovery capability, foster data-informed decision making, enhance data-driven strategy and drive growth.",
        summary: [
            "Help employees discover open, commercial and internal datasets from a single portal",
            "Manage internal dataset access permissions",
            "Gather insights on internal dataset quality to improve downstream efficiencies",
            "Gather insights on how employees and other stakeholders engage with internal datasets within and across departments",
        ]
    }]

    return (
        <div className={`flex flex-col relative`}>
            {<div className={searching ? " bg-black fixed opacity-50 top-0 left-0 right-0 bottom-0 sm:h-[3000px] h-full w-full z-40" : "hidden"}></div>}
            <img src="/images/home.png" className=" -z-10 absolute hidden sm:block w-full sm:h-[750px] xl:h-[800px] 2xl:h-[900px]" />
            <img src="/images/home_for_mobile.png" width={window.innerWidth} className=" -z-100 absolute sm:hidden block" style={{ height: "570px" }} />

            <div className="sm:mt-4  flex flex-row px-6 sm:px-[10%] py-3 bg-dtech-middle-grey sm:bg-white z-10">
                <div>
                    <div className=" bg-dtech-new-main-light text-white font-semibold sm:mt-0 px-4 py-1 sm:py-0 rounded-md">
                        BETA
                    </div>
                </div>
                <div className="text-xs sm:text-sm flex flex-col sm:flex-row ml-6 sm:mt-0 ">
                    <div className=" ">This is a new service.&nbsp;</div>
                    <div className="">
                        Click to&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://f7xcuekc9xt.typeform.com/to/ff4rGkXc"
                            className="underline text-dtech-main-dark "
                        >
                            Report a Bug
                        </a>
                        &nbsp;or
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://f7xcuekc9xt.typeform.com/to/Zpryygkm"
                            className="underline text-dtech-main-dark ml-1"
                        >
                            Suggest a Feature
                        </a>
                    </div>

                    {/* <div className=" text-xs sm:text-sm">Your <a className=" text-dtech-main-dark">feedback</a> will help us to improve it.</div> */}
                </div>
            </div>
            {/* <CookieConsentForm /> */}
            
            <NewNavbar showSearchBar={false} showLogo={false} handleSearchBlur={handleSearchBlur} handleSearchFocus={handleSearchFocus}  />
            <div className="flex flex-col mb-5 sm:mb-20 px-6 sm:px-[10%] py-12 sm:bg-transparent sm:bg-white">
                <div className="flex flex-row">
                    <div>

                        <div>
                            <img src="/images/dtechtive_without_tagline.png" width={300} />
                        </div>
                        <div className=" text-dtech-new-main-light text-white font-bold text-xl sm:text-2xl my-7 sm:w-3/4">
                            Discover the datasets other search engines cannot reach
                        </div>
                        <div className=" sm:font-bold sm:text-lg text-dtech-new-main-light font-semibold text-sm sm:text-[#333333] mb-7 sm:w-3/4">
                            We help you discover and obtain insights on open and commercial datasets using the power of AI.                        </div>
                    </div>
                    <div className=" hidden lg:block">
                        {/* <img src="/images/icons/txt.svg" className="mt-[48px] ml-[11.5%] z-10 absolute" /> */}
                        <div className=" bg-white w-[58px] mt-[136px] flex items-center justify-center ml-[19%] z-10 absolute">
                            {/* <img src="/images/icons/xls.svg" width={36} className=" " /> */}
                        </div>
                        <img src="/images/working_girl.svg" width={600}></img>
                    </div>
                    <div className="mt-32 sm:hidden block max-w-[8%] mr-8">
                        <img src="/images/1.svg" className=" ml-6" width={25}></img>
                        <div className="bg-white rounded-full flex w-6 left-10 justify-center items-center">
                            <img src="/images/2.svg" className=" max-w-none rounded-full " width={20}></img>
                        </div>
                        <img src="/images/3.svg" className="max-w-none ml-6" width={30}></img>
                        <img src="/images/4.svg" width={60} className=" -ml-2 max-w-none"></img>


                    </div>
                </div>
                <div className={searching?"z-50":"z-30"}>
                    <NewSearchBar
                        onChange={(type: string, option: any) => {
                            if (!option) return;
                            const searchType =
                                type === "dataset" ? "" : type;

                            router.push({
                                pathname: `/search/${searchType}`,
                                query: { q: option.value },
                            });
                        }}
                        className={` rounded-full !border-[#727272] border-[3px] !bg-white sm:h-10 h-8 sm:w-[70%] ${searching&&"!border-dtech-light-teal"}`}
                        onFocusSearchBar={handleSearchFocus}
                        onBlurSearchBar={handleSearchBlur}
                    />
                </div>
            </div>
            <Insights isMobile={isMobile} insightMetrics={home.metrics} />
            
            <DiscoverByComponent isMobile={isMobile} />
            <div className={clsx(`w-full py-3 sm:py-4 md:text-3xl text-[19px] overflow-hidden cursor-pointer text-dtech-new-main-light font-bold   ${learnMore ? "!h-full" :"sm:mb-28 mb-4"} }`)}
                style={!isMobile?{
                    background: "linear-gradient(92.55deg, #CEFFFE -36.67%, rgba(206, 176, 208, 0) 100.14%)"
                } : { background:" linear-gradient(180deg, rgba(181, 133, 183, 0.53) -33.18%, rgba(109, 205, 203, 0.22) 46.47%, rgba(235, 246, 246, 0) 98.63%);"}}>
                <div className=" flex flex-col items-center"
                    onClick={() => {
                        // Use setTimeout to trigger the transition after a few milliseconds
                        setTimeout(() => {
                            setLearnMore(!learnMore);
                        }, 10);
                    }}
                >

                    <div>{!learnMore ? "Learn more" : "See less"}</div>
                    <div className=" w-fit shadow-custom-1 bg-dtech-new-main-light rounded-full p-2 mt-2 hover:bg-[#D9EFFC] hover:rounded-full focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522] animate-bounce">{!learnMore ? <HiOutlineChevronDown size={40} className=" !text-white hover:!text-[#00437E] " /> : <HiOutlineChevronUp size={40} className="!text-white hover:!text-[#00437E] " />}</div>
                </div>
            </div>
            {/* <Transition
                show={learnMore}
                enter="transition-all duration-500"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-full"
                leave="transition-all duration-500"
                leaveFrom="opacity-100 max-h-full"
                leaveTo="opacity-0 max-h-0"
            > */}
            <div className={!learnMore ? "" : "h-full"}
                style={!isMobile?{
                    background: "linear-gradient(92.55deg, #CEFFFE -36.67%, rgba(206, 176, 208, 0) 100.14%)"
                }:{}}
            >
                <div className={!learnMore ? " hidden" : "block md:mb-20 mb-10"}>

                    <div className="flex flex-row px-6 sm:px-[10%] sm:items-center justify-between sm:justify-start">
                        <div className=" flex flex-row py-10">
                            <div className="font-bold sm:text-xl text-md md:text-3xl text-dtech-main-dark md:text-[#333333]">Helping Data Users & Providers</div>
                        </div>
                    </div>
                    {helpData.map((item, index) => {
                        return (
                            item.label!=='DATA ENABLERS'&&<HelpComponent key={index} item={item} index={index} />
                        )
                    })}
                </div>
                {(isMobile||(!isMobile&&learnMore)) && <HowItWorks isMobile={isMobile} learnMore={learnMore} />}
            </div>
            {/* </Transition> */}
            <Footer />
        </div>
    )

};

HomePage.getInitialProps = async ({
    query,
    req,
}: NextPageContext) => {
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
        }
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
    id:string
}
