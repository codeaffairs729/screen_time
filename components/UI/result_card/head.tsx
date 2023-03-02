import Link from "next/link";
import MetaRating from "components/UI/metaRating";
import ResultCardAction from "components/UI/result_card_action";
import { Data } from ".";
import { useRouter } from "next/router";

const CardHead = ({
    data,
    setData,
    handleFAQClick,
}: {
    data: Data;
    setData: Function;
    handleFAQClick?: Function;
}) => {
    const {
        title,
        dataQuality,
        licenseTypes,
        recordType /*favourite, bookmark*/,
    } = data;
    const href = `/${recordType ? recordType : "datasets"}/${data.id}`;
    const router = useRouter();

    return (
        <div className="flex items-center justify-between w-full p-[10px]">
            <div className="flex items-center">
                {/* {dataset.featured && (
                    <span className="border border-1 bg-dtech-notification-alert-secondary text-sm px-1 h-6 text-white mr-4 ml-[-12px] rounded-md  ">
                        Featured
                    </span>
                )} */}
                {/* <Link href={href}> */}
                    <a href={href} className="font-medium font-roboto text-md my-3 text-dtech-main-dark text-[17px] ml-[-8px] cursor-pointer hover:underline underline-offset-4">
                        {title}
                    </a>
                {/* </Link> */}
                <MetaRating
                    dataQuality={Math.round(dataQuality)}
                    displayContext={"displayContext"}
                    labelClass="font-normal"
                    title={
                        "Estimated based on the EU Metadata Quality Assessment method https://data.europa.eu/mqa/methodology?locale=en"
                    }
                    handleFAQClick={() => {
                        handleFAQClick
                            ? handleFAQClick()
                            : router.push({
                                  pathname: `/faq`,
                              });
                    }}
                />
                {licenseTypes?.map((tag: string, index: number) => (
                    // <button
                    //     key={index}
                    //     className="ml-8 text-m h-6 px-4 border cursor-default rounded border-[#5F5F63]"
                    // >
                    //     <span className="my-auto"></span>
                    // </button>
                       <fieldset className=" min-h-full px-4 border rounded border-[#5F5F63]  text-xs pb-0.5" key={index}>
                       <legend className="text-xs mr-8">Licence</legend>
                       <div>
                           <label>{`${tag[0].toUpperCase()}${tag.slice(
                            1
                        )}`}</label>
                       </div>
                   </fieldset>
                ))}
            </div>
            <ResultCardAction data={data} setData={setData} href={href} />
        </div>
    );
};

export default CardHead;
