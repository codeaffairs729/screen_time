import { SearchOption } from "components/UI/dataset_search_input";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import { SingleValue } from "react-select";
import useSWR from "swr";
import Dataset from "../../models/dataset.model";

const SearchVM = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  /**
   * Fired when the term on the search input on the search page is changed
   */
  const onSearchChange = (option: SingleValue<SearchOption>) => {
    if (!option) return;
    router.push({ pathname: "/search", query: { q: option.value } });
  };

  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/v2/dataset?searchterm=${q}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          Dataset.fromJsonList(
            res?.[0]?.["user_search"]?.[0]?.["results"].slice(0, 10)
          )
        )
  );

  return { datasets, error, isLoading: !datasets && !error, onSearchChange };
};

export const SearchVMContext = createContext<{
  datasets: Dataset[] | undefined;
  error: any;
  isLoading: boolean;
}>({ datasets: undefined, error: null, isLoading: false });

export default SearchVM;
