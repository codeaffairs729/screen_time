import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import DatasetStats from "models/dataset_stats.model";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

class DatasetService {
    // static async getDatasetStats(
    //     datasetIds: Number[],
    //     setIsLoading?: Dispatch<SetStateAction<boolean>>
    // ): Promise<{ [key: string]: DatasetStats }> {
    //     setIsLoading?.(true);
    //     // let res:DatasetStats[]= [];
    //     const o: { [key: string]: DatasetStats } = {};
    //     try {
    //         const res = await Http.post("/v1/datasets/stats", {
    //             meta_dataset_ids: datasetIds,
    //         });
    //         Object.keys(res).map(
    //             (id) =>
    //                 (o[id] = DatasetStats.fromJson({
    //                     ...res[id],
    //                     dataset_id: id,
    //                 }))
    //         );
    //         return o;
    //     } catch (error) {
    //         toast.error(await getHttpErrorMsg(error));
    //     } finally {
    //         setIsLoading?.(false);
    //         return o;
    //     }
    // }
}

export default DatasetService;
