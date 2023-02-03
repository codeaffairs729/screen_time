import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export enum qualityInsights {
    data_file,
    metadata,
}

const QualityMetricVM = () => {
    const { organisation } = useContext(OrganisationDetailVMContext);
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const {
        execute: excuteFetchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchQualityMetrics = () =>
        excuteFetchQualityMetrics(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/quality_metrics`
                );
            },
            {
                postProcess: (res) => {
                    return jsonToQualityMetrics(res);
                },
                onError: (e) => {
                    console.log(e);
                    toast.error(
                        "Something went wrong while fetching organisation Data Quality insights."
                    );
                },
            }
        );

    return {
        qualityMetrics,
        selectedQualityInsights,
        isFetchingQualityMetrics,
        fetchQualityMetrics,
        setSelectedQualityInsights,
    };
};

export default QualityMetricVM;

interface IQualityMetricVM {
    selectedQualityInsights: number;
    qualityMetrics: any;
    fetchQualityMetrics: Function;
    setSelectedQualityInsights: Function;
    isFetchingQualityMetrics: boolean;
}

export const QualityMetricVMContext = createContext<IQualityMetricVM>(
    {} as IQualityMetricVM
);

const jsonToQualityMetrics = (json: any): any => ({
    dataFileQuality: {
        overallScore: getQualityScore(
            json["data_file_quality"]["overall_score"],
            "overallScore"
        ),
        accuracy: getQualityScore(
            json["data_file_quality"]["accuracy"],
            "accuracy"
        ),
        consistency: getQualityScore(
            json["data_file_quality"]["consistency"],
            "consistency"
        ),
        clarity: getQualityScore(
            json["data_file_quality"]["clarity"],
            "clarity"
        ),
        readiness: getQualityScore(
            json["data_file_quality"]["readiness"],
            "readiness"
        ),
    },
    metaFileQuality: {
        overallScore: getQualityScore(
            json["meta_file_quality"]["overall_score"],
            "overallScore"
        ),
        findability: getQualityScore(
            json["meta_file_quality"]["findability"],
            "findability"
        ),
        accessibility: getQualityScore(
            json["meta_file_quality"]["accessibility"],
            "accessibility"
        ),
        reusability: getQualityScore(
            json["meta_file_quality"]["reusability"],
            "reusability"
        ),
        contextuality: getQualityScore(
            json["meta_file_quality"]["contextuality"],
            "contextuality"
        ),
        interoperability: getQualityScore(
            json["meta_file_quality"]["interoperability"],
            "interoperability"
        ),
    },
});

const getQualityScore = (data: any, title: string) => ({
    title: title,
    rating: data.rating,
    datasets: data.datasets.map((data: any) => getQualityDatasets(data)),
});

const getQualityDatasets = (dataset: any) => ({
    uuid: dataset["uuid"],
    title: dataset["title"],
    description: dataset["description"],
    rating: dataset["rating"],
});
