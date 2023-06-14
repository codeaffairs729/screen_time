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
type Header = {
    label: string;
    isChecked: boolean;
};

const HEADER: Header[] = [
    { label: "Dataset quality", isChecked: false },
    { label: "Search terms used", isChecked: false },
    { label: "Download metrics", isChecked: false },
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
    `${date.toLocaleString("default", {
        month: "short",
    })}&#44&nbsp;${date.getDate()}&nbsp;${date.getFullYear()}`;

const getReportDate = (fromDate: Date, toDate: Date) => {
    return format(fromDate, "dd-MM-yyyy") === format(toDate, "dd-MM-yyyy")
        ? `<h6><strong style="padding-left: 100px;">${formatDate(
              fromDate
          )}</strong></h6><br/>`
        : `<h6><strong>${formatDate(fromDate)}</strong> - <strong>${formatDate(
              toDate
          )}</strong></h6><br/>`;
};
const getReportTitle = (title: any) => {
    return `<h1><strong>Dataset Insights Report</strong></h1><br/><h2><strong>${title}</strong></h2><br/>`;
};
const getImageCanvas = (src: any) =>
    `<figure><img src="${src}"/></figure></br>`;

const formatSubHeading = (text: string) => `<h4> ${text}</h4><br/><br/>`;

const headerSelected = (
    selected: Array<Object>,
    byTimeImageData: any,
    imagePie: any,
    mapRegion: any,
    qualityMetric: any,
    bySearchTermsCanvas: any
) => {
    return selected
        .map((object: any, index: any) =>
            object === "Download metrics"
                ? `
                <br/><h5><strong id=label_${index}>&#09${object}</strong></h5><br/></br>
                ${formatSubHeading("Downloads by region")}
                ${
                    mapRegion
                        ? getImageCanvas(mapRegion)
                        : "<h3>No Data Presents for Location.</h3><br/><br/>"
                }
                ${formatSubHeading("Downloads by time")}
                ${
                    byTimeImageData
                        ? getImageCanvas(byTimeImageData)
                        : "<h3>No Data Presents for Time.</h3><br/><br/>"
                }
                ${formatSubHeading("Downloads by role")}
                ${
                    imagePie
                        ? getImageCanvas(imagePie)
                        : "<h3>No Data Presents for Role.</h3> <br/>"
                }
                <p>...</p>`
                : object === "Dataset quality"
                ? `<br/><h5><strong id=label_${index}>${object}</strong></h5><br/>
                ${
                    qualityMetric
                        ? getImageCanvas(qualityMetric)
                        : `<h3>No Data Presents for ${object}.</h3> <br/>`
                }
                `
                : `<br/><h5><strong id=label_${index}>${object}</strong></h5><br/>
                ${
                    bySearchTermsCanvas
                        ? getImageCanvas(bySearchTermsCanvas)
                        : `<h3>No Data Presents for ${object}.</h3> <br/>`
                }
                `
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
    const { organisation } = useContext(OrganisationDetailVMContext);
    const { imgUrl } = organisation || {};
    const [downloadRef, setDownloadRef] = useState<any>();
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [activeHeaders, setActiveHeaders] = useState<Header[]>(HEADER);
    const [editorState, onEditorStateChange] = useState<EditorState>(
        EditorState.createEmpty()
    );
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
        const searchTerms: any = document.getElementById("searchTerms");
        const qualityMetric: any = document.getElementById("qualityMetrics");

        const byQualityMetricCanvas =
            qualityMetric &&
            (await html2canvas(qualityMetric)).toDataURL("image/png");
        const bySearchTermsCanvas =
            metricByLocation &&
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
        const base64 = await fetchImage(imgUrl);
        const data = `
                <figure style='width:200px;margin-left:auto;margin-right:auto;'><img src='data:image/jpeg;base64,${base64}' /></figure>
                <br/>
                ${getReportTitle(organisation?.title)}
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byUseCaseCanvas,
                    byLocationCanvas,
                    byQualityMetricCanvas,
                    bySearchTermsCanvas
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
                    `/v1/metrics/provider/${organisation?.uuid}/by_time?from_date=${from}&to_date=${to}`
                );
            },
            {
                postProcess: (res: any) => {
                    return res;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while fetching organisation metrics by Time."
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

        Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
            () => {
                generateReportContent(qualityMetrics);
            }
        );
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
        isFetchingByLocation;

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
    };
};

export default ReportVM;

export const getDateRange = (fromDate: any, toDate: any, dates: any) => {
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
}

export const ReportVMContext = createContext<IReportVMContext>(
    {} as IReportVMContext
);
