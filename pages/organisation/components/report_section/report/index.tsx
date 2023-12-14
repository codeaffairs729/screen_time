import React, {
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import Head from "./head";
import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { DateTime } from "luxon";
import Loader from "components/UI/loader";
import { SearchTermType } from "../../insights_section/search_term_section/search_term.vm";
import { getAge } from "pages/workspace/notification.vm";
import { ReportVMContext } from "../report.vm";
import { HiPencil } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PreviewReport from "./components/new_preview";
import ReportData from "./reportData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DownloadReport = dynamic(() => import("./downloadReport"), {
    ssr: false,
});
const RichTextEditor = dynamic(() => import("./components/editor"), {
    ssr: false,
});

const names = [
    "Fetching Dataset Quality",
    "Fetching Search terms used",
    "Fetching Download metrics",
    "Fetching Use cases",
];

const Report = ({
    isReportGenerated,
    setIsReportGenerated,
}: {
    isReportGenerated: boolean;
    setIsReportGenerated: Function;
}) => {
    const [edit, setEdit] = useState(false);
    const { loading } = useContext(ReportVMContext);

    const [index, setIndex] = useState(0);
    // useEffect(() => {
    //     const timer = () => {
    //         setIndex((prevIndex) => {
    //             if (prevIndex === names.length - 1) {
    //                 return 0;
    //             }
    //             return prevIndex + 1;
    //         });
    //     };
    //     const intervalId = setInterval(timer, 4000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
        vertical: true,
    };

    return (
        <div className="w-full relative">
            {loading && (
                <div className="flex absolute mt-12 w-full h-[656px] bg-white z-20 text-[19px]">
                    <div className="ml-auto mr-auto my-auto">
                        <div className="flex flex-col justify-center items-center">
                            {/* <p className="text-dtech-light-grey3 mr-[2px]">
                                Fetching
                            </p> */}
                            <div>
                                <h1 className="text-black">
                                    Generating cover page
                                </h1>
                            </div>
                            <Slider {...settings} className="text-center">
                                {names?.map((item: any, index: number) => {
                                    return (
                                        <p key={index} className=" text-dtech-light-grey3 animate-pulse transition-all w-fit">
                                             <Loader className={'text-blue-900 mr-2'}/>
                                            {item}
                                        </p>
                                    );
                                })}
                            </Slider>
                            {/* </div> */}
                            {/* <div className="flex items-end pb-[6px] pr-[4px] justify-end space-x-2 animate-pulse">
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            </div> */}
                        </div>
                        {/* <p className="text-dtech-light-grey3">Finalising</p> */}
                    </div>
                </div>
            )}
            <ReportData />
            <div className={"hidden sm:block"}>
                <Tab.Group>
                    <div className="">
                        <Tab.List>
                            <Head edit={edit} setEdit={setEdit} />
                        </Tab.List>
                    </div>
                    <div className=" sm:hidden ">
                        <Tab.List className={"flex w-full justify-between"}>
                            <Head edit={edit} setEdit={setEdit} />
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <PreviewReport
                                loading={loading}
                                isReportGenerated={isReportGenerated}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <RichTextEditor />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            <div className=" sm:hidden">
                <Tab.Group>
                    <div className=" ">
                        <div className="flex justify-between items-center px-3 w-full">
                            <button
                                className=" cursor-pointer"
                                onClick={() => setIsReportGenerated(false)}
                            >
                                <AiOutlineArrowLeft />
                            </button>
                            <button onClick={() => setEdit(!edit)}>
                                {edit ? (
                                    <div>Preview</div>
                                ) : (
                                    <div className=" flex flex-row items-center">
                                        <HiPencil className="mr-1" />
                                        Edit
                                    </div>
                                )}
                            </button>
                        </div>

                        {!edit ? (
                            <PreviewReport
                                loading={loading}
                                isReportGenerated={isReportGenerated}
                            />
                        ) : (
                            <RichTextEditor />
                        )}
                    </div>
                </Tab.Group>
            </div>
            {isReportGenerated && !edit && (
                <div className=" mt-4">
                    <DownloadReport />
                </div>
            )}
        </div>
    );
};

export default Report;

const getTableDataForSearchTerms = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: any) => {
        const date: any = DateTime.fromISO(terms["lastUsed"]);
        return [
            terms["title"].replace(/\+/g, " "),
            terms["count"],
            getAge(date.ts),
        ];
    });
