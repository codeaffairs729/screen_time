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
        error,
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
        error,
        qualityMetrics,
        selectedQualityInsights,
        isFetchingQualityMetrics,
        fetchQualityMetrics,
        setSelectedQualityInsights,
    };
};

export default QualityMetricVM;

interface IQualityMetricVM {
    error: any;
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
            json["data_file_quality"]["overall"],
            "overallScore",
            "Average of all dimensions listed."
        ),
        accuracy: getQualityScore(
            json["data_file_quality"]["accuracy"],
            "accuracy",
            "Is the information (headers, acronyms, abbreviations) clear (less ambiguous) and legible?"
        ),
        consistency: getQualityScore(
            json["data_file_quality"]["consistency"],
            "consistency",
            "Do the values and headers have consistent formats (e.g. date formats), granularity (e.g spatiotemporal resolution), ? Does the same information match across multiple instances?"
        ),
        clarity: getQualityScore(
            json["data_file_quality"]["clarity"],
            "clarity",
            "Is the information (e.g. values, content) error-free and correct?"
        ),
        readiness: getQualityScore(
            json["data_file_quality"]["readiness"],
            "readiness",
            "Does the file need minimal preprocessing (e.g. missing value imputation, outlier removal) before any sensible use?"
        ),
    },
    metaFileQuality: {
        overallScore: getQualityScore(
            json["meta_file_quality"]["overall"],
            "overallScore",
            "Average of all dimensions listed."
        ),
        findability: getQualityScore(
            json["meta_file_quality"]["findability"],
            "findability",
            "Does this dataset contain metadata that enables its findability for humans and computers?"
        ),
        accessibility: getQualityScore(
            json["meta_file_quality"]["accessibility"],
            "accessibility",
            "Are the dataset and data file download URLs available and working?"
        ),
        reusability: getQualityScore(
            json["meta_file_quality"]["reusability"],
            "reusability",
            "How well-described is this dataset so it can be replicated and/or combined in different settings, to help optimise its reuse?"
        ),
        contextuality: getQualityScore(
            json["meta_file_quality"]["contextuality"],
            "contextuality",
            "Does this dataset have contextual information to aid in deciding if a dataset is fit-for-purpose or not?"
        ),
        interoperability: getQualityScore(
            json["meta_file_quality"]["interoperability"],
            "interoperability",
            "How well can this dataset work in conjunction with applications or workflows for analysis, storage, and processing?"
        ),
    },
});

const getQualityScore = (data: any, title: string, tooltipTitle: string) => ({
    title: title,
    rating: data?.rating,
    tooltipTitle: tooltipTitle,
    datasets: data?.datasets.map((data: any) => getQualityDatasets(data)),
});

const getQualityDatasets = (dataset: any) => ({
    id: dataset["id"],
    title: dataset["title"],
    description: dataset["description"],
    rating: dataset["ratings"],
});
