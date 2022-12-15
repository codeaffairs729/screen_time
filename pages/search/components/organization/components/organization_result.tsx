import Link from "next/link";
import LabelledRow from "components/dataset/labelled_row";
import MetaRating from "components/UI/metaRating";
import OrganizationAction from "components/UI/organizationAction";
import { useState } from "react";
import DatasetStat from "./dataset_stat";

const OrganizationResult = ({ dataset }: { dataset: any }) => {
    const [favourite, setFavourite] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [popup, setPopup] = useState(false);
    const onFavourite = () => {
        console.log("onfavoutrite favourite ", favourite);
        favourite ? setFavourite(false) : setFavourite(true);
    };
    const handleBookmark = () => {
        console.log("onBookmark bookmark", bookmark);
        bookmark ? setBookmark(false) : setBookmark(true);
    };

    const handleShare = () => {
        popup ? setPopup(false) : setPopup(true);
    };

    return (
        <div className="rounded-lg sm:px-2 md:px-5 py-1 flex flex-row justify-between bg-dtech-light-grey hover:bg-dtech-main-light ml-2 mr-4 my-2">
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between w-full p-[10px]">
                    <div className="flex items-center">
                        {dataset.featured && (
                            <span className="border border-1 bg-dtech-notification-alert-secondary text-sm px-1 h-6 text-white mr-4 ml-[-12px] rounded-md  ">
                                Featured
                            </span>
                        )}
                        <Link href={``}>
                            <a className="font-medium font-roboto text-md my-3 text-dtech-main-dark text-[17px] ml-[-8px] cursor-pointer">
                                {dataset.name}
                            </a>
                        </Link>
                        <MetaRating
                            dataQuality={dataset.dataQuality}
                            displayContext={"displayContext"}
                            labelClass= "font-normal"
                        />
                        {dataset.button_tag.map((bt: any, i: any) => (
                            <button
                                key={i}
                                className="px-6 text-m font-normal border border-dtech-main-dark rounded ml-8 text-dtech-main-dark"
                            >
                                {bt}
                            </button>
                        ))}
                    </div>
                    <OrganizationAction
                        favourite={favourite}
                        bookmark={bookmark}
                        popup={popup}
                        onFavourite={onFavourite}
                        handleBookmark={handleBookmark}
                        handleShare={handleShare}
                    />
                </div>
                <p className="text-sm  text-gray-800 my-1.5">
                    {dataset.description.length > 300 ? (
                        <span>
                            <span>
                                {dataset.description.replace(
                                    /^(.{200}[^\s]*).*/,
                                    "$1"
                                )}
                            </span>
                            <span className="font-semibold">...</span>
                        </span>
                    ) : (
                        dataset.description
                    )}
                </p>

                <div className="flex my-1.5">
                    <LabelledRow className="mr-10" label="Domains" labelClasses="!text-sm">
                        <span className="w-14 h-4 font-normal text-sm underline decoration-1 p-1.5 ">
                            #Health
                        </span>
                    </LabelledRow>
                    <LabelledRow className="mr-10" label="Topics" labelClasses="!text-sm">
                        <span className="w-14 h-4 text-sm underline decoration-1 p-1.5">
                            #Health
                        </span>
                        <span className="w-14 h-4 text-sm underline decoration-1 p-1.5">
                            #Survey
                        </span>
                    </LabelledRow>
                </div>
                <div className="flex items-center justify-between w-full my-1.5">
                    <div className="flex">
                        <DatasetStat />
                    </div>
                    {/* <LabelledRow className="mr-10" label="Updated">
                        11 July 2021
                    </LabelledRow> */}
                </div>
            </div>
        </div>
    );
};

export default OrganizationResult;
