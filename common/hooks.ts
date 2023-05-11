import { useEffect, useState } from "react";
import log from "loglevel";

export const useScript = (url: string, onSuccess?: () => void) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
        onSuccess?.call(null);
        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
};

// useHttpCall isLoading state data that can be used for showing loading icon, error state data to show the error, data ?,
// and the execute function itself that is the function to execute with the backend API.

// The execute Fucntion, takes in a httpFn, a request or so, and also takes in onSuccess Func to give instruction for when
// success in requestion, onError Func on when caught an error, what to do. and postProcess Func what to do with the return data.

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
