import Dataset from "models/dataset.model";
import Link from "next/link";
import LabelledRow from "components/dataset/labelled_row";
import StarRating from "components/UI/star_rating";
import FavouriteBtn from "components/UI/buttons/favourite_btn";

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
            className="border border-1 border-gray-300 sm:px-2 md:px-5 py-1 flex flex-row justify-between bg-white hover:bg-gray-100"
            data-testid={displayContext}
            data-selector={dataset.id}
            id={dataset.id.toString()}
            data-title={dataset.detail.name}
        >
            <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-md my-3 hover:text-dtech-secondary-dark cursor-pointer">
                    <Link href={`/datasets/${dataset.id}`}>
                        <a className="">{dataset.detail.name}</a>
                    </Link>
                </h3>

                <p className="text-xs text-gray-800 my-1.5">
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

                {/* <div>
                    Tags: {dataset.detail.topics}
                </div> */}

                <div className="flex flex-row my-1.5">
                    <LabelledRow className="mr-10" label="License">
                        {dataset.detail.license.type}
                    </LabelledRow>
                    <LabelledRow className="mr-10" label="Last updated">
                        {dataset.detail.lastUpdate.isValid
                            ? dataset.detail.lastUpdate.toRelative()
                            : "-"}
                    </LabelledRow>
                    <LabelledRow className="mr-10" label="Metadata quality">
                        {<StarRating rating={dataset.detail.dataQuality} />}
                    </LabelledRow>
                </div>

                <div className="flex flex-row my-1.5">
                    <LabelledRow className="mr-10" label="Data Host">
                        <a
                            href={dataset.detail.hostUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs underline"
                        >
                            {dataset.detail.hostName}
                        </a>
                    </LabelledRow>
                    <LabelledRow className="mr-10" label="Data Owner">
                        {dataset.owner.organisation == ""
                            ? "-"
                            : dataset.owner.organisation}
                    </LabelledRow>
                </div>
            </div>
            <div className="w-20 md:w-40 items-center py-5">
                <div
                    data-dataset-id={dataset.id}
                    data-selector={"fav-btn__container"}
                    className="text-center"
                >
                    <FavouriteBtn
                        className="mx-auto"
                        dataset={dataset}
                        onFavouriteChange={onFavouriteChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DatasetRowDisplay;
