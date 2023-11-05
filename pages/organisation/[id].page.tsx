import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState, useRef } from "react";
import OrganisationHead from "./components/organisation_head";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import { getCookieFromServer } from "common/utils/cookie.util";
// import OrganisationTabHeaders from "./components/organisation_tabs";
import { useRouter } from "next/router";
// import Datasets from "./components/datasets/";
// import Insights from "./components/insights_section";
// import Report from "./components/report_section";
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
// import RelatedProviders from "./components/related_providers";
import Image from "next/image";
import customImageLoader from "components/image/customImage";
import dynamic from "next/dynamic";
import { fetchPermissions } from "common/util";
const Datasets = dynamic(() => import("./components/datasets"), {
    ssr: false,
});
const Report = dynamic(() => import("./components/report_section"), {
    ssr: false,
});
const Insights = dynamic(() => import("./components/insights_section"), {
    ssr: false,
});
const OrganisationTabHeaders = dynamic(() => import("./components/organisation_tabs"), {
    ssr: false,
});

enum tabIndex {
    datasets,
    insights,
    report,
}

const OrganisationDetailPage = ({
    organisation,
}: {
    organisation: Organisation | undefined,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [topicImage, setTopicImage] = useState("")
    const [logoImage, setLogoImage] = useState("")
    const [isReportGenerated, setIsReportGenerated] = useState<boolean>(false)
    const [permissions, setPermissions] = useState([])
    const { asPath } = useRouter();
    const router = useRouter()
    const vm: any = OrganisationDetailVM(organisation, asPath.split("/")[2]);
    const user = useSelector((state: RootState) => state.auth.user);
    const imageRef = useRef<HTMLDivElement>(null);
    const translationValue1Ref = useRef<HTMLDivElement>(null)
    const translationValue2Ref = useRef<HTMLDivElement>(null)
    const fetchImages = async () => {
        const logoUrl = await Http.get(`/v1/data_sources/provider/topic_image/${organisation?.topics[0]}/${organisation?.uuid}`, {
            baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
        })

        return logoUrl
    }
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
        const upperLimit1 = -60;
        const upperLimit2 = -270;
        if (translationValue1Ref.current) {
            translationValue1Ref.current.style.marginTop = `${Math.max(-window.scrollY * 0.5, upperLimit1)}px` || '';
        }
        if (translationValue2Ref.current) {
            translationValue2Ref.current.style.marginTop = `${Math.max(-window.scrollY * 0.3, upperLimit2 * 1.2) + (isMobile ? 320 : 200)}px` || '';
        }
        setHeight(window.scrollY)
    };

    useEffect(() => {
        if (imageRef.current) {
            const desiredHeight = `${250}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
        const loadImage = async () => {
            const imageData = await fetchImages();
            setTopicImage(imageData.topic_image)
            setLogoImage(imageData.logo_image)
        };
        const loadPermissions = async () => {
            const fetchedPermissions = await fetchPermissions(user ? user.id : 0, router.pathname.replace("/[id]", ""))
            setPermissions(fetchedPermissions
                .filter((permission: any) => permission.permitted)
                .map((permission: any) => permission.permission_name))
        }
        loadImage();
        loadPermissions()
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
            <OrganisationDetailVMContext.Provider value={{ ...vm, permittedPermissions: permissions }} >
                <div className=" bg-[#EBEBEB] ">
                    <div className=" bg-white h-16 sm:h-10 -mt-20 sm:mt-0">

                    </div>
                    <div
                        className="bg-black h-[414px] absolute right-0 z-0 w-full overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
                        style={{ backgroundImage: `url(${topicImage})` }}
                    ></div>
                    <div className="px-4 relative">
                        <div
                            className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center ">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Data Provider
                            </p>
                            <span></span>
                            <div ref={imageRef} className=" rounded-full min-h-[100px] min-w-[100px]">
                                <a href={`${organisation.url}`} target="_blank" rel="noreferrer" className="h-full w-full overflow-hidden bg-white bg-opacity-80 rounded-full relative flex items-center justify-center">
                                    {logoImage && <Image
                                        // data-tip={"Click to open website"}
                                        src={logoImage}
                                        loader={customImageLoader}
                                        alt="ORG"
                                        // objectFit="cover"
                                        layout="fill"
                                        // height={100}
                                        // width={100}
                                        className=" !w-[200%] !h-full !p-6 object-contain"
                                    />}
                                </a>
                            </div>
                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-dtech-light-teal xl:bg-white bg-opacity-80">
                            <a href={`${organisation.url}`} target="_blank" rel="noreferrer" className=" rounded-full overflow-hidden">
                                {logoImage && <Image
                                    // data-tip={"Click to open website"}
                                    src={logoImage}
                                    loader={customImageLoader}
                                    alt="ORG"
                                    // layout="fill"
                                    width={50}
                                    height={50}
                                    className=" object-contain !p-1"
                                />}
                            </a>
                            <p className="text-center text-lg font-bold mx-4 text-white">
                                Data Provider
                            </p>
                        </div>
                        <div
                            ref={translationValue1Ref}
                        >
                            <div
                                className="w-full h-fit py-4 sm:mt-24 mt-32 bg-white rounded-lg">
                                <OrganisationHead />
                            </div>

                            <div className="flex border-t sm:mt-[600px]  flex-col bg-[#EBEBEB]"
                                ref={translationValue2Ref}
                            >
                                {!loading && (
                                    <Tab.Group defaultIndex={selectedIndex}>
                                        <OrganisationTabHeaders />
                                        <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                            <TabPanel className="!bg-white">
                                                <Datasets />
                                            </TabPanel>
                                            <TabPanel className="!bg-white">
                                                <Insights />
                                            </TabPanel>
                                            <TabPanel className={clsx("!bg-white  ", isReportGenerated && "!bg-transparent sm:!bg-white")}>
                                                <Report setIsReportGenerated={setIsReportGenerated} isReportGenerated={isReportGenerated} />
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
        // const requestProviders = await Http.get(`/v1/data_sources/providers_for_homepage?offset=0&count=20`, {
        //     extraHeaders: authToken
        //         ? { Authorization: `Bearer ${authToken}` }
        //         : {},
        // });
        const organisation = Organisation.fromJson(res[0]);

        return {
            organisation,
            // requestProviders
        };
    } catch (error) {
        return { organisation: undefined };
    }
};

export default OrganisationDetailPage;
