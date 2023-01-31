import { createContext, useContext, useEffect, useState } from "react";
import {
    ContentState,
    convertFromHTML,
    EditorState,
    convertToRaw,
} from "draft-js";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { convertToHTML } from "draft-convert";
import jsPDF from "jspdf";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";

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
        ? `<strong>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${formatDate(
              fromDate
          )}</strong><br/>`
        : `<strong>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${formatDate(
              fromDate
          )}</strong> - <strong>${formatDate(toDate)}</strong><br/>`;
};
// const getReportTitle = () =>{
//     return `\t\t\t\t\tDataset Insights Report<br/>`
// }
const getImageCanvas = (src: any) =>
    `<figure><img src="${src}"/></figure></br>`;

const formatSubHeading = (text: string) =>
    `<I>&emsp;&emsp; ${text}</I><br/><br/>`;

const headerSelected = (
    selected: Array<Object>,
    byTimeImageData: any,
    imagePie: any
) =>
    selected
        .map((object: any, index: any) =>
            object === "Download metrics"
                ? `
                <br/><strong id=label_${index}>&#09${object}</strong><br/></br>
                ${formatSubHeading("Region")}
                ${formatSubHeading("Time")}
                ${getImageCanvas(byTimeImageData)}
                ${formatSubHeading("Use case")}
                ${getImageCanvas(imagePie)}
                <p>...</p>`
                : `<br/><strong id=label_${index}>&#09${object}</strong><br/>`
        )
        .join("");

const ReportVM = () => {
    const { organisation } = useContext(OrganisationDetailVMContext);
    const [downloadRef, setDownloadRef] = useState<any>();
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [activeHeaders, setActiveHeaders] = useState<Header[]>(HEADER);
    const [editorState, onEditorStateChange] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [previewContent, setPreviewContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    useEffect(() => {
        setPreviewContent(formatPreviewData());
    }, [editorState]);

    // useEffect(() => {
    //     fetchApiFirst();
    //     fetchApiSecond();
    // }, [fromDate, toDate]);

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

    const generateReportContent = async (
        imgUrl: string,
        fromDate: Date,
        toDate: Date
    ) => {
        const metricByTime: any = document.getElementById("screenshot");
        const metricByUseCase: any = document.getElementById("pie");

        const byTimeCanvas = (await html2canvas(metricByTime)).toDataURL(
            "image/png"
        );
        const byUseCaseCanvas = (await html2canvas(metricByUseCase)).toDataURL(
            "image/png"
        );

        const data = `
                <figure style='width: 200px;margin-left: auto;margin-right: auto;'><img src='${imgUrl}' /></figure>
                .<br/>
                ${getReportDate(fromDate, toDate)}
                ${headerSelected(
                    selectedHeaders,
                    byTimeCanvas,
                    byUseCaseCanvas
                )}
            `;

        onEditorStateChange(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(`<p>${data}</p>`).contentBlocks
                )
            )
        );
        setLoading(false);
    };

    const formatPreviewData = () => {
        // console.log("Editor state",convertToHTML(editorState.getCurrentContent()).toString())
        let html = convertToHTML(editorState.getCurrentContent()).toString();
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
        execute: executeFetchApiFirst,
        data: dataApiFirst,
        isLoading: isFetchApiFirst,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchApiFirst = () =>
        executeFetchApiFirst(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/first/?from=${format(
                        fromDate,
                        "dd-MM-yyyy"
                    )}&to=${format(toDate, "dd-MM-yyyy")}`
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
        execute: executeFetchApiSecond,
        data: dataApiSecond,
        isLoading: isFetchApiSecond,
    } = useHttpCall<{ [key: string]: any }>({});

    const fetchApiSecond = () =>
        executeFetchApiSecond(
            () => {
                return Http.get(
                    `/v1/data_sources/${organisation?.uuid}/?from=${format(
                        fromDate,
                        "dd-MM-yyyy"
                    )}&to=${format(toDate, "dd-MM-yyyy")}`
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
        setLoading,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        isFetchApiFirst,
        isFetchApiSecond,

    };
};

export default ReportVM;

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
    setToDate: Function;
    fetchApiFirst: Function;
}

export const ReportVMContext = createContext<IReportVMContext>(
    {} as IReportVMContext
);
