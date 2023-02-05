import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export enum QualityInsightsENUM {
    data_file,
    metadata_quality,
}

const QualityMetricsVM = () => {
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
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
                    console.log(e);
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
            json["metadata_quality"]["overall_score"],
            "overallScore"
        ),
        findability: getmetaQualityScore(
            json["metadata_quality"]["findability"],
            "findability"
        ),
        reusability: getmetaQualityScore(
            json["metadata_quality"]["reusability"],
            "reusability"
        ),
        accessibility: getmetaQualityScore(
            json["metadata_quality"]["accessibility"],
            "accessibility"
        ),
        contextuality: getmetaQualityScore(
            json["metadata_quality"]["contextuality"],
            "contextuality"
        ),
        interoperability: getmetaQualityScore(
            json["metadata_quality"]["interoperability"],
            "interoperability"
        ),
    },
    dataFileQuality: {
        overallScore: getdataQualityScore(
            json["datafile_quality"]["overall_score"],
            "overallScore",
            "votes",
            132
        ),
        feedbackSentiment: getdataQualityScore(
            json["datafile_quality"]["feedback_sentiment"],
            "feedback Sentiment",
            "comments",
            132
        ),
        accuracy: getdataQualityScore(
            json["datafile_quality"]["accuracy"],
            "accuracy",
            "votes",
            132
        ),
        clarity: getdataQualityScore(
            json["datafile_quality"]["clarity"],
            "clarity",
            "votes",
            132
        ),
        consistency: getdataQualityScore(
            json["datafile_quality"]["consistency"],
            "consistency",
            "votes",
            132
        ),
        readiness: getdataQualityScore(
            json["datafile_quality"]["readiness"],
            "readiness",
            "votes",
            132
        ),
    },
});

const getmetaQualityScore = (data: any, title: string) => ({
    label: title,
    rating: data.rating,
});
const getdataQualityScore = (
    data: any,
    title: string,
    ratingLabel: string,
    total: number
) => ({
    label: title,
    rating: data.rating,
    ratingLabel: ratingLabel,
    total: total,
});
