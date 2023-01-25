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
    by_role,
    by_sector,
}
export enum insightTabIndex {
    data_quality,
    use_cases,
    download_metrics,
}
export enum qualityInsights {
    data_quality,
    metadata_quality,
}
const DatasetDetailVM = (initialDataset: Dataset | undefined) => {
    const [dataset, setDataset] = useState(initialDataset);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    useEffect(() => {
        // if (dataset?.id) {
        //     Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
        // }
    }, [dataset?.id]);

    useEffect(() => {
        // console.log('dataset vm', dataset);
    }, [dataset]);

    return {
        dataset,
        setDataset,
        setSelectedDownload,
        selectedDownload,
        selectedQualityInsights,
        setSelectedQualityInsights,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
    };
};

interface IDatasetDetailVMContext {
    dataset: Dataset | undefined;
    setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
    selectedDownload: number;
    setSelectedDownload: Function;
    selectedQualityInsights: number;
    setSelectedQualityInsights: Function;
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    setToDate: Function;
}

export const DatasetDetailVMContext = createContext<IDatasetDetailVMContext>(
    {} as IDatasetDetailVMContext
);

export default DatasetDetailVM;
