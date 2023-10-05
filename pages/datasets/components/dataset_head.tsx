import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import { useContext, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import LabelledRow from "components/dataset/labelled_row";
import { BsFillEyeFill, BsHeartFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import Image from "next/image";
import display from "/public/images/icons/display_img.svg";
// import {
//     datasetToResultCardData,
//     SearchVMContext,
// } from "pages/search/search.vm";
import Link from "next/link";
import { useFetchStats } from "common/utils/datasets.util";
import { Data } from "components/UI/result_card";
import DatasetStat from "pages/search/organisation/components/dataset_stat";
import { BiDownload } from "react-icons/bi";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import NewResultCardAction from "components/UI/new_result_card_action";
import { useRouter } from "next/router";
const DatasetHead = ({ dataset }: any) => {
    // const vm = useContext(DatasetDetailVMContext);
    const { stats, fectchStats, isFetchingStats } = useFetchStats();
    const { headDataset, setHeadDataset } = useContext(DatasetDetailVMContext);
    const router = useRouter()
    useEffect(() => {
        fectchStats([dataset?.id]);
    }, [dataset]);
    useEffect(() => {
        setHeadDataset(datasetToResultCardData([dataset], stats)[0]);
    }, [stats]);
    if (!dataset) {
        return <div />;
    }
    let contactOwnerEmail = dataset?.owner?.contact?.email;
    if ((contactOwnerEmail?.search(/^mailto:/) ?? -1) > -1) {
        contactOwnerEmail = contactOwnerEmail?.slice(7);
    }
    const {
        name,
        description,
        lastUpdate,
        downloads,
        views,
        favourites,
        displays,
        domain,
        topics,
        keywords,
        license,
        dataQuality,
        datasetUrl,
        hostUrl,
        hostName,
        hostUuid
    } = dataset.detail || {};
    const datasetId = router && router.query && router.query.id ? router.query.id.toString() : "";

    // Ensure datasetId is not an empty string before accessing the stats array
    let stat;
    let favouriteCount;
    if (datasetId && stats[parseInt(datasetId)]) {
        stat = stats[parseInt(datasetId)].searchMetrics;
        favouriteCount = stats[parseInt(datasetId)].favouriteCount
    } function getFileFormatCounts(fileArray: Array<{ format: string }>) {
        // Define the type of formatCounts object
        const formatCounts: Record<string, number> = {};

        // Iterate through the array of objects and count the formats
        fileArray.forEach((file: any) => {
            const format = file.format;

            // If the format exists in the counts object, increment the count; otherwise, set it to 1
            if ((formatCounts[format])) {
                formatCounts[format]++;
            } else {
                formatCounts[format] = 1;
            }
        });

        // Create an array of strings with string interpolation
        const result = Object.entries(formatCounts).map(([format, count]) => {
            return `${format.toUpperCase()} (${count})`;
        });
        if (result.includes('NULL (1)')) return []
        else return result;
    }
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="sm:px-10 sm:py-4 px-4  sm:w-3/4 sm:min-w-[75%]">

                {/* <div className="flex }items-center"> */}
                <div className="flex justify-between items-center">
                    <div className=" text-dtech-new-main-light text-xl pb-4 font-bold">
                        {name}
                    </div>
                    <div className="sm:flex hidden justify-between items-center ">
                        <MetaRating
                            className="text-dtech-new-main-light !flex-row items-center"
                            infoClassName="!text-dtech-new-main-light top-0 m-[1px] ml-[5px]"
                            starClassName="!text-dtech-new-main-light"
                            dataQuality={dataQuality}
                            title="Estimated based on the European Commission's Metadata Quality Assessment method."
                        />
                        {/* {buttonTags?.map((tag: string, index: number) => (
                            <fieldset
                                className=" min-h-full px-4 border rounded border-[#5F5F63]  text-xs pb-0.5"
                                key={index}
                            >
                                <legend className="text-xs mr-8">
                                    Licence
                                </legend>
                                <div>
                                    <label>{`${tag[0].toUpperCase()}${tag.slice(
                                        1
                                    )}`}</label>
                                </div>
                            </fieldset>
                        ))} */}
                    </div>
                </div>

                {/* </div> */}
                <div className="sm:hidden flex flex-col bg-[#EBEBEB] p-2">
                    <MetaRating
                        labelClass=" !text-base font-semibold"
                        className=" !flex-row justify-between"
                        infoClassName="!text-dtech-new-main-light top-0 m-[1px] ml-[10px] !h-6 !w-5"
                        starClassName="!text-dtech-new-main-light mx-0.5 "
                        dataQuality={dataQuality}
                        title="Estimated based on the European Commission's Metadata Quality Assessment method."
                    />
                    <div>
                        <span className="text-base font-semibold text-[#333333] ">
                            Last Updated:{" "}
                        </span>
                        <span className="text-base font-normal  text-[#727272]">
                            {DateTime.fromISO(`${lastUpdate}`).toFormat(
                                "dd MMM yyyy"
                            )}
                        </span>
                    </div>

                </div>
                <div className="">
                    <div className="flex justify-between py-2">
                        <span className="sm:text-md text-base text-[#727272]">{description}</span>
                        {/* Add Website Url */}

                    </div>
                    <div className="my-4 p-2 bg-[#EBEBEB]">
                        <div className="flex sm:flex-row flex-col py-1 w-full">
                            <div className="sm:w-1/3 sm:pl-10 flex flex-row items-center">
                                <span className="text-md font-semibold text-[#2D2D32] ">
                                    Host{" "}
                                </span>
                                <span className="text-md text-[#0065BD] underline w-full font-normal ml-2">
                                    <a href={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/organisation/${hostUuid}`} rel="noreferrer" target="_blank">{hostName}</a>
                                </span>
                            </div>
                            <div className="sm:w-1/3 sm:pl-10 flex flex-row items-center">
                                <span className="text-md font-semibold text-[#2D2D32] ">
                                    Owner{""}
                                </span>
                                <span className="text-md text-[#0065BD] underline font-normal ml-2">
                                    <a href={dataset.owner.ownerUrl} rel="noreferrer" target="_blank">{dataset.owner.organisation}</a>
                                    
                                </span>
                            </div>
                            <div className="sm:w-1/3 sm:pl-10 flex flex-row items-center">

                                <span className="text-md font-semibold text-[#2D2D32] ">
                                    Last Updated{" "}
                                </span>
                                <span className="text-md text-[#727272] font-normal ml-2">
                                    {DateTime.fromISO(`${lastUpdate}`).toFormat(
                                        "dd MMM yyyy"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 hidden sm:block bg-[#EBEBEB]">
                        <div className="flex flex-col sm:flex-row py-1 w-full">
                            {/* <DatasetStat stats={stats} /> */}
                            <div className="w-1/3 pl-10 flex flex-row items-center">
                                <span className="text-md flex items-center font-semibold text-[#2D2D32] ">
                                    <BiDownload size={20} className=" text-[#727272] mx-1" /> Downloads{" "}
                                </span>
                                <span className="text-md text-[#727272] font-normal ml-2">
                                    {stat?.downloads}
                                </span>
                            </div>
                            <div className="w-1/3 pl-10 flex flex-row items-center">
                                <span className="text-md text-[#2D2D32] flex font-semibold items-center ">
                                    <AiFillEye size={20} className=" text-[#727272] mx-1" /> Views{""}
                                </span>
                                <span className="text-md text-[#727272] font-normal ml-2">

                                    {stat?.views}
                                </span>
                            </div>
                            <div className="w-1/3 pl-10 flex flex-row items-center">
                                <span className="text-md text-[#2D2D32] font-semibold flex items-center">
                                    <AiFillHeart size={20} className=" text-[#727272] mx-1" /> Likes{" "}
                                </span>
                                <span className="text-md text-[#727272] font-normal ml-2">
                                    {favouriteCount}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-start items-start my-3">
                        <div className="flex flex-col sm:w-1/2">
                            <MetaInfoEntity entityName="Domains" entities={domain} />
                            <MetaInfoEntity entityName="Topics" entities={topics} />
                        </div>
                        <div className="flex flex-col sm:w-1/2 w-full">
                            <MetaInfoEntity entityName="File Type" entities={getFileFormatCounts(dataset.urls)} />
                            <div className="my-4 sm:hidden bg-[#EBEBEB]">
                                <div className="flex flex-col p-2 w-full">
                                    <div className=" flex flex-row">
                                        <div className="flex flex-row items-center w-1/2">
                                            <span className="text-md flex items-center font-semibold text-[#2D2D32] ">
                                                <BiDownload size={20} className=" text-[#727272] mx-1" /> Downloads{" "}
                                            </span>
                                            <span className="text-md text-[#727272] font-normal ml-2">
                                                {stat?.downloads}
                                            </span>
                                        </div>
                                        <div className=" flex flex-row items-center">
                                            <span className="text-md text-[#2D2D32] flex font-semibold items-center ">
                                                <AiFillEye size={20} className=" text-[#727272] mx-1" /> Views{""}
                                            </span>
                                            <span className="text-md text-[#727272] font-normal ml-2">

                                                {stat?.views}
                                            </span>
                                        </div>
                                    </div>
                                    <div className=" flex flex-row">

                                        <div className=" flex flex-row items-center">
                                            <span className="text-md text-[#2D2D32] font-semibold flex items-center">
                                                <AiFillHeart size={20} className=" text-[#727272] mx-1" /> Likes{" "}
                                            </span>
                                            <span className="text-md text-[#727272] font-normal ml-2">
                                                {favouriteCount}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           { license.type &&<div className=" flex justify-between w-full sm:justify-start ">
                                <span className="sm:text-sm text-base font-normal m-1 text-[#333333] ">
                                    Licence
                                </span>
                                {license?.url?.length > 0
                                    ? <a href={license.url} target="_blank" rel="noreferrer">
                                        <span
                                        className=" border-2 underline underline-offset-2 border-dtech-new-main-light px-2 pb-1 sm:ml-2 sm:text-sm text-sm cursor-pointer text-dtech-new-main-light">
                                        {license.type}
                                    </span>
                                    </a>
                                    : <span
                                        className=" border-2 border-dtech-new-main-light px-1 flex items-center justify-center sm:ml-2 text-[0.875rem] cursor-pointer text-dtech-new-main-light">
                                    {license.type}
                                </span>}
                            </div>}
                        </div>

                    </div>
                </div>

            </div>
            <div className=" bg-[#2D2D32] bg-opacity-10 sm:w-1 h-[1px] sm:h-auto sm:my-4 mx-4 mb-4 sm:mx-0 sm:mb-0"> </div>
            <NewResultCardAction
                className="flex-row sm:flex-col items-center justify-center sm:py-8 w-full"
                gridClass = "md:!gap-16"
                data={{ ...headDataset, url: headDataset?.dataProviders?.datasetSource}}
                setData={setHeadDataset}
                href={`/dataset/${dataset?.id}`}
                owner={dataset.owner.organisation}
            />
        </div>
    );
};

const
    MetaInfoEntity = ({
    entityName,
    entities,
}: {
    entityName: string;
    entities: string[] | undefined;
}) => {
    const [viewAll, setViewAll] = useState<boolean>(false)
    const handleSearchFocus = () => {
        setViewAll(true);
    };

    const handleSearchBlur = () => {
        setViewAll(false);
    };
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setViewAll(viewAll);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    return (
        <div className="flex sm:mr-8 w-full "
            ref={myRef}
        >
            {entities && entities.length > 0 && (
                // <div className="flex flex-row space-x-2  w-full ">
                <div className="flex w-full items-center sm:justify-start justify-between">
                    <div className=" min-w-max">
                        <span className="sm:text-sm text-md font-normal m-1 text-[#333333] ">
                            {entityName}
                        </span>
                        {entities &&entities.length>2&&<span
                            onClick={() => setViewAll(!viewAll)}
                            className=" underline sm:text-sm text-md cursor-pointer text-[#0065BD]">
                            View all
                        </span>}
                    </div>
                    <div className="flex flex-wrap flex-row  sm:max-w-xs  ml-2 ">
                        {entities.map((entity, index) => {
                            if (index < 2) return (
                                <span
                                    key={index}
                                    className="sm:text-sm text-md text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                >
                                    {entity}
                                </span>
                            )
                        })}
                    </div>
                    {<div onClick={handleSearchBlur}
                        className={viewAll ? ` bg-black absolute opacity-90 h-[3000px] right-0 sm:h-[3000px]  w-screen flex items-center  z-20` : "hidden"}></div>}
                    {viewAll && <div className="flex flex-wrap flex-row px-6 py-4 sm:w-[616px] w-xs bg-white absolute z-20 rounded-xl">
                        <div className="flex justify-between w-full pb-4"><div>{entityName}</div><div className=" cursor-pointer" onClick={() => setViewAll(!viewAll)}><img src="/images/provider-detail-page/close.svg" /></div></div>
                        {entities.map((entity, index) => {
                            return (
                                <span
                                    key={index}
                                    className="text-sm text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                >
                                    {entity}
                                </span>
                            )
                        })}
                    </div>}
                </div>
                // </div>
            )}
        </div>
    );
};
export default DatasetHead;

const datasetToResultCardData = (datasets: any, stats: any): Data[] => {
    if (!datasets?.length) {
        return [];
    }

    return datasets?.map((dataset: any) => ({
        id: dataset.id,
        title: dataset.detail.name,
        recordType: "datasets",
        description: dataset.detail.description,
        dataQuality: dataset.detail.dataQuality,
        licenseTypes: [dataset.detail.license.type],
        topics: dataset.detail.topics,
        isFavourited: stats[dataset.id]?.isFavourited,
        lastUpdate: dataset.detail.lastUpdate,
        domains:
            typeof dataset.detail.domain === "string"
                ? [dataset.detail.domain]
                : dataset.detail.domain, //Some dataset are fetching from older version api need to update it in future
        dataProviders: {
            organisation: dataset.owner.organisation,
            hostName: dataset.detail.hostName,
            hostUuid: dataset.detail.hostUuid,
            ownerUuid: dataset.owner.uuid,
            hostUrl: dataset.detail.hostUrl,
            ownerUrl: dataset.owner.ownerUrl,
            datasetSource: dataset.detail.datasetUrl,
        },
    }));
};
