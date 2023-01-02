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
        buttonTags,
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
                <Link href={href}>
                    <a className="font-medium font-roboto text-md my-3 text-dtech-main-dark text-[17px] ml-[-8px] cursor-pointer">
                        {title}
                    </a>
                </Link>
                <MetaRating
                    dataQuality={dataQuality}
                    displayContext={"displayContext"}
                    labelClass="font-normal"
                    handleFAQClick={() => {
                        handleFAQClick
                            ? handleFAQClick()
                            : router.push({
                                  pathname: `/faq`,
                              });
                    }}
                />
                {buttonTags.map((tag: string, index: number) => (
                    <button
                        key={index}
                        className="ml-8 text-m h-6 px-4 border cursor-pointer rounded border-[#5F5F63]"
                    >
                        <span className="my-auto">{`${tag[0].toUpperCase()}${tag.slice(
                            1
                        )}`}</span>
                    </button>
                ))}
            </div>
            <ResultCardAction data={data} setData={setData} />
        </div>
    );
};

export default CardHead;
