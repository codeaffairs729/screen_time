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

const DatasetDetailVM = (initialDataset: Dataset | undefined) => {
  const [dataset, setDataset] = useState(initialDataset);

  useEffect(() => {
    if (dataset?.id) {
      Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
    }
  }, [dataset?.id]);

  useEffect(()=>{
    
    console.log('dataset vm', dataset);
    
  }, [dataset]);
  
  return { dataset, setDataset };
};

interface IDatasetDetailVMContext {
  dataset: Dataset | undefined;
  setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
}

export const DatasetDetailVMContext = createContext<IDatasetDetailVMContext>(
  {} as IDatasetDetailVMContext
);

export default DatasetDetailVM;
