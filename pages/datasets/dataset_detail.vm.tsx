import Dataset from "models/dataset.model";
import Http from "common/http";
import { useHttpCall } from "common/hooks";
import toast from "react-hot-toast";
import {
    createContext,
    SetStateAction,
    useEffect,
    useState,
    Dispatch,
    useContext,
} from "react";
import { format } from "date-fns";
import { datasetToResultCardData, SearchVMContext } from "pages/search/search.vm";

export const formatLabel = (label: string) => {
    const res = label.replaceAll("_", " ");
    return `${res[0].toUpperCase()}${res.slice(1)}`;
};

export const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};

export enum download {
    by_region,
    by_time,
    by_role,
}

export interface SearchTermType {
    title: string;
    count: number;
    lastUsed: Date;
}

export type DownloadByTime = {
    date: Date;
    count: number;
};

export enum insightTabIndex {
    data_quality,
    use_cases,
    download_metrics,
}
export enum qualityInsights {
    data_file,
    metadata_quality,
}
const DatasetDetailVM = (initialDataset: Dataset | undefined) => {
    const [dataset, setDataset] = useState(initialDataset);
    const [headDataset , setHeadDataset] = useState<any>();
    const [selectedSearchTerm, setSelectedSearchTerm] = useState<number>(10);
    const [selectedDownload, setSelectedDownload] = useState<number>(0);
    const [selectedQualityInsights, setSelectedQualityInsights] =
        useState<number>(0);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [downloadMetrics, setDownloadMetrics] = useState<any>();

    useEffect(() => {
        // if (dataset?.id) {
        //     Http.post(`/v1/datasets/${dataset.id}/views`); // Increment view count on visiting dataset detail page
        // }
    }, [dataset?.id]);
    useEffect(() => {
        fetchSearchTerms();
    }, [selectedSearchTerm]);
    useEffect(() => {
        // console.log('dataset vm', dataset);
    }, [dataset]);
    useEffect(() => {
        fetchDatasetMetricsByTime();
    }, [fromDate, toDate]);
    const {
        execute: excutefetchDatasetMetrics,
        data: datasetMetrics,
        isLoading: isFetchingDatasetMetrics,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchDatasetMetrics = () =>
        excutefetchDatasetMetrics(
            () => {
                return Http.get(
                    `/v1/metrics/get_dataset_metrics/${dataset?.id}`
                );
            },
            {
                postProcess: (res) => {
                    setDownloadMetrics(jsonToOrgDownloadMetrics(res))
                    return [];
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation datasets."
                    );
                },
            }
        );
        const {
            execute: excutefetchDatasetMetricsByTime,
            data: datasetMetricsByTime,
            isLoading: isFetchingDatasetMetricsByTime,
        } = useHttpCall<{ [key: string]: any }>({});
    
        const fetchDatasetMetricsByTime = () =>
            excutefetchDatasetMetricsByTime(
                () => {
                    return Http.get(
                        `/v1/metrics/dataset/${dataset?.id
                        }/by_time?from_date=${format(
                            fromDate,
                            "yyyy-MM-dd"
                        )}&to_date=${format(toDate, "yyyy-MM-dd")}`
                    );
                },
                {
                    postProcess: (res) => {
                        setDownloadMetrics({
                            ...downloadMetrics,
                            downloadByTime: jsonToOrgDownloadMetricByTime(res),
                        });
                        return [];
                    },
                    onError: (e) => {
                        toast.error(
                            "Something went wrong while fetching organisation datasets."
                        );
                    },
                }
            );
            const {
                execute: excutefetchDatasetMetricsByRole,
                data: datasetMetricsByRole,
                isLoading: isFetchingDatasetMetricsByRole,
            } = useHttpCall<{ [key: string]: any }>({});
        
            const fetchDatasetMetricsByRole = () =>
                excutefetchDatasetMetricsByRole(
                    () => {
                        return Http.get(
                            `/v1/metrics/dataset/${dataset?.id}/by_role`
                        );
                    },
                    {
                        postProcess: (res) => {
                            return jsonToSearchTerms(res);
                        },
                        onError: (e) => {
                            toast.error(
                                "Something went wrong while fetching organisation datasets."
                            );
                        },
                    }
                );
                const {
                    execute: excutefetchDatasetMetricsByLocation,
                    data: datasetMetricsByLocation,
                    isLoading: isFetchingDatasetMetricsByLocation,
                } = useHttpCall<{ [key: string]: any }>({});
            
                const fetchDatasetMetricsByLocation = () =>
                    excutefetchDatasetMetricsByLocation(
                        () => {
                            return Http.get(
                                `/v1/metrics/dataset/${dataset?.id}/by_location`
                            );
                        },
                        {
                            postProcess: (res) => {
                                return res;
                            },
                            onError: (e) => {
                                toast.error(
                                    "Something went wrong while fetching organisation datasets."
                                );
                            },
                        }
                    );
                    const {
                        execute: excutefetchSearchTerms,
                        data: SearchTerms,
                        isLoading: isFetchingSearchTerms,
                    } = useHttpCall<{ [key: string]: any }>({});
                
                    const fetchSearchTerms = () =>
                        excutefetchSearchTerms(
                            () => {
                                return Http.get(
                                    `/v1/metrics/dataset/${dataset?.id}/${selectedSearchTerm}`
                                );
                            },
                            {
                                postProcess: (res) => {
                                    return res;
                                },
                                onError: (e) => {
                                    toast.error(
                                        "Something went wrong while fetching organisation datasets."
                                    );
                                },
                            }
                        );
                        const {
                            execute: excuteFetchQualityMetrics,
                            data: qualityMetrics,
                            isLoading: isFetchingQualityMetrics,
                        } = useHttpCall<{ [key: string]: any }>({});
                        const fetchQualityMetrics = () =>
                            excuteFetchQualityMetrics(
                                () => {
                                    return Http.get(
                                        `/v1/datasets/quality_metric/${dataset?.id}`
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
        dataset,
        datasetMetrics,
        datasetMetricsByTime,
        selectedDownload,
        selectedQualityInsights,
        datasetMetricsByRole,
        datasetMetricsByLocation,
        SearchTerms,
        downloadMetrics,
        selectedSearchTerm,
        toDate,
        fromDate,
        qualityMetrics,
        isFetchingQualityMetrics,
        headDataset,
        setHeadDataset,
        setDataset,
        setSelectedDownload,
        fetchDatasetMetrics,
        fetchDatasetMetricsByTime,
        fetchDatasetMetricsByRole,
        fetchDatasetMetricsByLocation,
        fetchSearchTerms,
        setSelectedSearchTerm,
        setSelectedQualityInsights,
        setFromDate,
        setToDate,
        fetchQualityMetrics,
    };
};

interface IDatasetDetailVMContext {
    dataset: Dataset | undefined;
    datasetMetrics: any;
    datasetMetricsByTime: any;
    datasetMetricsByRole: any;
    datasetMetricsByLocation: any;
    downloadMetrics:any;
    SearchTerms:any;
    selectedDownload: number;
    setSelectedDownload: Function;
    selectedQualityInsights: number;
    setSelectedQualityInsights: Function;
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    setToDate: Function;
    fetchDatasetMetrics:Function;
    fetchDatasetMetricsByTime: Function;
    fetchDatasetMetricsByLocation: Function;
    fetchDatasetMetricsByRole: Function;
    fetchSearchTerms: Function;
    fetchQualityMetrics: Function;
    qualityMetrics:any;
    isFetchingQualityMetrics: any;
    headDataset: any;
    setHeadDataset: Function;
    setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
}
const jsonToSearchTerms = (json: any): SearchTermType[] =>
    json.map((term: any) => {
        return {
            title: term["title"],
            count: term["count"],
            lastUsed: term["created_at"],
        };
    });
const jsonToOrgDownloadMetricByTime = (json: any): any =>
    json?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    }));
