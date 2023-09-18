import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export enum QualityInsightsENUM {
    data_file,
    metadata,
}

const QualityMetricsVM = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(1);
    const { dataset } = useContext(DatasetDetailVMContext);
    const {
        error,
        execute: excuteFetchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>({});
    const fetchQualityMetrics = () =>
        excuteFetchQualityMetrics(
            () => {
                return Http.get(`/v1/datasets/quality_metric/${dataset?.id}`);
            },
            {
                postProcess: (res) => {
                    return jsonToQualityMetrics(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation Data Quality insights."
                    );
                },
            }
        );

    return {
        error,
        fetchQualityMetrics,
        qualityMetrics,
        isFetchingQualityMetrics,
        selectedQualityInsights,
        setSelectedQualityInsights,
    };
};

export default QualityMetricsVM;

interface IQualityMetricsVMContext {
    error: any;
    qualityMetrics: any;
    fetchQualityMetrics: Function;
    isFetchingQualityMetrics: any;
    selectedQualityInsights: number;
    setSelectedQualityInsights: Function;
}

export const QualityMetricsVMContext = createContext<IQualityMetricsVMContext>(
    {} as IQualityMetricsVMContext
);

const jsonToQualityMetrics = (json: any): any => ({
    metaDataQuality: {
        overallScore: getmetaQualityScore(
            json["metadata_quality"]["overall"],
            "overallScore",
            "Average of all dimensions listed."
        ),
        findability: getmetaQualityScore(
            json["metadata_quality"]["findability"],
            "findability",
            "Does this dataset contain metadata that enables its findability for humans and computers?"
        ),
        reusability: getmetaQualityScore(
            json["metadata_quality"]["reusability"],
            "reusability",
            "How well-described is this dataset so it can be replicated and/or combined in different settings, to help optimise its reuse?"
        ),
        accessibility: getmetaQualityScore(
            json["metadata_quality"]["accessibility"],
            "accessibility",
            "Are the dataset and data file download URLs available and working?"
        ),
        contextuality: getmetaQualityScore(
            json["metadata_quality"]["contextuality"],
            "contextuality",
            "Does this dataset have contextual information to aid in deciding if a dataset is fit-for-purpose or not?"
        ),
        interoperability: getmetaQualityScore(
            json["metadata_quality"]["interoperability"],
            "interoperability",
            "How well can this dataset work in conjunction with applications or workflows for analysis, storage, and processing?"
        ),
    },
    dataFileQuality: {
        overallScore: getdataQualityScore(
            json["datafile_quality"]["overall"],
            "overallScore",
            "votes",
            json["datafile_quality"]["overall"]["total"],
            "Average of all dimension listed"
        ),
        // feedbackSentiment: getdataQualityScore(
        //     json["datafile_quality"]["feedback_sentiment"],
        //     "feedback Sentiment",
        //     "comments",
        //     132
        // ),
        accuracy: getdataQualityScore(
            json["datafile_quality"]["accuracy"],
            "accuracy",
            "votes",
            json["datafile_quality"]["accuracy"]["total"],
            "Is the information (headers, acronyms, abbreviations) clear (less ambiguous) and legible?"
        ),
        clarity: getdataQualityScore(
            json["datafile_quality"]["clarity"],
            "clarity",
            "votes",
            json["datafile_quality"]["clarity"]["total"],
            "Is the information (e.g. values, content) error-free and correct?"
        ),
        consistency: getdataQualityScore(
            json["datafile_quality"]["consistency"],
            "consistency",
            "votes",
            json["datafile_quality"]["consistency"]["total"],
            "Do the values and headers have consistent formats (e.g. date formats), granularity (e.g spatiotemporal resolution), ? Does the same information match across multiple instances?"
        ),
        readiness: getdataQualityScore(
            json["datafile_quality"]["readiness"],
            "readiness",
            "votes",
            json["datafile_quality"]["readiness"]["total"],
            "Does the file need minimal preprocessing (e.g. missing value imputation, outlier removal) before any sensible use?"
        ),
    },
});

const getmetaQualityScore = (
    data: any,
    title: string,
    tooltipTitle: string
) => ({
    label: title,
    rating: data.rating,
    tooltipTitle: tooltipTitle,
});

const getdataQualityScore = (
    data: any,
    title: string,
    ratingLabel: string,
    total: number,
    tooltipTitle: string
) => ({
    label: title,
    rating: data.rating,
    ratingLabel: ratingLabel,
    total: total,
    tooltipTitle: tooltipTitle,
});
