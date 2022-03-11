import { useState } from "react";
import log from "loglevel";
import { Filter } from "pages/search/search.vm";
import { useForm, useWatch } from "react-hook-form";
import Dataset from "models/dataset.model";
import Http from "./http";
import toast from "react-hot-toast";
const { useEffect } = require("react");

export const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export const useHttpCall = <T>(initial: any = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T>(initial);

  const execute = async (
    httpFn: Function,
    {
      onSuccess,
      onError,
      postProcess,
    }: {
      onSuccess?: (res: any) => any;
      onError?: (error: any) => any;
      postProcess?: (res: any) => Promise<T> | T;
    } = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      setData(initial);
      const res = await httpFn();
      let processedRes;
      if (postProcess) {
        processedRes = await postProcess(res);
      } else {
        processedRes = res;
      }
      setData(processedRes);
      onSuccess?.call(null, res);
      return res as T;
    } catch (e) {
      log.error(e);
      setError(e);
      onError?.call(null, e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    execute,
  };
};

export const useWatchFilter = ({
  setActiveFilter,
  // newState,
  name,
}: {
  setActiveFilter: Function;
  // newState: { [key: string]: any };
  name: string;
}) => {
  const { register, control } = useForm();
  // const vm = useContext(SearchVMContext);
  const newState = useWatch({
    control,
    name,
    defaultValue: [],
  });
  useEffect(() => {
    setActiveFilter((state: Filter) => ({
      ...state,
      [name]: newState,
    }));
  }, [newState]);
  return { register, control };
};

/**
 * Favourite a dataset
 */
export const useFavouriteDataset = (dataset: Dataset) => {
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
      {
        onError: (res) => toast.error("Something went wrong while favouriting"),
      }
    );
  return {
    isFavourited,
    setIsFavourited,
    isHandlingFavourite,
    handleFavourite,
  };
};
