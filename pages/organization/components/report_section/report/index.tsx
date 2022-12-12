import { useState } from "react";
import EditReport from "./editReport";
import Head from "./head";
import Preview from "./preview";

const Report = () => {
    const [edit, setEdit] = useState<boolean>(false);

    const handleCancel = () => {};
    return (
        <div>
            <Head edit={edit} setEdit={setEdit} handleCancel={handleCancel} />
            {edit ? <EditReport /> : <Preview />}
        </div>
    );
};

export default Report;
