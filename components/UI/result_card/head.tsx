import Link from "next/link";
import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import { Data } from ".";
import { useRouter } from "next/router";
import LabelledRow from "components/dataset/labelled_row";

const CardHead = ({
    data,
    setData,
    handleFAQClick,
    datasetSource,
}: {
    data: Data;
    setData: Function;
    handleFAQClick?: Function;
    datasetSource: string | undefined;
}) => {
    const {
        title,
        dataQuality,
        licenseTypes,
        lastUpdate,
        recordType /*favourite, bookmark*/,
    } = data;
    const href = `/${recordType ? recordType : "datasets"}/${data.id}`;
    const router = useRouter();

    return (
        <div className="flex justify-between">
            <div className="lg:flex flex-col w-full mb-3">
                <div>
                    <Link href={href}>
                        <a className="font-medium font-roboto text-md my-3 text-dtech-new-main-light text-[17px] cursor-pointer hover:underline underline-offset-4">
                            {title}
                        </a>
                    </Link>
                </div>
                <div className=" my-3 flex flex-col md:flex-row justify-between bg-[#EBEBEB] px-1.5 py-3">
                    <MetaRating
                        dataQuality={dataQuality}
                        displayContext={"displayContext"}
                        labelClass="font-normal"
                        className="!flex-row items-center !font-medium !text-lg"
                        infoClassName="!text-dtech-new-main-light top-0 m-[1px] !ml-[5px]"
                        starClassName="!text-dtech-new-main-light"
                        title={
                            "Estimated based on the European Commission's Metadata Quality Assessment method."
                        }
                        handleFAQClick={() => {
                            handleFAQClick
                                ? handleFAQClick()
                                : router.push({
                                      pathname: `/faq`,
                                  });
                        }}
                    />

                    {lastUpdate?.isValid && (
                        // <div className="flex my-1.5">
                        //     <span className="text-sm mr-1">Updated</span>
                        //     <span className="text-sm font-medium">
                        //         {lastUpdate.toRelative()}
                        //     </span>
                        // </div>
                        <LabelledRow
                            className="mr-10"
                            label="Last updated"
                            labelClasses="!text-sm mr-1"
                        >
                            <span className="text-sm">
                                {lastUpdate.toRelative()}
                            </span>
                        </LabelledRow>
                    )}
                </div>
            </div>

            {/* {licenseTypes?.map((tag: string, index: number) => (
                    // <button
                    //     key={index}
                    //     className="ml-8 text-m h-6 px-4 border cursor-default rounded border-[#5F5F63]"
                    // >
                    //     <span className="my-auto"></span>
                    // </button>
                    <fieldset
                        className="px-4 border rounded border-[#5F5F63] text-xs pb-0.5 my-2 mr-4"
                        key={index}
                    >
                        <legend className="text-xs mr-8">Licence</legend>
                        <div>
                            <label>{`${tag?.[0].toUpperCase() ?? "-"}${tag?.slice(1) ?? ""
                                }`}</label>
                        </div>
                    </fieldset>
                ))} */}
            {/* <div className="sm:flex items-center">
                <ResultCardAction data={{ ...data, url: datasetSource }} setData={setData} href={href} />
            </div> */}
        </div>
    );
};

export default CardHead;
