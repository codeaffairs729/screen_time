import Link from "next/link";
import MetaRating from "components/UI/metaRating";
import DatasetAction from "components/UI/dataset_action";
import { Data } from ".";
import { useRouter } from "next/router";

const CardHead = ({
    href = "",
    data,
    onFavourite,
    handleBookmark,
    handleShare,
    handleFAQClick,
}: {
    href: string;
    data: Data;
    onFavourite: Function;
    handleBookmark: Function;
    handleShare: Function;
    handleFAQClick?: Function;
}) => {
    const { title, dataQuality, buttonTags /*favourite, bookmark*/ } = data;
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
            <DatasetAction
                dataset={data}
                onFavourite={onFavourite}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
            />
        </div>
    );
};

export default CardHead;