import Dataset from "models/dataset.model";
import { createContext } from "react";
import useSWR from "swr";

const DatasetDetailVM = (dataset: Dataset | undefined) => {
  return { dataset };
};

export const DatasetDetailVMContext = createContext<{
  dataset: Dataset | undefined;
}>({ dataset: undefined });

export default DatasetDetailVM;
