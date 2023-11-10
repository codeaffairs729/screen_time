import { Tab } from "@headlessui/react";
import { PreviewData, XLSPreviewData } from "../data_file_preview.vm";
import { ReactNode } from "react";
import clsx from "clsx";
import DataFilePreview from "./components/data_file_preview";

const XLSDataFilePreview = ({ data }: { data: XLSPreviewData }) => {
    return (
        <>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-dtech-light-grey2 p-1">
                    {data.sheets.map((sheetName, i) => (
                        <SheetTab key={i}>{sheetName}</SheetTab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {data.sheet_data.map((sheetData, i) => (
                        <SheetPanel key={i} data={sheetData} />
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};

const SheetTab = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "w-full rounded-lg p-2.5 text-sm font-medium leading-5 uppercase ",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                        ? "bg-dtech-new-main-light text-white"
                        : "text-dtech-dark-grey2 hover:bg-dtech-new-main-light hover:text-white"
                )
            }
        >
            {children}
        </Tab>
    );
};

const SheetPanel = ({ data }: { data: PreviewData }) => {
    return (
        <Tab.Panel>
            <DataFilePreview data={data} />
        </Tab.Panel>
    );
};

export default XLSDataFilePreview;
