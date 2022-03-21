import { useEffect, useState } from "react";
import log from "loglevel";
import { Filter } from "pages/search/search.vm";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import Dataset from "models/dataset.model";
import Http from "./http";
import toast from "react-hot-toast";
import { uniq } from "lodash-es";
import { RootState } from "store";
import { useSelector } from "react-redux";

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
