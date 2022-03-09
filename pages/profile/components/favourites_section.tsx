import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DatasetDownload from "components/dataset/dataset_download";
import DataOwner from "components/dataset/data_owner";
import ErrorAlert from "components/UI/alerts/error_alert";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const FavouritesSection = () => {
  // const {
  //   data: favouriteDatasets,
  //   isLoading: isFetchingFavourites,
  //   execute: executeFetchFavourites,
  // } = useHttpCall<Dataset[]>();
  // const fetchFavourites = () =>
  //   executeFetchFavourites(
  //     () =>
  //       Http.get("/v1/users/favourites", {
  //         baseUrl: process.env.NEXT_PUBLIC_DASHBOARD_API_ROOT,
  //       }),
  //     { postProcess: (res) => Dataset.fromJsonList(res) }
  //   );
  // useEffect(() => {
  //   fetchFavourites();
  // }, []);
  const { data: favouriteDatasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DASHBOARD_API_ROOT}/v1/users/favourites`,
    (url: string) =>
      Http.get("/v1/users/favourites", {
        baseUrl: process.env.NEXT_PUBLIC_DASHBOARD_API_ROOT,
      })
        .then((res) => Dataset.fromJsonList(res))
        .catch((e) => {
          toast.error("Something went wrong while fetching favourites");
          throw e;
        })
  );
  // if (error) {
  // }

  const isFetchingFavourites = !favouriteDatasets && !error;

  console.log(
    "isFetchingFavourites",
    isFetchingFavourites,
    favouriteDatasets,
    error
  );
  if (error) {
    return (
      <div className="w-full flex items-start justify-center">
        <ErrorAlert
          className="max-w-xl mx-auto"
          message="Something went wrong while fetching datasets. Please try again later."
        />
      </div>
    );
  }
  if (isFetchingFavourites) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-h-72 overflow-y-auto">
      {favouriteDatasets?.map((dataset, i) => (
        <FavouriteDatasetItem key={i} dataset={dataset} />
      ))}
    </div>
  );
};

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

  console.log('isHandlingFavourite', isHandlingFavourite);
  

  return (
    <div className="flex">
      <div className="border-t border-l last:border-b w-full p-2">
        <h4 className="font-medium mb-2 text-gray-700">
          {dataset.detail.name}
        </h4>
        <DatasetDownload urls={dataset.urls} />
        <DataOwner dataset={dataset} />
      </div>
      <div className="border-l border-b border-r p-3 flex items-center justify-center">
        <FavouriteBtn
          isFavourited={isFavourited}
          isLoading={isHandlingFavourite}
          onClick={handleFavourite}
        />
      </div>
    </div>
  );
};

export default FavouritesSection;
