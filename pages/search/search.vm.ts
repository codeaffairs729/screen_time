import { createContext } from "react";
import useSWR from "swr";
import Dataset from "../../models/dataset.model";

const SearchVM = () => {
  // const { data, error } = useSWR(
  //   `${process.env.DTECHTIVE_API_ROOT}/v2/dataset?searchterm=health`,
  //   (url) => fetch(url).then((res) => res.json())
  // );
  // if (error) <p>Loading failed...</p>;
  // if (!data) <h1>Loading...</h1>;

  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DTECHTIVE_API_ROOT}/v2/dataset?searchterm=health`,
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          Dataset.fromJsonList(res?.[0]?.["user_search"]?.[0]?.["results"])
        )
  );

  return { datasets, error, isLoading: !datasets && !error };

  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_DTECHTIVE_API_ROOT}/v2/dataset?searchterm=health`,
  //   (url) =>
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((res) =>{
  //         const d = Dataset.fromJsonList(res?.[0]?.["user_search"]?.[0]?.["results"]);
  //         console.log(d, res);
  //         return res;

  //       }

  //       )
  // );
  // return { data, error };
};

export const SearchVMContext = createContext<{
  datasets: Dataset[] | undefined;
  error: any;
  isLoading: boolean;
}>({ datasets: undefined, error: null, isLoading: false });

export default SearchVM;
