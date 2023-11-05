import { roundRatings } from "components/UI/star_rating";

const Summary = ({
    organisation,
    qualityMetrics,
}: {
    organisation: any;
    qualityMetrics: any;
}) => {
    return (
        <div className=" border-2 border-dtech-light-teal border-opacity-30 p-4 flex flex-col justify-center items-center">
            <div>Summary</div>
            <div className="w-full my-5 p-5 bg-[#D9EFFC]">
                <div className="flex flex-row justify-between items-center my-2">
                    <div className="flex flex-col justify-center items-center">
                        <span>{organisation?.stats.datasetsCount}</span>
                        <span>Datasets</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span>
                            {roundRatings(
                                calculateAverageStars(
                                    qualityMetrics?.metaFileQuality
                                        ?.overallScore?.rating
                                )
                            )}
                            /5
                        </span>
                        <span>Avg metadata quality</span>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center mt-5 my-2 mx-2">
                    <div className="flex flex-col justify-center items-center">
                        <span>{organisation?.stats.favoritesCount}</span>
                        <span>Like</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span>{organisation?.stats.viewCount}</span>
                        <span>views</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span>{organisation?.stats.downloadCount}</span>
                        <span>download</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Summary;

function calculateAverageStars(data: any) {
    const totalStars = data?.reduce((acc: any, obj: any) => {
        const star: any = Object.keys(obj)[0];
        const votes = obj[star];
        return acc + star * votes;
    }, 0);

    const totalVotes = data?.reduce(
        (acc: any, obj: any): any => acc + Object.values(obj)[0],
        0
    );

    if (totalVotes === 0) {
        return 0; // To avoid division by zero
    }

    const value = totalStars / totalVotes;
    if (Number.isNaN(value)) return 0;
    else return value;
}
