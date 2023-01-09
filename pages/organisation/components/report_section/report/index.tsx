import { useState } from "react";
import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});

const Report = () => {
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <Head edit={edit} setEdit={setEdit} />
            {edit ? <EditReport /> : <Preview />}
        </div>
    );
};

export default Report;
