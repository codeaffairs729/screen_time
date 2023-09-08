import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState, useRef } from "react";
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
    const imageRef = useRef<HTMLDivElement>(null)
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
        setScrollPosition(-window.scrollY);
        setHeight(window.scrollY)
    };
    const upperLimit1 = -60;
    const upperLimit2 = -270;
    const translationValue1 = Math.max(scrollPosition * 0.5, upperLimit1);
    const translationValue2 = Math.max(scrollPosition * 0.3, upperLimit2 * 1.2);
    useEffect(() => {
        if (imageRef.current) {
            const desiredHeight = `${250}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
    }, [])
    const setHeight = (size: any) => {
        if (imageRef.current) {
            const desiredHeight = `${250 - size}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
    };

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
                <div className=" bg-[#EBEBEB] ">
                    <div className=" bg-white h-16 sm:h-10 -mt-20 sm:mt-0">

                    </div>
                    <div
                        className="bg-black  h-[414px] overflow-hidden absolute right-0 z-0 w-full">
                        <img src={`data:image/jpeg;base64,${organisation.topic_image}`} className=" " />
                    </div>
                    <div className="px-4 relative">
                        <div
                            className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center ">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Data Provider
                            </p>
                            <span></span>
                            <div ref={imageRef} className=" rounded-full min-h-[100px] min-w-[100px]">
                                <a href={`${organisation.url}`} target="_blank" rel="noreferrer" className="h-full w-full overflow-hidden bg-white bg-opacity-80 rounded-full relative flex items-center justify-center">
                                    <img
                                        // data-tip={"Click to open website"}
                                        src={organisation.imgUrl}
                                        alt=""
                                        className={clsx(`h-[70%] w-[70%] absolute z-10 `)}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-white bg-opacity-80">
                            <a href={`${organisation.url}`} target="_blank" rel="noreferrer" className=" rounded-full overflow-hidden">
                                <img
                                    // data-tip={"Click to open website"}
                                    src={organisation.imgUrl}
                                    alt=""
                                    className="h-[80px] w-[80px] p-2 "
                                />
                            </a>
                            <p className="text-center text-lg font-bold mx-4 text-white">
                                Data Provider
                            </p>
                        </div>
                        <div
                            style={{ marginTop: `${translationValue1}px` }}
                        >
                            <div
                                className="w-full h-fit py-4 sm:mt-24 mt-32 bg-white rounded-lg">
                                <OrganisationHead />
                            </div>

                            <div className="flex border-t sm:mt-[600px]  flex-col bg-[#EBEBEB]"
                                style={{ marginTop: `${translationValue2 + (isMobile ? 320 : 200)}px` }}
                            >
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
                            <div className=" sm:h-8">
                                {/* <RelatedProviders isMobile={isMobile} recommendations={convertToJson(requestProviders)} /> */}
                            </div>
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
