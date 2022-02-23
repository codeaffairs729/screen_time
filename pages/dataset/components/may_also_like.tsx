import Dataset from "models/dataset.model";
import { useContext } from "react";
import useSWR from "swr";
import { DatasetDetailVMContext } from "../dataset_detail.vm";

const MayAlsoLike = () => {
  const { dataset } = useContext(DatasetDetailVMContext);
  const searchTerm = dataset?.detail.topics
    .slice(0, 5)
    .map((t) => encodeURIComponent(t))
    .join(", ");
  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/v2/dataset?searchterm=${searchTerm}`,
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

  return <div></div>;
};

export default MayAlsoLike;
