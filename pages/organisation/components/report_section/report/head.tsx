import Image from "next/image";
import downloadIcon from "public/images/icons/download.svg";
import DownloadReport from "./downloadReport";

const Head = ({
    edit,
    setEdit,
    handleCancel,
    id,
}: {
    edit: boolean;
    setEdit: Function;
    handleCancel: Function;
    id: string;
}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="relative flex text-center w-32 justify-between">
                <div
                    className={`${
                        edit
                            ? "text-dtech-dark-grey"
                            : "border-b-2 border-b-dtech-main-dark text-dtech-main-dark"
                    } pb-2 w-12 cursor-pointer`}
                    onClick={() => handleCancel()}
                >
                    Preview
                </div>
                <div
                    className={`${
                        edit
                            ? "text-dtech-main-dark border-b-2 border-b-dtech-main-dark"
                            : "text-dtech-dark-grey"
                    } pb-2 w-12 ml-3 cursor-pointer`}
                    onClick={() => setEdit(true)}
                >
                    Edit
                </div>
            </div>
            {!edit && <DownloadReport id={id} />}
        </div>
    );
};

export default Head;
