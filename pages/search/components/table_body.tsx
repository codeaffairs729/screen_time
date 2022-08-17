import clsx from "clsx";
import DatasetDownload from "components/dataset/dataset_download";
import LabelledRow from "components/dataset/labelled_row";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import StarRating from "components/UI/star_rating";
import { DateTime } from "luxon";
import Dataset from "models/dataset.model";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { SearchVMContext } from "../search.vm";
import { usereventDatasetView } from "services/usermetrics.service";
import { useRouter } from "next/router";

const TableBody = () => {
    const vm = useContext(SearchVMContext);

    if (vm.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {vm.datasets?.map((dataset, i) => (
                <Row key={i} dataset={dataset} />
            ))}
        </>
    );
};

const Row = ({ dataset }: { dataset: Dataset }) => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    return (
        <>
            <Cell
                className="min-w-[350px]"
                dataSelector="dataset-search-item"
                dataDatasetId={dataset.id}
            >
                {/* <div> */}
                <h4 className="font-semibold text-sm mb-1">
                    <Link href={`/datasets/${dataset.id}`}>
                        <a
                            onClick={() => usereventDatasetView(dataset, q)}
                            className="hover:text-dtech-secondary-light"
                        >
                            {dataset.detail.name}
                        </a>
                    </Link>
                </h4>
                <p className="text-xs text-gray-800 mb-1.5">
                    {dataset.detail.description}
                </p>
                <DatasetDownload dataset={dataset} className="mb-2" />
                <LabelledRow className="mb-1.5" label="Data Host">
                    <a
                        href={dataset.detail.hostUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline"
                    >
                        {dataset.detail.hostName}
                    </a>
                </LabelledRow>
                <LabelledRow className="mb-1.5" label="Data Owner">
                    {dataset.owner.organisation}
                </LabelledRow>
                <LabelledRow className="mb-1.5" label="License">
                    {dataset.detail.license.type}
                </LabelledRow>
                {/* </div> */}
            </Cell>
            <Cell className="text-center">
                {<StarRating rating={dataset.detail.popularity} />}
            </Cell>
            <Cell className="text-center">
                {<StarRating rating={dataset.detail.dataQuality} />}
            </Cell>
            <Cell className="text-xs text-center pt-1 font-medium text-gray-700">
                {dataset.detail.lastUpdate.isValid
                    ? dataset.detail.lastUpdate.toRelative()
                    : ""}
            </Cell>
            <Cell className="text-xs text-center pt-1 font-medium text-gray-700">
                {dataset.detail.lastDownloaded.isValid
                    ? dataset.detail.lastDownloaded.toRelative()
                    : ""}
            </Cell>
            <Cell
                className="text-center pt-1"
                dataSelector="fav-btn__container"
                dataDatasetId={dataset.id}
            >
                <FavouriteBtn className="mx-auto" dataset={dataset} />
            </Cell>
        </>
    );
};

const Cell = ({
    children,
    className = "",
    dataDatasetId,
    dataSelector,
}: {
    children: ReactNode;
    className?: string;
    dataDatasetId?: string | Number;
    dataSelector?: string;
}) => {
    return (
        <div
            data-dataset-id={dataDatasetId}
            data-selector={dataSelector}
            className={clsx(
                "outline outline-1 outline-gray-300 px-2 py-1",
                className
            )}
        >
            {children}
        </div>
    );
};

export default TableBody;
