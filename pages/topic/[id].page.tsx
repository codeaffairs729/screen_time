import DefaultLayout from "components/layouts/default";
import TopicHead from "./components/topic_head";
import TopicDetailVM, { TopicDetailVMContext } from "./topic_detail.vm";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getCookieFromServer } from "common/utils/cookie.util";
import Http from "common/http";
import Topic from "models/topic.model";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import Image from "next/image";
import customImageLoader from "components/image/customImage";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import TopicTabHeaders from "./components/topic_tabs";
import { useIsMobile } from "common/hooks";
import DatasetSection from "./components/dataset_section";
import InsightSection from "./components/insight_section";
import ReportSection from "./components/report_section";

enum tabIndex {
    datasets,
    insights,
    report,
}
const TopicDetail = ({ topic }: { topic: any }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { asPath } = useRouter();
    const [isReportGenerated, setIsReportGenerated] = useState<boolean>(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const translationValue1Ref = useRef<HTMLDivElement>(null);
    const translationValue2Ref = useRef<HTMLDivElement>(null);
    const vm: any = TopicDetailVM(topic, Number(asPath.split("/")[2]));
    const { isMobile } = useIsMobile();
    // console.log({topic})
    // const { imgUrl } = topic;

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const upperLimit1 = -60;
        const upperLimit2 = -270;
        if (translationValue1Ref.current) {
            translationValue1Ref.current.style.marginTop =
                `${Math.max(-window.scrollY * 0.5, upperLimit1)}px` || "";
        }
        if (translationValue2Ref.current) {
            translationValue2Ref.current.style.marginTop =
                `${
                    Math.max(-window.scrollY * 0.3, upperLimit2 * 1.2) +
                    (isMobile ? 320 : 200)
                }px` || "";
        }
        setHeight(window.scrollY);
    };

    const setHeight = (size: any) => {
        if (imageRef.current) {
            const desiredHeight = `${250 - size}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
    };
    return (
        <DefaultLayout wrapperClass="">
            <TopicDetailVMContext.Provider value={vm}>
                <div className=" bg-[#EBEBEB] ">
                    <div className=" bg-white h-16 sm:h-10 -mt-20 sm:mt-0"></div>
                    <div
                        className="bg-black h-[414px] absolute right-0 z-0 w-full overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
                        // style={{ backgroundImage: `url(${imgUrl})` }}
                    ></div>
                    <div className="px-4 relative">
                        <div className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center ">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Topic
                            </p>
                            <span></span>
                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-dtech-light-teal xl:bg-white bg-opacity-80">
                            <p className="text-center text-lg font-bold mx-4 text-white">
                                Topic
                            </p>
                        </div>
                        <div ref={translationValue1Ref}>
                            <div className="w-full h-fit py-4 sm:mt-24 mt-32 bg-white rounded-lg">
                                <TopicHead />
                            </div>

                            <div
                                className="flex border-t sm:mt-[600px]  flex-col bg-[#EBEBEB]"
                                ref={translationValue2Ref}
                            >
                                {!loading && (
                                    <Tab.Group defaultIndex={selectedIndex}>
                                        <TopicTabHeaders />
                                        <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                            <TabPanel className="!bg-white">
                                                <DatasetSection />
                                            </TabPanel>
                                            <TabPanel className="!bg-white">
                                                <InsightSection />
                                            </TabPanel>
                                            <TabPanel
                                                className={clsx(
                                                    "!bg-white  ",
                                                    isReportGenerated &&
                                                        "!bg-transparent sm:!bg-white"
                                                )}
                                            >
                                                <ReportSection
                                                    setIsReportGenerated={
                                                        setIsReportGenerated
                                                    }
                                                    isReportGenerated={
                                                        isReportGenerated
                                                    }
                                                />
                                            </TabPanel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                )}
                            </div>
                            <div className=" sm:h-8">
                                {/* <RelatedProviders isMobile={isMobile} recommendations={convertToJson(requestProviders)} isLoading={vm.isLoading}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </TopicDetailVMContext.Provider>
        </DefaultLayout>
    );
};

TopicDetail.getInitialProps = async ({ query, req }: NextPageContext) => {
    try {
        const topicId = query["id"];
        let authToken;
        if (req?.headers.cookie) {
            authToken = getCookieFromServer(AUTH_TOKEN, req);
        }
        const res = await Http.get(`/v1/topics/by-topic-id/${topicId}`, {
            // extraHeaders: authToken
            //     ? { Authorization: `Bearer ${authToken}` }
            //     : {},
        });
        const topic = Topic.fromJson(res[0]);

        return {
            topic,
        };
    } catch (error) {
        return { topic: undefined };
    }
};

export default TopicDetail;
