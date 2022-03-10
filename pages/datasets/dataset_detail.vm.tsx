import Http from "common/http";
import Dataset from "models/dataset.model";
import { createContext, useEffect } from "react";
import useSWR from "swr";

const DatasetDetailVM = (dataset: Dataset | undefined) => {
  useEffect(() => {
    if (dataset) {
      Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
    }
  }, [dataset]);

  return { dataset };
};

export const DatasetDetailVMContext = createContext<{
  dataset: Dataset | undefined;
}>({ dataset: undefined });

export default DatasetDetailVM;
