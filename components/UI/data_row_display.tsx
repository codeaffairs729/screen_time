import { ReactNode, useState } from "react";
import Dataset from "models/dataset.model";
import Link from "next/link";
import StarRating from "components/UI/star_rating";
import InfoIcon from "components/UI/icons/info_icon";
import clsx from "clsx";

const DatasetRowDisplay = ({
    dataset,
    displayContext,
    onFavouriteChange,
}: {
    dataset: Dataset;
    displayContext: String;
    onFavouriteChange?: () => void;
}) => {
    return (
        <div
            className="border mb-2 bg-dtech-main-light border-1 border-gray-300 sm:px-2 md:px-5 py-1 flex flex-row justify-between bg-white hover:bg-gray-100"
            data-testid={displayContext}
            data-selector={dataset.id}
            id={dataset.id.toString()}
            data-title={dataset.detail.name}
        >
            <div className="flex flex-col flex-1">
                <div className="flex items-center">
                    <h3 className="font-semibold text-md my-3 hover:text-dtech-secondary-dark cursor-pointer">
                        <Link href={`/datasets/${dataset.id}`}>
                            <a className="">{dataset.detail.name}</a>
                        </Link>
                    </h3>
                    <div
                        data-testid={displayContext}
                        className={"flex space-x-1 flex-col ml-4"}
                    >
                        <span className="text-xs whitespace-nowrap relative">
                            <span className="text-[13px]">
                                Metadata Quality
                            </span>
                            <InfoIcon
                                oldIcon={false}
                                iconClasses="absolute left-[100%] top-[-25%] ml-[1px] h-3.5 w-3.5 text-black"
                                title={"Quality Rating"}
                            />
                        </span>
                        <span className="text-xs">
                            <StarRating
                                starClassName="text-black h-4 w-4"
                                rating={dataset.detail.dataQuality}
                            />
                        </span>
                    </div>
                    <div className="px-1 text-[15px] border border-gray-800 rounded ml-8">
                        {dataset.detail.license.type}
                    </div>
                </div>

                <p className="text-sm text-gray-800 my-1.5">
                    {dataset.detail.description.length > 180 ? (
                        <span>
                            <span>
                                {dataset.detail.description.replace(
                                    /^(.{160}[^\s]*).*/,
                                    "$1"
                                )}
                            </span>
                            <span className="font-semibold">...</span>
                        </span>
                    ) : (
                        dataset.detail.description
                    )}
                </p>
                <div>
                    {dataset.detail.keywords?.map(
                        (keyword: string, index: number) => (
                            <span
                                className="mr-4 text-sm capitalize text-gray-800 font-medium underline"
                                key={index}
                            >{`#${keyword}`}</span>
                        )
                    )}
                </div>
                <div className="flex flex-row my-1.5 justify-between">
                    <div className="flex flex-row w-1/2 justify-start">
                        <LabeledRow label="Data Owner:" className="mr-12">
                            {dataset.owner.organisation &&
                                dataset.owner.organisation}
                        </LabeledRow>
                        <LabeledRow label="Data Host:">
                            {dataset.detail.hostName}
                        </LabeledRow>
                    </div>
                    <div className="flex my-1.5">
                        <span className="text-xs mr-1">Updated</span>
                        <span className="text-xs font-medium">3 February 2021</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LabeledRow = ({
    label,
    className = "",
    children,
}: {
    label: string;
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={clsx("flex flex-col", className)}>
            <span className="text-xs whitespace-nowrap">{label}</span>
            <span className="text-xs font-medium">{children}</span>
        </div>
    );
};

export default DatasetRowDisplay;
