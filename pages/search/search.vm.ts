import Http from "common/http";
import { SearchOption } from "components/UI/dataset_search_input";
import { isEqual } from "lodash-es";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SingleValue } from "react-select";
import { updateCache } from "store/cache/cache.action";
import useSWR from "swr";
import Dataset from "../../models/dataset.model";

export type Filter = {
  domain?: string[];
  location?: string[];
  topic?: string[];
  last_update?: string[];
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

  /**
   * Update the query params on updating any filter
   */
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
    `/v3/datasets?searchquery=${q}&pagesize=20&pagenum=1${queryParams}`,
    (url: string) =>
      Http.get(url, { baseUrl: `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}` })
        .catch((e) => {
          toast.error("Something went wrong while fetching search results");
          throw e;
        })
        .then((res) =>
          Dataset.fromJsonList(res[0]["user_search"][0]["results"].slice(0, 10))
        )
        .then((datasets) => {
          updateDisplayCount(datasets.map((d) => d.id));
          return datasets;
        })
        .catch((e) => {
          throw e;
        }),
    { revalidateOnFocus: false }
  );

  /**
   * Update the display count when the datasets appear in the search result
   */
  const updateDisplayCount = (datasetIds: number[]) => {
    return Http.post("/v1/datasets/displays", {
      meta_dataset_ids: datasetIds,
    });
  };

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

export default SearchVM;

export const SearchVMContext = createContext({} as ISearchVMContext);

export interface FilterOptionItem {
  value: string;
  label: string;
  checkbox: boolean | string;
}
export interface FilterOptions {
  [key: string]: FilterOptionItem[];
}

export const useSearchFilter = ({
  name,
  filterOptionItems,
}: {
  name: keyof Filter;
  filterOptionItems: FilterOptionItem[] | undefined;
}) => {
  const { activeFilter, setActiveFilter } = useContext(SearchVMContext);
  const { control, register, watch, reset } = useForm<FilterOptions>();
  const { fields, replace, update } = useFieldArray({ control, name });

  useEffect(() => {
    if (!filterOptionItems) return;
    replace(
      filterOptionItems?.map((f) => ({
        ...f,
        checkbox: (activeFilter?.[name] ?? []).includes(f.value)
          ? f.value
          : false,
      }))
    );
  }, [filterOptionItems]);

  useEffect(() => {
    const subscription = watch((formState) => {
      const currentFilterState = formState[name];
      const newFilterState = currentFilterState
        ?.filter((f) => f)
        .filter((f) => f?.checkbox)
        .map((f) => f?.value);
      setActiveFilter((state: Filter) => ({
        ...state,
        [name]: newFilterState,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return { control, register, fields, replace };
};
