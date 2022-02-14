import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import useSWR from "swr";
import Dataset from "../../models/dataset.model";

const SearchVM = () => {
  // const {query: { q}} = useRouter();
  const router = useRouter();
  console.log('router', router.query);
  
  useEffect(()=>{
    console.log('q changed');
    
  }, [router.query]);

  const { data: datasets, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/v2/dataset?searchterm=health`,
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          Dataset.fromJsonList(res?.[0]?.["user_search"]?.[0]?.["results"])
        )
  );

  return { datasets, error, isLoading: !datasets && !error };
};

export const SearchVMContext = createContext<{
  datasets: Dataset[] | undefined;
  error: any;
  isLoading: boolean;
}>({ datasets: undefined, error: null, isLoading: false });

export default SearchVM;
