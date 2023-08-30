import { useHttpCall } from "common/hooks";
import Http from "common/http";
// import { jsonToUseCaseMetrics } from "pages/datasets/components/insights_section/use_cases/usecase_metric.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// export interface UseCaseType {
//     feedback_id: number,
//     comment_anonymous: boolean,
//     created_at: Date,
//     user_id: number,
//     dataset_id: number,
//     comment: string,
//     updated_at: Date
// }

const UseCaseVm = () => {
    const { organisation } = useContext(OrganisationDetailVMContext);
    const {
        execute: excuteFetchUseCases,
        data: useCases,
        isLoading: isFetchingUseCases,
        error,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchUseCases = () =>
        excuteFetchUseCases(
            () => {
                return Http.get(
                    `/v1/data_sources/provider/use_cases/${organisation?.uuid}`
                );
            },
            {
                postProcess: res => {
                    const useCase = jsonToUseCaseMetrics(res)
                    return useCase;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation search terms insights."
                    );
                },
            }
        );

    return {
        error,
        useCases,
        isFetchingUseCases,
        fetchUseCases,
    };
};

export default UseCaseVm;

interface IUseCaseVMContext {
    error: any;
    useCases: any;
    isFetchingUseCases: boolean;
    fetchUseCases: Function;
}

export const UseCaseVMContext = createContext<IUseCaseVMContext>(
    {} as IUseCaseVMContext
);

// const jsonToUseCases = (json: any): UseCaseType[] =>
//     json.map((term: any) => {
//         return {
//             title: term["title"],
//             count: term["count"],
//             lastUsed: term["created_at"],
//         };
//     });
export const jsonToUseCaseMetrics = (json: any = {}) => {
    return Object.keys(json).map((key) => ({
        category: key,
        value: json[key]["count"],
    }));
};