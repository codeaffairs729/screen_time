import { useState } from "react";
import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});

const DOWNLOAD_ID = "report_download";

const Report = () => {
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <Head edit={edit} setEdit={setEdit} id={DOWNLOAD_ID} />
            {edit ? <EditReport /> : <Preview id={DOWNLOAD_ID} />}
        </div>
    );
};

export default Report;
