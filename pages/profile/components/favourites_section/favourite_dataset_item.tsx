import Http from "common/http";
import DatasetDownload from "components/dataset/dataset_download";
import LabelledRow from "components/dataset/labelled_row";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import Dataset from "models/dataset.model";
import Link from "next/link";

const FavouriteDatasetItem = ({
  dataset,
  onFavouriteSuccess,
}: {
  dataset: Dataset;
  onFavouriteSuccess: () => void;
}) => {
  return (
    <div className="flex border-t border-l border-r last:border-b" data-selector="favourite-dataset" data-dataset-id={dataset.id}>
      <div className="w-full p-2">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">
          <Link href={`/datasets/${dataset.id}`}>
            <a className="hover:text-dtech-secondary-light">
              {dataset.detail.name}
            </a>
          </Link>
        </h4>
        <DatasetDownload className="mb-2" dataset={dataset} />
        <LabelledRow label="Data Owner">
          {dataset.owner.organisation}
        </LabelledRow>
      </div>
      <div className="border-l p-3 px-8 flex items-center justify-center">
        <FavouriteBtn
          dataset={dataset}
          onFavouriteSuccess={onFavouriteSuccess}
        />
      </div>
    </div>
  );
};

export default FavouriteDatasetItem;
