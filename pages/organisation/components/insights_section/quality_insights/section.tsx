import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";
import Loader from "components/UI/loader";
import { useContext, useEffect } from "react";
import ErrorAlert from "components/UI/alerts/error_alert";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
// import { Bar } from "react-chartjs-2";
import Pagination from "components/UI/pagination_for_datasets";
import { useState } from "react";
import { roundRatings } from "components/UI/star_rating";
import { BsChevronRight, BsFillStarFill } from "react-icons/bs";
import GraphSection from "./graph_section";
import { Tab } from "@headlessui/react";
import {
    formatLabel,
    getSelectedLabelIndex,
} from "pages/organisation/organisation_detail.vm";
import Label from "../label";
import { qualityInsights, QualityMetricVMContext } from "./quality_metric.vm";
import Dropdown, { MenuItemType } from "components/UI/drop_down";
import clsx from "clsx";
import InfoIcon from "components/UI/icons/info_icon";

const ITEMS: MenuItemType[] = [{ label: "metadata" }, { label: "data_file" }];


const TABLE_HEADERS = ["Score", "Dataset"];

const DisplayDataset = ({ title, description }: any) => (
    <div>
        <span className="text-sm font-medium text-dtech-dark-grey limit-line break-words">
            {title}
        </span>
        <span className="text-sm text-dtech-dark-grey limit-line break-words">
            {description}
        </span>
    </div>
);
const QualityInsightsBody = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [percentToSlide, setPercentToSlide] = useState(0);
    const [selectedLabelState, setSelectedLabelState] = useState(ITEMS[1].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        QualityMetricVMContext
    );
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

    /**  Adding metaQuality same as overscore for metaFileQuality */
    const { dataFileQuality = {}, metaFileQuality = {}, totalMatches } = qualityMetrics || {};
    const items = selectedLabel == 0 ? dataFileQuality : metaFileQuality;
    
    useEffect(() => {
        setCurrentSlide(0)
    },[items])
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
    const totalPages = Math.ceil(totalMatches / datasetsCount)
    return (
        <div className="w-full"
            key={selectedLabel}
        >
            <div className="sm:flex flex-row hidden my-6 relative">
                <div className=" w-[350px] text-dtech-main-dark absolute z-20">Insights &gt; Dataset Quality &gt; {selectedLabel == 0 ? "Data file" :"Metadata" }</div>
                <div className=" flex justify-center items-center w-full text-[#727272] ">Rating out of 5 <BsFillStarFill className=" ml-3"/><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
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
            <div className=" sm:hidden py-2">

                <Tab.Group>
                    <Tab.List className={"flex flex-row items-center justify-center"}>
                        {menuItems.map((item, index) => {
                            return (
                                <div key={index} className={clsx("w-full text-center focus:text-green-200", )}>
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
                    className="sm:overflow-none  overflow-x-hidden sm:py-10 sm:-mt-10"
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
            <div className="hidden sm:flex justify-center mt-20">
                <div className="w-[1000px] h-[10px] bg-[#D9D9D9] ">
                </div>
            </div>
            <div>
                <GraphSection items={items} />
            </div>

        </div>
    );
};

// const AccordianLabel = ({
//     label,
//     ratings,
//     tooltipTitle,
//     selectedLabel,
//     orgQuality,
// }: {
//     label: string;
//     ratings: any;
//     tooltipTitle: string;
//     selectedLabel: number;
//     orgQuality: number;
// }) => {
//     return (
//         <MetaRating
//             label={label}
//             dataQuality={(selectedLabel == 1 && label == "OverallScore") ? orgQuality : getAvg(ratings, label)}
//             className="!flex-row ml-0"
//             labelClass="!text-lg text-dtech-dark-grey"
//             starClassName="!w-6 !h-6 text-[#5F5F63]"
//             title={tooltipTitle}
//         />
//     );
// };

// const getAvg = (ratings: any, label: any) => {
//     let ratingSum;
//     let count;
//     if (ratings.length == 11) {
//         const ratingData = ratings.map(
//             (rate: any, index: number) => {
//                 return rate[index / 2]
//             }
//         );
//         count = ratingData.reduce(
//             (accumulator: any, curValue: any) => accumulator + curValue,
//             0
//         );

//         ratingSum = ratings.reduce((accumulator: any, curValue: any) => {
//             const rating = parseFloat(Object.keys(curValue)[0]);
//             const value = curValue[rating];
//             return accumulator + rating * value;
//         }, 0);
//     } else {
//         const ratingData = ratings.map(
//             (rate: any, index: number) => rate[index + 1]
//         );
//         count = ratingData.reduce(
//             (accumulator: any, curValue: any) => accumulator + curValue,
//             0
//         );

//         ratingSum = ratingData.reduce(
//             (accumulator: any, curValue: any, curIndex: any) =>
//                 accumulator + curValue * (curIndex + 1),
//             0
//         );
//     }
//     return ratingSum / count;
// };

// const getLabel = (title: string) => {
//     return `${title[0].toUpperCase()}${title.slice(1)}`;
// };

// const getTableData = (key: string, datasets: any) => {
//     if (key === "overallScore") return datasets?.map((dataset: any, index: number) => {
//         const datasetCell = (
//             <DisplayDataset
//                 id={dataset?.id}
//                 key={dataset?.id}
//                 title={dataset?.title ? dataset?.title : "NA"}
//                 description={dataset?.description ? dataset?.description : "NA"}
//             />
//         );

//         return [roundRatings(dataset?.rating), datasetCell];
//     });
//     else {
//         return datasets?.map((dataset: any, index: number) => {
//             let rating;
//             if (dataset.factorWiseRating == 0) {
//                 rating = dataset.rating
//             }
//             else {
//                 rating = dataset.factorWiseRating[key]
//             }

//             const datasetCell = (
//                 <DisplayDataset
//                     id={dataset?.id}
//                     key={dataset?.id}
//                     title={dataset?.title ? dataset?.title : "NA"}
//                     description={dataset?.description ? dataset?.description : "NA"}
//                 />
//             );

//             return [roundRatings(rating), datasetCell];
//         });
//     }
// }

// const getRating = (ratings: any, index: any) => {
//     let rating;
//     if (ratings.length == 6) {
//         rating = ratings.slice(1).map((rate: any, index: any) => ({
//             name: index + 1,
//             rating: rate[index + 1],
//         }));
//     } else {
//         rating = ratings.map((rate: any, index: any) => ({
//             name: index + 1,
//             rating: rate[index + 1],
//         }));
//     }
//     return rating;
// };

// const getChartData = (rating: any) => {
//     const data = rating.map((obj: any) => {
//         const key = parseFloat(Object.keys(obj)[0]);
//         const value = obj[key];
//         return {
//             star: ` ${key}`,
//             starRating: value
//         };
//     })
    // return data
// }
export default QualityInsightsBody;
