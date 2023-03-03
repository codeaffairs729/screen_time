import Dataset from "models/dataset.model.v4";
import Http from "common/http";
import {
    createContext,
    SetStateAction,
    useEffect,
    useState,
    Dispatch,
} from "react";

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

export enum insightTabIndex {
    dataset_quality,
    use_cases,
    download_metrics,
}
const DatasetDetailVM = (initialDataset: Dataset | undefined) => {
    const [dataset, setDataset] = useState(initialDataset);
    const [headDataset, setHeadDataset] = useState<any>();

    useEffect(() => {
        if (dataset?.id) {
            Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
        }
    }, [dataset?.id]);

    return {
        dataset,
        headDataset,
        setHeadDataset,
        setDataset,
    };
};

interface IDatasetDetailVMContext {
    dataset: Dataset | undefined;
    headDataset: any;
    setHeadDataset: Function;
    setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
}

export const DatasetDetailVMContext = createContext<IDatasetDetailVMContext>(
    {} as IDatasetDetailVMContext
);

export default DatasetDetailVM;
