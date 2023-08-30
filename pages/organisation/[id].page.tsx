import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState } from "react";
import OrganisationHead from "./components/organisation_head";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import { getCookieFromServer } from "common/utils/cookie.util";
import OrganisationTabHeaders from "./components/organisation_tabs";
import { useRouter } from "next/router";
import Datasets from "./components/datasets/";
import Insights from "./components/insights_section";
import Report from "./components/report_section";
import { NextPageContext } from "next";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import Http from "common/http";
import Organisation from "models/organisation.model";
import OrganisationDetailVM, {
    OrganisationDetailVMContext,
} from "./organisation_detail.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";
import clsx from "clsx";
import RelatedProviders from "./components/related_providers";

const ORGANIZATION_ADMIN = "Organisation Admin";
const ORGANIZATION_MEMBER = "Organisation Member";

enum tabIndex {
    datasets,
    insights,
    report,
}

const OrganisationDetailPage = ({
    organisation, requestProviders
}: {
    organisation: Organisation | undefined, requestProviders: any
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [isReportGenerated, setIsReportGenerated] = useState<boolean>(false)
    const [scrollPosition, setScrollPosition] = useState(0);

    const { asPath } = useRouter();
    const vm: any = OrganisationDetailVM(organisation, asPath.split("/")[2]);
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };
    const upperLimit = 128;
    const translationValue = Math.min(scrollPosition * 0.5, upperLimit);
    if (!organisation) {
        return (
            <DefaultLayout>
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching organisation details. Please try again later."
                />
            </DefaultLayout>
        );
    }
    return (
        <DefaultLayout>
            <OrganisationDetailVMContext.Provider value={vm}>
                <div className=" ">
                    <div
                        className="bg-black  h-[414px] absolute -z-10 w-full">
                        <img src={organisation.topic_image} className=" w-full" />
                    </div>
                    <div className="px-4 relative">
                        <div
                            className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Data Provider
                            </p>
                            <span></span>
                            <a href={`${organisation.url}`} target="_blank" rel="noreferrer" className=" h-[100px] w-[100px] mt-4 bg-[#0E9A8E] bg-opacity-60 rounded-full relative flex items-center justify-center">
                                <img
                                    // data-tip={"Click to open website"}
                                    src={organisation.imgUrl}
                                    alt=""
                                    className="h-[70px] w-[70px] absolute z-20 rounded-full"
                                />
                            </a>
                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-[#0E9A8E] bg-opacity-60">
                            <a href={`${organisation.url}`} target="_blank" rel="noreferrer">
                                <img
                                    // data-tip={"Click to open website"}
                                    src={organisation.imgUrl}
                                    alt=""
                                    className="h-[70px] w-[70px]  rounded-full"
                                />
                            </a>
                            <p className="text-center text-lg font-bold mx-4 text-white">
                                Data Provider
                            </p>
                        </div>
                        <div
                            style={{ transform: `translateY(-${translationValue}px)` }}
                            className="w-full h-fit py-4 sm:mt-24 mt-32 bg-white rounded-lg">
                            <OrganisationHead />
                        </div>

                        <div className="flex border-t px-4 sm:-mt-28 -mt-28 shadow-container flex-col bg-[#EBEBEB]">
                            {!loading && (
                                <Tab.Group defaultIndex={selectedIndex}>
                                    <OrganisationTabHeaders
                                        selectedIndex={selectedIndex}
                                        user={User.getRole(user)?.name}
                                    />
                                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                        <TabPanel className="!bg-white">
                                            <Datasets />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            <Insights />
                                        </TabPanel>
                                        <TabPanel className={clsx("!bg-white  ", isReportGenerated && "!bg-transparent sm:!bg-white")}>
                                            {(User.getRole(user)?.name ===
                                            ORGANIZATION_ADMIN ||
                                            User.getRole(user)?.name ===
                                            ORGANIZATION_MEMBER) && (
                                            <Report setIsReportGenerated={setIsReportGenerated} isReportGenerated={isReportGenerated} />
                                            )} 
                                        </TabPanel>
                                    </Tab.Panels>
                                </Tab.Group>
                            )}
                        </div>
                        <div className=" hidden">
                            <RelatedProviders isMobile={isMobile} recommendations={convertToJson(requestProviders)} />
                        </div>
                    </div>
                </div>

            </OrganisationDetailVMContext.Provider>

        </DefaultLayout>
    );
};
const convertToJson = (input_data: any) => {
    const output_data = input_data.map((item: any) => ({
        title: item.name,
        subTitle: null,
        imageUrl: item.logo_url || null,
        recommended: false,
        id: item.uuid
    }));
    return output_data
}
OrganisationDetailPage.getInitialProps = async ({
    query,
    req,
}: NextPageContext) => {
    try {
        const orgId = query["id"];
        let authToken;
        if (req?.headers.cookie) {
            authToken = getCookieFromServer(AUTH_TOKEN, req);
        }
        const res = await Http.get(`/v1/data_sources/provider/${orgId}`, {
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });
        const requestProviders = await Http.get(`/v1/data_sources/providers_for_homepage?offset=0&count=20`, {
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });
        const organisation = Organisation.fromJson(res[0]);

        return { organisation, requestProviders };
    } catch (error) {
        return { organisation: undefined };
    }
};

export default OrganisationDetailPage;
