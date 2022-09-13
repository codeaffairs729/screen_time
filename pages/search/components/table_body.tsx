import LabelledRow from "components/dataset/labelled_row";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import StarRating from "components/UI/star_rating";
import Dataset from "models/dataset.model";
import Link from "next/link";
import { useContext } from "react";
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
                <Row key={i} dataset={dataset} data-results-id={i} />
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
            <div
                className="outline outline-1 outline-gray-300 sm:px-2 md:px-5 py-1 flex flex-row justify-between"
                data-dataset-id={"dataset-search-item"}
                data-selector={dataset.id}
            >
                <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-md my-3">
                        <Link href={`/datasets/${dataset.id}`}>
                            <a
                                onClick={() => usereventDatasetView(dataset, q)}
                                className="hover:text-dtech-secondary-light"
                            >
                                {dataset.detail.name}
                            </a>
                        </Link>
                    </h3>

                    <p className="text-xs text-gray-800 my-1.5">
                        {dataset.detail.description}
                    </p>

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
                        <FavouriteBtn className="mx-auto" dataset={dataset} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableBody;
