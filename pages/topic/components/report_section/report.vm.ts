import { createContext, useContext, useEffect, useState } from "react";
import {
    ContentState,
    convertFromHTML,
    EditorState,
    convertToRaw,
} from "draft-js";
import html2canvas from "html2canvas";
import { format } from "date-fns";

import jsPDF from "jspdf";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import draftToHtml from "draftjs-to-html";
import { jsonToUseCaseMetrics } from "../insight_section/usecase_section/usecase.vm";

type Header = {
    label: string;
    isChecked: boolean;
};
export type DownloadByTime = {
    date: Date;
    count: number;
};

const HEADER: Header[] = [
    { label: "Dataset Quality", isChecked: false },
    { label: "Search terms used", isChecked: false },
    { label: "Download metrics", isChecked: false },
    { label: "Use Cases", isChecked: false },
];

const A4_WIDTH_MM = 210;
const PAGE_Y_MARGIN = 160;
const PAGE_X_MARGIN = 20;

export const downloadPdf = (
    input: any,
    inputHeightMm: any,
    fileName: string = "download.pdf"
) => {
    html2canvas(input, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf =
            inputHeightMm > A4_WIDTH_MM
                ? new jsPDF("p", "mm", [
                      inputHeightMm + PAGE_Y_MARGIN,
                      A4_WIDTH_MM,
                  ])
                : new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(
            imgData,
            "png",
            10,
            4,
            pdfWidth - PAGE_X_MARGIN,
            pdfHeight
        );
        pdf.save(fileName);
    });
};

const imageTag = (src: string, index: any) => {
    return `<img  style='margin-left: auto;margin-right: auto;${
        index ? "width: 500px;" : "width: 300px;"
    }' src='${src}' />`;
};