const jsonToOrgDownloadMetrics = (json: any): any => ({
    regions: json["downloads_by_location"]?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
    })),
        count: region["count"],
        date: region["date"],
    })),
    downloadByTime: json["downloads_by_time"]?.map((data: any) => ({
        date: data["date"],
        count: data["count"],
    })),
    downloadByUseCase: json["downloads_by_role"]?.map(
                (useCase: any) => ({
                    name: useCase["name"],
                    value: useCase["count"],
                })
            )
});

const jsonToQualityMetrics = (json: any): any => ({
    metaDataQuality: {
        overallScore:getmetaQualityScore(json ['metadata_quality']['overall_score'],"overallScore"),
        findability:getmetaQualityScore(json ['metadata_quality']['findability'],'findability') ,
        reusability:getmetaQualityScore(json ['metadata_quality']['reusability'],'reusability'),
        accessibility:getmetaQualityScore(json ['metadata_quality']['accessibility'],"accessibility"),
        contextuality:getmetaQualityScore(json ['metadata_quality']['contextuality'],'contextuality'),
        interoperability:getmetaQualityScore(json ['metadata_quality']['interoperability'],'interoperability'),
    },
    dataFileQuality:{
        overallScore: getdataQualityScore(json ['datafile_quality']['overall_score'],"overallScore", "votes", 132 ),
        feedbackSentiment: getdataQualityScore( json ['datafile_quality']['feedback_sentiment'],"feedback Sentiment" , "comments", 132),
        accuracy: getdataQualityScore(json ['datafile_quality']['accuracy'],"accuracy", "votes", 132  ),
        clarity:getdataQualityScore(json ['datafile_quality']['clarity'],"clarity", "votes", 132 ),
        consistency: getdataQualityScore(json ['datafile_quality']['consistency'],"consistency", "votes", 132 ),
        readiness: getdataQualityScore(json ['datafile_quality']['readiness'],"readiness", "votes", 132 )
    }
});


const getmetaQualityScore =(data:any, title:string) =>({
    label: title,
    rating: data.rating,
});
const getdataQualityScore =(data:any, title:string, ratingLabel:string , total:number) =>({
    label: title,
    rating: data.rating,
    ratingLabel: ratingLabel,
    total: total,
});
export const DatasetDetailVMContext = createContext<IDatasetDetailVMContext>(
    {} as IDatasetDetailVMContext
);

const setUpdatedDatasets = () =>{
        
}

export default DatasetDetailVM;
