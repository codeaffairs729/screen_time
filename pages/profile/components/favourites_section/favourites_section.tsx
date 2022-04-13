import { useHttpCall } from "common/hooks";
import Http from "common/http";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import FavouritesSectionContainer from "./favourites_section_container";
import FavouriteDatasetItem from "./favourite_dataset_item";

const FavouritesSection = () => {
  const { mutate } = useSWRConfig();
  const favEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites`;
  const { data: favouriteDatasets, error } = useSWR(
    favEndpoint,
    (url: string) =>
      Http.get("/v1/users/favourites", {
        baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
      })
        .then((res) => {
          return Dataset.fromJsonList(res);
        })
        .catch((e) => {
          toast.error("Something went wrong while fetching favourites");
          throw e;
        }),
    { revalidateOnFocus: false }
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
        <h3 className="font-semibold text-sm p-2 text-gray-700">Datasets</h3>
        <div className="border-l w-[86px]"></div>
      </div>
      <div className="max-h-[max(400px,calc(100vh-var(--nav-height)-295px))] overflow-y-auto ml-2">
        {!isFetchingFavourites && (favouriteDatasets?.length ?? 0) == 0 && (
          <InfoAlert message="No favourites found" className="mt-1" />
        )}
        {favouriteDatasets?.map((dataset, i) => (
          <FavouriteDatasetItem
            key={dataset.id}
            dataset={dataset}
            onFavouriteSuccess={() => mutate(favEndpoint)}
          />
        ))}
      </div>
    </FavouritesSectionContainer>
  );
};

export default FavouritesSection;
