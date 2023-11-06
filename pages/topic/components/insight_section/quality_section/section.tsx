import Loader from "components/UI/loader";
import { useContext, useEffect, useState } from "react";
import ErrorAlert from "components/UI/alerts/error_alert";
import { OrganisationDetailVMContext, formatLabel, getSelectedLabelIndex } from "pages/organisation/organisation_detail.vm";
// import { Bar } from "react-chartjs-2";
import Pagination from "components/UI/pagination_for_datasets";
import { BsChevronRight, BsFillStarFill } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import Label from "../label";
import { qualityInsights, QualityMetricVMContext } from "./quality_metric.vm";
import { MenuItemType } from "components/UI/drop_down";
import clsx from "clsx";
import InfoIcon from "components/UI/icons/info_icon";
import GraphSection from "pages/organisation/components/insights_section/quality_insights/graph_section";
import UpgradeAccountModal from "pages/organisation/components/upgrade_modal";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";

const ITEMS: MenuItemType[] = [{ label: "metadata" }, { label: "data_file" }];


const TABLE_HEADERS = ["Score", "Dataset"];

const QualityInsightsBody = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [percentToSlide, setPercentToSlide] = useState(0);
    const [selectedLabelState, setSelectedLabelState] = useState(ITEMS[1].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        QualityMetricVMContext
    );
    // const { permittedPermissions } = useContext(
    //     OrganisationDetailVMContext
    // );

    const handleChange = (label: string) => {
        setSelectedLabelState(label);
        onChange && onChange(getSelectedLabelIndex(label, qualityInsights));
    };

    const menuItems = ITEMS.map((item) => ({
        label: formatLabel(item.label),
        onClick: () => handleChange(item.label),
    }));
    const {
        qualityMetrics,
        fetchQualityMetrics,
        isFetchingQualityMetrics,
        error,
        selectedQualityInsights: selectedLabel,
        pageNumber,
        setPageNumber,
        datasetsCount
    } = useContext(QualityMetricVMContext);
    const { permittedPermissions } = useContext(TopicDetailVMContext)
    /**  Adding metaQuality same as overscore for metaFileQuality */
    const { dataFileQuality = {}, metaFileQuality = {}, totalMatches } = qualityMetrics || {};
    const items = selectedLabel == 0 ? dataFileQuality : metaFileQuality;

    useEffect(() => {
        setCurrentSlide(0)
    }, [items])
    useEffect(() => {
        fetchQualityMetrics && fetchQualityMetrics();
        if (selectedLabel == 0) {
            setPercentToSlide(20)
        }
        else {
            setPercentToSlide(28)
        }
    }, []);
    const handleDotClick = (index: any) => {
        setCurrentSlide(index);
    };
    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching Quality Metrics data. Please try again later"
            />
        );
    }
    if (isFetchingQualityMetrics) {
        return (
            <div className="h-[calc(40vh-var(--nav-height))] w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (!items["overallScore"]?.datasets.length) {
        return <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8 items-center justify-center">
            <div>
                <img src="/images/no_data_logo.svg" width={250} />
            </div>
            <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                Oops! No data available.
            </div>
        </div>
    }
    const totalPages = Math.ceil(totalMatches / datasetsCount)
    return (

        <div className="w-full"
            key={selectedLabel}
        >
            <div className="sm:flex flex-row hidden my-6 relative">
                <div className=" w-[350px] text-dtech-main-dark absolute z-20">Insights &gt; Dataset Quality &gt; {selectedLabel == 0 ? "Data file" : "Metadata"}</div>
                <div className=" flex justify-center items-center w-full text-[#727272] ">{selectedLabel == 0 ? "Data file quality scores out of 5" : "Metadata quality scores out of 5"}<BsFillStarFill className=" ml-3" /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
            </div>
            <div className="text-sm hidden sm:block text-dtech-dark-grey my-4">
                {selectedLabel == 0 ? (
                    <div className="my-8 text-sm text-dtech-dark-grey text-center mx-[270px]">
                        The data quality of datasets of this organisation has
                        been estimated based on user feedback (where available).
                        Datasets rated based on overall data quality and
                        individual dimensions are listed below.
                    </div>
                ) : (
                    <div className="my-8 text-sm text-dtech-dark-grey text-center mx-[180px]">
                        The metadata quality of all datasets of this
                        organisation has been algorithmically estimated based on
                        the &nbsp;
                        <a
                            href="https://data.europa.eu/mqa/methodology"
                            className=" text-dtech-main-dark underline "
                        >
                            EU Metadata Quality Assessment method
                        </a>
                        . Datasets rated based on overall metadata quality and
                        individual dimensions are listed below.
                    </div>
                )}
            </div>
            <div className="relative    ">
                <div className=" sm:hidden py-2">

                    <Tab.Group>
                        <Tab.List className={"flex flex-row items-center justify-center"}>
                            {menuItems.map((item, index) => {
                                return (
                                    <div key={index} className={clsx("w-full text-center focus:text-green-200",)}>
                                        <Tab onClick={item.onClick} className={clsx(selectedLabel != index && " !text-dtech-dark-teal border-b-2 border-b-dtech-dark-teal")} >
                                            {item.label}
                                        </Tab>
                                    </div>
                                )
                            })}
                        </Tab.List>
                    </Tab.Group>
                </div>
                <div>
                    <div
                        className="sm:overflow-none  overflow-x-hidden sm:py-10 "
                    >
                        <table className=" w-full h-full "
                            style={{ transform: `translateX(-${currentSlide * percentToSlide}%)` }}
                        >
                            <thead className=" ">
                                <tr className="">
                                    <th className="sm:w-[25%] p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 text-left  pb-4 min-w-[130px]">All Datasets ({totalMatches})</th>
                                    {/* {Object.keys(items)?.map((key, index) => {
                                return (
                                    <th key={index} className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">{splitAndCapitalize(key)}</th>
                                )})} */}
                                    {
                                        Object.keys(items).length == 5
                                            ?
                                            <><th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Overall
                                                <InfoIcon
                                                    tooltipClassName=" max- max-w-sm  !bg-dtech-dark-teal"
                                                    iconClasses="text-dtech-dark-teal ml-1"
                                                    title={`${items['overallScore'].tooltipTitle}`}
                                                /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Accuracy
                                                    <InfoIcon
                                                        tooltipClassName=" max- max-w-sm  !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['accuracy'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Clarity
                                                    <InfoIcon
                                                        tooltipClassName=" max- max-w-sm  !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['clarity'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Consistency
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['consistency'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Readiness
                                                    <InfoIcon
                                                        tooltipClassName=" max- max-w-sm  !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['readiness'].tooltipTitle}`}
                                                    /></th></>
                                            :
                                            <><th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Overall
                                                <InfoIcon
                                                    tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                    iconClasses="text-dtech-dark-teal ml-1"
                                                    title={`${items['overallScore'].tooltipTitle}`}
                                                /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Accessibility
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['accessibility'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Contextuality
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['contextuality'].tooltipTitle}`}
                                                    />
                                                </th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Findability
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['findability'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Interoperability
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['interoperability'].tooltipTitle}`}
                                                    /></th>
                                                <th className="sm:w-[15%] p-2 text-xs sm:text-sm text-center pb-4">Reusability
                                                    <InfoIcon
                                                        tooltipClassName=" max-w-2xl !bg-dtech-dark-teal"
                                                        iconClasses="text-dtech-dark-teal ml-1"
                                                        title={`${items['reusability'].tooltipTitle}`}
                                                    /></th></>
                                    }
                                </tr>
                            </thead>
                            {Object.keys(items).length == 5
                                ? <tbody className=" sm:border-t-[1px] border-black">
                                    {items["overallScore"]?.datasets?.map((item: any, index: any) => (
                                        <tr className=" border-b-[1px] h-14" key={index}>
                                            <td className="underline  p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm text-dtech-main-dark w-1/2 min-w-[120px] sm:w-[25%]"><a href={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/${item.id}`}>{item.title}</a></td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{typeof item.rating == "string" ? item.rating.replace("N/A", "-") : item.rating}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.accuracy ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.clarity ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.consistency ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.readiness ?? "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                : <tbody className=" sm:border-t-[1px] border-black">
                                    {items["overallScore"]?.datasets?.map((item: any, index: any) => (
                                        <tr className=" border-b-[1px] h-14" key={index}>
                                            <td className="underline  p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm text-dtech-main-dark w-1/2 min-w-[120px] sm:w-[25%]"><a href={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/${item.id}`}>{item.title}</a></td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.overall ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.accessibility ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.contextuality ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.findability ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.interoperability ?? "-"}</td>
                                            <td className="sm:w-[15%] p-2 text-xs sm:text-sm text-center">{item.factorWiseRating.reusability ?? "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            }

                        </table>
                    </div>

                </div>

                <div className=" flex flex-col pt-4">
                    <div className=" sm:hidden flex flex-row w-full items-center justify-center">
                        {[1, 2, 3].map((item, index) => (
                            <div
                                key={index}
                                className={` rounded-full w-3 h-3 m-1 ${index === currentSlide ? 'bg-dtech-dark-teal' : 'bg-[#D9D9D9]'}`}
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>


                    <div className=" flex flex-row items-center justify-center" >

                        <Pagination
                            currentPage={pageNumber}
                            setPageNumber={setPageNumber}
                            totalPages={totalPages}
                            key={selectedLabel}
                        />
                        {/* <button className=" flex flex-row items-center justify-center text-dtech-main-dark" onClick={() => setPageNumber(pageNumber + 1)}>
                        <div>Next</div> <BsChevronRight className="text-dtech-main-dark" />
                    </button> */}
                    </div>
                </div>
                {((selectedLabel == 0 && !permittedPermissions.includes("topicInsights.dataQuality.view")) || (selectedLabel == 1 && !permittedPermissions.includes("providerInsights.metadataQuality.view"))) && <div className=" absolute top-0 left-0 w-full h-full">
                    <div className="h-full"><UpgradeAccountModal /></div>
                </div>}
                <div className="hidden sm:flex justify-center mt-20">
                    <div className="w-[1000px] h-[10px] bg-[#D9D9D9] ">
                    </div>
                </div>
                <div>
                    <GraphSection items={items} />
                </div>

            </div>

        </div>
    );
};

export default QualityInsightsBody;
