import BarGraph from "components/UI/BarGraph";
import { format } from "date-fns";
const Preview = ({
    convertedContent,
    imgUrl,
    autoGenerate,
    selected,
    fromDate,
    toDate,
    id,
}: {
    convertedContent: string;
    imgUrl: any;
    autoGenerate: any;
    selected: any;
    fromDate: any;
    toDate: any;
    id: string;
}) => {
    console.log("convertedContent :", convertedContent);

    return (
        <div className="min-w-[700px] h-[656px] shadow-paper-shadow mt-4 w-2/3 bg-[#F8F8F8] border-none p-4 overflow-y-scroll">
            {autoGenerate && (
                <div id={id}>
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src={imgUrl}
                            width={200}
                            height={200}
                            className={""}
                        />
                        <div className="">
                            {format(fromDate, "dd-MM-yyyy") ===
                            format(toDate, "dd-MM-yyyy") ? (
                                <span className="text-lg ml-10">
                                    <span className="font-bold">
                                        {fromDate.toLocaleString("default", {
                                            month: "short",
                                        })}
                                    </span>
                                    <span> {fromDate.getDate()}</span>,
                                    <span>{fromDate.getFullYear()}</span>
                                </span>
                            ) : (
                                <div className="text-lg">
                                    <span className=" pr-4">
                                        <span className="font-bold">
                                            {fromDate.toLocaleString(
                                                "default",
                                                {
                                                    month: "short",
                                                }
                                            )}
                                        </span>
                                        <span> {fromDate.getDate()}</span>,
                                        <span>{fromDate.getFullYear()}</span>
                                    </span>
                                    <span className="">
                                        <span className="font-bold">
                                            {toDate.toLocaleString("default", {
                                                month: "short",
                                            })}
                                        </span>
                                        <span> {toDate.getDate()}</span>,
                                        <span>{toDate.getFullYear()}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className="flex flex-col">
                            {selected.map((object: any, index: any) => (
                                <span className="ml-1 font-bold" key={index}>
                                    {object.isChecked && object.label}
                                </span>
                            ))}
                            <BarGraph
                                data={[
                                    { name: 1, rating: 10 },
                                    { name: 2, rating: 30 },
                                    { name: 3, rating: 20 },
                                    { name: 4, rating: 40 },
                                    { name: 5, rating: 10 },
                                ]}
                                width={400}
                                height={200}
                                strokeWidthAxis={2}
                                strokeWidthLabelList={0}
                                className="font-medium my-2"
                                XleftPadding={20}
                                XrightPadding={30}
                                xLabel=""
                                yLabel=""
                                xvalue=""
                                yvalue=""
                                barDatakey={"rating"}
                                labelListDatakey={"name"}
                            />
                        </div>
                    </div>
                    <div
                        className="editor_preview"
                        dangerouslySetInnerHTML={{
                            __html: convertedContent,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Preview;
