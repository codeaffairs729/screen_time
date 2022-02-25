import DatasetDownload from "components/dataset/dataset_download";
import DataHost from "components/dataset/data_host";
import DataOwner from "components/dataset/data_owner";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { DatasetDetailVMContext } from "../dataset_detail.vm";

const MayAlsoLike = () => {
  const { dataset } = useContext(DatasetDetailVMContext);
  const searchTerm = dataset?.detail.topics
    .slice(0, 5)
    .filter((t) => t)
    .map((t) => encodeURIComponent(t))
    .join(",");
  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/v3/datasets?searchquery=${searchTerm}&pagesize=20&pagenum=1`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          Dataset.fromJsonList(
            res[0]["user_search"][0]["results"]
              .slice(0, 10)
              .filter((ds: any) => ds["id"] != dataset?.["id"])
          )
        )
  );

  const isLoading = !datasets && !error;

  if (error) {
    return (
      <ErrorAlert className="m-2" message="Something went wrong while fetching related datasets. Please try again later" />
    );
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
      {datasets?.map((dataset, i) => (
        <MayAlsoLikeDataset key={i} dataset={dataset} />
      ))}
    </div>
  );
};

const MayAlsoLikeDataset = ({ dataset }: { dataset: Dataset }) => {
  return (
    <div className="border p-2 m-1.5">
      <h4 className="font-semibold text-sm">
        <Link href={`/datasets/${dataset.id}`}>
          <a className="hover:text-dtech-secondary-light">
            {dataset.detail.name}
          </a>
        </Link>
      </h4>
      <p className="text-xs text-gray-800">{dataset.detail.description}</p>
      <DatasetDownload urls={dataset.urls} />
      <DataHost className="my-2" dataset={dataset}/>
      <DataOwner className="mb-2" dataset={dataset}/>
    </div>
  );
};

export default MayAlsoLike;
