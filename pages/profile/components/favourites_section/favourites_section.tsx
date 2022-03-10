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
import FavouritesSectionContainer from "./favourites_section_container";
import FavouriteDatasetItem from "./favourite_dataset_item";

const FavouritesSection = () => {
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

  const isFetchingFavourites = !favouriteDatasets && !error;

  if (error) {
    return (
      <FavouritesSectionContainer>
        <div className="w-full flex items-start justify-center">
          <ErrorAlert
            className="max-w-xl mx-auto"
            message="Something went wrong while fetching datasets. Please try again later."
          />
        </div>
      </FavouritesSectionContainer>
    );
  }
  if (isFetchingFavourites) {
    return (
      <FavouritesSectionContainer>
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      </FavouritesSectionContainer>
    );
  }

  return (
    <FavouritesSectionContainer>
      <div className="flex justify-between border ml-2">
        <h3 className="font-semibold text-sm p-2 text-gray-700">
          Datasets
        </h3>
        <div className="border-l w-[86px]">
          
        </div>
      </div>
      <div className="w-full max-h-[max(300px,calc(100vh-var(--nav-height)-255px))] overflow-y-auto ml-2">
        {favouriteDatasets?.map((dataset, i) => (
          <FavouriteDatasetItem key={i} dataset={dataset} />
        ))}
      </div>
    </FavouritesSectionContainer>
  );
};

export default FavouritesSection;