const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
    })} ${date.getFullYear()}`;

const getReportDate = (fromDate: Date, toDate: Date) => {
    return format(fromDate, "dd-MM-yyyy") === format(toDate, "dd-MM-yyyy")
        ? `<p><strong style="padding-left: 100px;">${formatDate(
              fromDate
          )}</strong></p>`
        : `<p><strong>${formatDate(fromDate)}</strong> - <strong>${formatDate(
              toDate
          )}</strong></p>`;
};
const getReportTitle = (title: any) => {
    return `<p><strong>Dataset Insights Report</strong></p><p><strong>${title}</strong></p>`;
};
const getImageCanvas = (src: any) =>
    `<img src="${src}"/>`;

const formatSubHeading = (text: string) => `<p> ${text}</p>`;

const headerSelected = (
    selected: Array<Object>,
    byTime: any,
    byUseCase: any,
    byRegion: any,
    byquality: any,
    bySearchTermsCanvas: any,
    byUseCasesCanvas:any
) => {
    return selected
        .map((object: any, index: any) =>
            object === "Download metrics"
                ? `
                <p><strong id=label_${index}>${object}</strong>
                ${formatSubHeading("Downloads by region")}
                ${
                    byRegion
                        ? getImageCanvas(byRegion)
                        : "<h4>No Data Presents for Location.</h4>"
                }
                </p>
                <br/>
                <p>
                ${formatSubHeading("Downloads by time")}
                ${
                    byTime
                        ? getImageCanvas(byTime)
                        : "<h4>No Data Presents for Time.</h4>"
                }
                <p>
                <br/>
                ${formatSubHeading("Downloads by role")}
                ${
                    byUseCase
                        ? getImageCanvas(byUseCase)
                        : "<h4>No Data Presents for Role.</h4> "
                }</p>
                <br/>`
                : object === "Dataset Quality"
                ? `<p><strong id=label_${index}>${object}</strong>
                ${
                    byquality
                        ? getImageCanvas(byquality)
                        : `<h4>No Data Presents for ${object}.</h4> `
                }
                </p>
                <br/>`
                : object == "Use Cases"
                ? `<p><strong id=label_${index}>${object}</strong>
                ${
                    byUseCasesCanvas
                        ? getImageCanvas(byUseCasesCanvas)
                        : `<h4>No Data Presents for ${object}.</h4> `
                }
                </p>
                <br/>`
                : `<p><strong id=label_${index}>${object}</strong>
                ${
                    bySearchTermsCanvas
                        ? getImageCanvas(bySearchTermsCanvas)
                        : `<h4>No Data Presents for ${object}.</h4> `
                }
                </p>
                <br/>`
        )
        .join("");
};

const checkIfDateExists = (downloadDate: any, currDate: any) => {
    const downloadDateString = new Date(downloadDate.date).toDateString();
    const currDateString = new Date(currDate).toDateString();

    return currDateString == downloadDateString;
};

const ReportVM = () => {
    const currentDate = new Date();
    const [toDate, setToDate] = useState(new Date());
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    const [fromDate, setFromDate] = useState(currentDate);
    const [from, setFrom] = useState(format(new Date(), "yyyy-MM-dd"));
    const [to, setTo] = useState(format(new Date(), "yyyy-MM-dd"));
    const { organisation } = useContext(OrganisationDetailVMContext);
    const { imgUrl } = organisation || {};
    const [downloadRef, setDownloadRef] = useState<any>();
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [activeHeaders, setActiveHeaders] = useState<Header[]>(HEADER);
    const [editorState, onEditorStateChange] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [editorValue, setEditorValue] = useState(``);
    const [previewContent, setPreviewContent] = useState("");
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    useEffect(() => {
        setPreviewContent(formatPreviewData());
    }, [editorState]);

    const onHeaderSelect = (e: any) => {
        let updatedActiveHeaders: Header[] = [];
        let selectedHeaderLabels: string[] = [];
        activeHeaders.forEach((header: Header) => {
            const updatedHeader =
                e.target.value == header.label
                    ? { ...header, isChecked: e.target.checked }
                    : header;

            updatedActiveHeaders = [...updatedActiveHeaders, updatedHeader];

            if (updatedHeader.isChecked) {
                selectedHeaderLabels = [
                    ...selectedHeaderLabels,
                    updatedHeader.label,
                ];
            }
        });

        setSelectedHeaders(selectedHeaderLabels);
        setActiveHeaders(updatedActiveHeaders);
    };
    const {
        execute: executeFetchImage,
        data: image,
        isLoading: isFetchingImage,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchImage = (url: any) =>
        executeFetchImage(
            () => {
                return Http.get(
                    `/v1/data_sources/provider/image/?image_url=${url}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation logo."
                    );
                },
            }
        );

    const generateReportContent = async (qualityMetrics: any) => {
        setIsGeneratingReport(true);
        const metricByLocation: any = document.getElementById("map");
        const metricByTime: any = document.getElementById("screenshot");
        const metricByUseCase: any = document.getElementById("pie");
        const useCases: any = document.getElementById("useCases");
        const searchTerms: any = document.getElementById("searchTerms");
        const qualityMetric: any = document.getElementById("qualityMetrics");

        const byQualityMetricCanvas =
            qualityMetric &&
            (await html2canvas(qualityMetric)).toDataURL("image/png");
        const bySearchTermsCanvas =
            searchTerms &&
            (await html2canvas(searchTerms)).toDataURL("image/png");
        const byLocationCanvas =
            metricByLocation &&
            (await html2canvas(metricByLocation)).toDataURL("image/png");
        const byTimeCanvas =
            metricByTime &&
            (await html2canvas(metricByTime)).toDataURL("image/png");
        const byUseCaseCanvas =
            metricByUseCase &&
            (await html2canvas(metricByUseCase)).toDataURL("image/png");
        const byUseCasesCanvas =
            useCases && (await html2canvas(useCases)).toDataURL("image/png");
        const base64 = await fetchImage(imgUrl);
        const data = `
                <figure style='width:200px;margin-left:auto;margin-right:auto;'><img src='data:image/jpeg;base64,${base64}' /></figure>
                
                ${getReportTitle(organisation?.title)}
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byUseCaseCanvas,
                    byLocationCanvas,
                    byQualityMetricCanvas,
                    bySearchTermsCanvas,
                    byUseCasesCanvas
                )}
            `;

        onEditorStateChange(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(`<p>${data}</p>`).contentBlocks
                )
            )
        );
        setIsGeneratingReport(false);
    };


    const generateNewReport = async (qualityMetrics: any) =>{
        setIsGeneratingReport(true);
        const qualityMetric: any = document.getElementById("qualityMetrics");
        const searchTerms: any = document.getElementById("searchTerms");
        const metricesByRegion: any = document.getElementById("map");
        const metricByTime: any = document.getElementById("screenshot");
        const metricByUseCase: any = document.getElementById("pie");
        const useCases: any = document.getElementById("useCases");

        const byQualityMetricCanvas =
            qualityMetric &&
            (await html2canvas(qualityMetric)).toDataURL("image/png");
        const bySearchTermsCanvas =
            searchTerms &&
            (await html2canvas(searchTerms)).toDataURL("image/png");
        const byLocationCanvas =
            metricesByRegion &&
            (await html2canvas(metricesByRegion)).toDataURL("image/png");
        const byTimeCanvas =
            metricByTime &&
            (await html2canvas(metricByTime)).toDataURL("image/png");
        const byUseCaseCanvas =
            metricByUseCase &&
            (await html2canvas(metricByUseCase)).toDataURL("image/png");
        const byUseCasesCanvas =
            useCases && (await html2canvas(useCases)).toDataURL("image/png");

        const data = `
                <p style="text-align: center;"><img src="${imgUrl}" width=200 height=150 style="text-align: center;" /></p>
                <p></p>
                ${getReportTitle(organisation?.title)}
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byUseCaseCanvas,
                    byLocationCanvas,
                    byQualityMetricCanvas,
                    bySearchTermsCanvas,
                    byUseCasesCanvas
                )}
            `;
    
        setEditorValue(data);
        setIsGeneratingReport(false);

    }

    const formatPreviewData = () => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const images = convertToRaw(editorState.getCurrentContent()).entityMap;

        Object.values(images).forEach((image, index) => {
            html = html.replace(
                "<figure>📷</figure>",
                imageTag(image?.data?.src, index)
            );
        });

        return html;
    };

    const {
        execute: executeFetchQualityMetrics,
        data: qualityMetrics,
        isLoading: isFetchingQualityMetrics,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchQualityMetrics = () =>
        executeFetchQualityMetrics(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/quality_metrics`
                );
            },
            {
                postProcess: (res: any) => {
                    return jsonToQualityMetrics(res);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchSearchTerms,
        data: searchTerms,
        isLoading: isFetchingSearchTerms,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchSearchTerms = () =>
        executeFetchSearchTerms(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/10`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchByRoles,
        data: downloadByRole,
        isLoading: isFetchingByRoles,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByRoles = (from: string, to: string) =>
        executeFetchByRoles(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/by_role?from_date=${from}&to_date=${to}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by roles."
                    );
                },
            }
        );

    const {
        execute: executeFetchByTime,
        data: downloadByTime,
        isLoading: isFetchingByTime,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByTime = (from: string, to: string) =>
        executeFetchByTime(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${
                        organisation?.uuid
                    }/by_time?from=${format(
                        fromDate,
                        "yyyy-MM-dd"
                    )}&to=${format(toDate, "yyyy-MM-dd")}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation download metrics."
                    );
                },
            }
        );

    const {
        execute: executeFetchByLocation,
        data: downloadByLocation,
        isLoading: isFetchingByLocation,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchMetricDataByLocation = (from: string, to: string) =>
        executeFetchByLocation(
            () => {
                return Http.get(
                    `/v1/metrics/provider/${organisation?.uuid}/by_location?from_date=${from}&to_date=${to}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by location."
                    );
                },
            }
        );
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
                postProcess: (res) => {
                    const useCase = jsonToUseCaseMetrics(res);
                    return useCase;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation search terms insights."
                    );
                },
            }
        );

    const jsonToQualityMetrics = (json: any): any => {
        return {
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
        };
    };
    const getQualityScore = (
        data: any,
        title: string,
        tooltipTitle: string
    ) => ({
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

    const fetchData = (qualityMetrics: any) => {
        let from: string = format(new Date(), "yyyy-MM-dd");
        let to: string = format(new Date(), "yyyy-MM-dd");

        if (!fromDate && !toDate) {
            const currentDate = new Date();
            to = format(currentDate, "yyyy-MM-dd");
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            from = format(currentDate, "yyyy-MM-dd");
        } else if (fromDate || toDate) {
            from = format(fromDate ? fromDate : toDate, "yyyy-MM-dd");
            to = format(toDate ? toDate : fromDate, "yyyy-MM-dd");
        }

        setFromDate(new Date(from));
        setToDate(new Date(to));
        //Check if option selected
        
        const promise1 = fetchMetricDataByTime(from, to);
        const promise2 = fetchMetricDataByRoles(from, to);
        const promise3 = fetchMetricDataByLocation(from, to);
        const promise4 = fetchSearchTerms();
        const promise5 = fetchQualityMetrics();
        const promise6 = fetchUseCases();

        Promise.all([
            promise1,
            promise2,
            promise3,
            promise4,
            promise5,
            promise6,
        ]).then(() => {
            // generateReportContent(qualityMetrics);
            generateNewReport(qualityMetrics);
        });
    };
    const isFetching =
        isFetchingByTime ||
        isFetchingByRoles ||
        isFetchingByLocation ||
        isFetchingQualityMetrics ||
        isFetchingSearchTerms;
    const loading =
        isGeneratingReport ||
        isFetching ||
        isFetchingQualityMetrics ||
        isFetchingSearchTerms ||
        isFetchingByTime ||
        isFetchingByRoles ||
        isFetchingByLocation ||
        isFetchingUseCases;

    return {
        generateReportContent,
        onEditorStateChange,
        setSelectedHeaders,
        setActiveHeaders,
        setDownloadRef,
        onHeaderSelect,
        selectedHeaders,
        activeHeaders,
        editorState,
        downloadRef,
        previewContent,
        loading,
        fromDate,
        setFromDate,
        toDate,
        fetchData,
        setToDate,
        downloadByTime,
        downloadByRole,
        downloadByLocation,
        searchTerms,
        qualityMetrics,
        useCases,
        editorValue,
        setEditorValue
    };
};

export default ReportVM;

const getDifferenceInDays = (fromDate: any, toDate: any) =>
    (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);

const getDataByMonth = (dates: any) => {
    const tempDate = dates.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date(data?.date).getFullYear();
        return { count: data.count, month: `${month} ${year}` };
    });

    const aggregated = tempDate.reduce((acc: any, curr: any) => {
        const existingMonth = acc.find(
            (monthObj: any) => monthObj.month === curr.month
        );
        if (existingMonth) {
            existingMonth.count += curr.count;
        } else {
            acc.push({
                month: curr.month,
                count: curr.count,
            });
        }
        return acc;
    }, []);
    return aggregated;
};

export const getDateRange = (fromDate: any, toDate: any, dates: any) => {
    const differenceInDays: number = getDifferenceInDays(fromDate, toDate);
    if (differenceInDays >= 90) {
        const lineChartByMonth = getDataByMonth(dates).map((data: any) => ({
            month: data.month,
            download: data.count,
        }));
        return lineChartByMonth;
    } else {
        let datesList: any = [];
        let currentDate = new Date(fromDate);
        while (currentDate <= new Date(toDate)) {
            const downloadDate = dates.filter((downDate: any) =>
                checkIfDateExists(downDate, currentDate)
            )[0];
            const dateToShow = downloadDate
                ? new Date(downloadDate?.date)
                : currentDate;
            datesList.push({
                date: dateToShow.toLocaleString("en", {
                    day: "numeric",
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                }),
                download: downloadDate?.count || 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesList;
    }
};

interface IReportVMContext {
    generateReportContent: any;
    onEditorStateChange: any;
    setSelectedHeaders: Function;
    setActiveHeaders: Function;
    setDownloadRef: Function;
    onHeaderSelect: Function;
    selectedHeaders: string[];
    activeHeaders: Header[];
    editorState: any;
    downloadRef: any;
    previewContent: string;
    loading: Boolean;
    setLoading: Function;
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    fetchData: Function;
    setToDate: Function;
    downloadByTime: any;
    downloadByRole: any;
    downloadByLocation: any;
    searchTerms: any;
    qualityMetrics: any;
    useCases: any;
    editorValue:any;
    setEditorValue: any;
}

export const ReportVMContext = createContext<IReportVMContext>(
    {} as IReportVMContext
);
