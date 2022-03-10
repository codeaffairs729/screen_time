import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DatasetDownload from "components/dataset/dataset_download";
import DataOwner from "components/dataset/data_owner";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import Dataset from "models/dataset.model";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const FavouriteDatasetItem = ({ dataset }: { dataset: Dataset }) => {
  const [isFavourited, setIsFavourited] = useState(dataset.detail.isFavourited);
  const { execute: executeHandleFavourite, isLoading: isHandlingFavourite } =
    useHttpCall();
  const handleFavourite = () =>
    executeHandleFavourite(
      async () => {
        if (!isFavourited) {
          const res = await Http.put(`/v1/datasets/${dataset.id}/favourite`);
          setIsFavourited(true);
        } else {
          const res = await Http.delete(`/v1/datasets/${dataset.id}/favourite`);
          setIsFavourited(false);
        }
      },
      { onError: (res) => toast.error("Something went wrong while ") }
    );

  return (
    <div className="flex border-t border-l border-r last:border-b">
      <div className="w-full p-2">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">
          <Link href={`/datasets/${dataset.id}`}>
            <a className="hover:text-dtech-secondary-light">
              {dataset.detail.name}
            </a>
          </Link>
        </h4>
        <DatasetDownload className="mb-2" urls={dataset.urls} />
        <DataOwner dataset={dataset} />
      </div>
      <div className="border-l p-3 px-8 flex items-center justify-center">
        <FavouriteBtn
          isFavourited={isFavourited}
          isLoading={isHandlingFavourite}
          onClick={handleFavourite}
        />
      </div>
    </div>
  );
};

export default FavouriteDatasetItem;
