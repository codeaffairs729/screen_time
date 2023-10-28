import React from "react";
import { useState, useEffect } from "react";
import RenderTable from "./RenderTable";

const PreviewTable = ({ data, id }) => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        const keys = Object.keys(data);
        const cols = Object.keys(data[keys[0]]);
        setTableData({ data: data, rows: keys, columns: cols });
    }, [data]);

    return (
        <div>{tableData && <RenderTable tableData={tableData} id={id} />}</div>
    );
};

export default PreviewTable;
