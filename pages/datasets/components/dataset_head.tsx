import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import { useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import LabelledRow from "components/dataset/labelled_row";
import { BsFillEyeFill, BsHeartFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import Image from "next/image";
import display from "/public/images/icons/display_img.svg";
import {
    datasetToResultCardData,
    SearchVMContext,
} from "pages/search/search.vm";
import Link from "next/link";
const DatasetHead = ({ dataset }: any) => {
    // const vm = useContext(DatasetDetailVMContext);
    const { stats, fectchStats, isFetchingStats } = useContext(SearchVMContext);
    const { headDataset, setHeadDataset } = useContext(DatasetDetailVMContext);

    useEffect(() => {
        fectchStats([dataset?.id]);
    }, []);
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
    } = dataset.detail || {};

    const stat = {
        displayCount: displays,
        favoritesCount: favourites,
        viewCount: views,
        downloadCount: downloads,
    };

    return (
        <div className="px-4">
            {/* <div className="flex justify-between items-center"> */}
            <div className="lg:flex justify-between items-center">
                <div className="text-dtech-dark-grey text-lg font-semibold">
                    {name}
                </div>
                <div className="md:flex justify-between items-center">
                    <MetaRating
                        className="w-min mb-2"
                        dataQuality={dataQuality}
                        title="Estimated based on the EU Metadata Quality Assessment method."
                    />
                    <fieldset className=" min-h-full px-4 border rounded border-[#5F5F63] w-min text-xs pb-0.5 mb-2">
                        <legend className="text-xs mr-8">Licence</legend>
                        <div>
                            <label>{license?.type}</label>
                        </div>
                    </fieldset>
                    {!isFetchingStats && (
                        <ResultCardAction
                            data={headDataset}
                            setData={setHeadDataset}
                            href={`/datasets/${dataset?.id}`}
                        />
                    )}
                </div>
            </div>
            {/* </div> */}
            <div className="my-4">
                <div className="flex justify-between">
                    <span className="text-sm lg:w-2/3">{description}</span>
                </div>
            </div>
            <div className="my-4">
                <div className="flex flex-wrap space-x-8  items-center">
                    <Link href={`${datasetUrl}`}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs  mr-5 "
                        >
                            <div className="flex justify-center items-center mr-6">
                                Go to source
                                <Image
                                    src={"/images/icons/arrow.svg"}
                                    height={30}
                                    width={30}
                                />
                            </div>
                        </a>
                    </Link>

                    <LabelledRow
                        displayContext="data-host"
                        className=" flex space-x-2  justify-center items-center"
                        label="Host"
                    >
                        <strong>
                            <Link href={`${hostUrl}`}>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className=" text-m  text-dtech-main-dark"
                                >
                                    {dataset.detail.hostName}
                                </a>
                            </Link>
                        </strong>
                    </LabelledRow>

                    <LabelledRow
                        className=" flex space-x-2 justify-center items-center"
                        label="Owner"
                    >
                        <strong>
                            <a
                                href={`${dataset.owner.ownerUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-m text-dtech-main-dark"
                            >
                                {dataset.owner.organisation}
                            </a>
                        </strong>
                    </LabelledRow>
                    <div>
                        <span className="text-sm text-dtech-dark-grey">
                            Updated:{" "}
                        </span>
                        <span className="text-m font-medium text-dtech-dark-grey">
                            {DateTime.fromISO(`${lastUpdate}`).toFormat(
                                "dd MMM yyyy"
                            )}
                        </span>
                    </div>
                </div>
                <div className="flex justify-start items-start my-3">
                    <MetaInfoEntity entityName="Domains" entities={domain} />
                    <MetaInfoEntity entityName="Topics" entities={topics} />
                    {/* <MetaInfoEntity entityName="Keywords" entities={keywords} /> */}
                </div>
                <DatasetStat stats={stat} />
            </div>
        </div>
    );
};

const MetaInfoEntity = ({
    entityName,
    entities,
}: {
    entityName: string;
    entities: string[] | undefined;
}) => {
    return (
        <div className="flex mr-8">
            {entities && entities.length > 0 && (
                <div className="flex  flex-row space-x-2 max-w-xs ">
                    <div className="flex ">
                        <span className="text-sm font-medium m-1 text-dtech-dark-grey ">
                            {entityName}
                        </span>
                    </div>
                    <div className="flex flex-wrap flex-row  max-w-xs ">
                        {entities.map((entity, index) => (
                            <span
                                key={index}
                                className="text-sm text-white m-1 bg-[#5F5F63] mb-2 rounded p-1 px-2 !pt-0"
                            >
                                {entity}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const DatasetStat = ({ stats }: { stats: any }) => {
    const {
        displayCount = 0,
        favoritesCount = 0,
        viewCount = 0,
        downloadCount = 0,
    } = stats || {};

    return (
        <div className="my-4">
            <div className="flex justify-between">
                <div className="flex flex-wrap">
                    <div className="flex justify-center items-center mr-6">
                        <BsHeartFill className="h-5 w-5 mr-2 text-dtech-main-dark" />
                        <span className=" max-w-24 text-m font-normal">
                            Added to favourites
                        </span>
                        <span className="ml-2 text-dtech-main-dark font-medium text-sm">
                            {favoritesCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <BsFillEyeFill className="h-5 w-5 mr-2 text-dtech-main-dark" />
                        <span className="max-w-24 text-m font-normal">
                            Viewed
                        </span>
                        <span className="ml-2 text-dtech-main-dark font-medium text-sm">
                            {viewCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6">
                        <MdFileDownload className="h-5 w-5 mr-2 text-dtech-main-dark" />
                        <span className="max-w-24 text-m font-normal">
                            Downloaded
                        </span>
                        <span className="ml-2 text-dtech-main-dark font-medium text-sm">
                            {downloadCount}
                        </span>
                    </div>
                    <div className="flex justify-center items-center mr-6 ">
                        <Image
                            className="text-dtech-main-dark"
                            src={display}
                            height={20}
                            width={20}
                        />
                        <span className="max-w-24 text-m font-normal flex flex-col">
                            Displayed in
                            <span>search results</span>
                        </span>
                        <span className="ml-2 text-dtech-main-dark font-medium text-sm">
                            {displayCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetHead;
