import Http from "common/http";
import Dataset from "models/dataset.model";
import {
    createContext,
    SetStateAction,
    useEffect,
    useState,
    Dispatch,
} from "react";
import useSWR from "swr";

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

export enum download {
    by_region,
    by_time,
    by_user_type,
    by_sector,
}
export enum insightTabIndex {
    data_quality,
    use_cases,
    download_metrics,
}
const DatasetDetailVM = (initialDataset: Dataset | undefined) => {
    const [dataset, setDataset] = useState(initialDataset);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    useEffect(() => {
        // if (dataset?.id) {
        //     Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
        // }
    }, [dataset?.id]);

    useEffect(() => {
        // console.log('dataset vm', dataset);
    }, [dataset]);

    return { dataset, setDataset, setSelectedDownload, selectedDownload };
};

interface IDatasetDetailVMContext {
    dataset: Dataset | undefined;
    setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
    selectedDownload: number;
    setSelectedDownload: Function;
}

export const DatasetDetailVMContext = createContext<IDatasetDetailVMContext>(
    {} as IDatasetDetailVMContext
);

export default DatasetDetailVM;
