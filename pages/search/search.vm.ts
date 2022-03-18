import { SearchOption } from "components/UI/dataset_search_input";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SingleValue } from "react-select";
import { updateCache } from "store/cache/cache.action";
import useSWR from "swr";
import Dataset from "../../models/dataset.model";

export type Filter = {
  domain?: string[];
  file_type?: string[];
  owner?: string[];
  license?: string[];
  quality?: string[];
  sort_by?: string[];
};

const SearchVM = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState<Filter>({});
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    const getQueryParam = (key: keyof Filter): string => {
      if (
        key &&
        activeFilter[key] &&
        (activeFilter[key] as Array<string>).length > 0
      ) {
        const paramValues = activeFilter[key] ?? [];
        return paramValues
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return "";
    };
    let cQueryParams = Object.keys(activeFilter)
      .map((k) => getQueryParam(k as keyof Filter))
      .filter((qp) => qp)
      .join("&");

    setQueryParams(cQueryParams ? `&${cQueryParams}` : "");
  }, [activeFilter]);

  /**
   * Fired when the term on the search input on the search page is changed
   */
  const onSearchChange = (option: SingleValue<SearchOption>) => {
    if (!option) return;
    dispatch(updateCache("last-search-query", option.value));
    router.push({ pathname: "/search", query: { q: option.value } });
  };

  /**
   * Get search results
   * TODO: convert searchquery, pagenum and pagesize to
   */
  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/v3/datasets?searchquery=${q}&pagesize=20&pagenum=1${queryParams}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          Dataset.fromJsonList(res[0]["user_search"][0]["results"].slice(0, 10))
        )
        .catch((e) => {
          toast.error("Something went wrong while fetching search results");
          throw e;
        })
  );

  return {
    datasets,
    error,
    isLoading: !datasets && !error,
    onSearchChange,
    activeFilter,
    setActiveFilter,
  };
};

interface ISearchVMContext {
  datasets: Dataset[] | undefined | void;
  error: any;
  isLoading: boolean;
  onSearchChange: Function;
  activeFilter: Filter;
  setActiveFilter: Function;
}

export const SearchVMContext = createContext({} as ISearchVMContext);

export default SearchVM;
