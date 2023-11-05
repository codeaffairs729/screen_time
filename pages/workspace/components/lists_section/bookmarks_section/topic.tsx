import ResultCard from "components/UI/result_card";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { DateTime } from "luxon";
import { topicToResultCardData } from "pages/search/topics/topics.vm";


const TopicBookmarksSection = ({ topicIDS }: { topicIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );
    const topics = bookmarkItemsData?.topics?.filter(
        (topic: any) => topicIDS.includes(String(topic.id))
        );

    return (
        <div>
            {topicToResultCardData(topics).map((topic: any) => (
                <ResultCard
                    key={topic.id}
                    data={{
                        ...topic,
                        recordType: "topic",
                        lastUpdate: DateTime.fromISO(
                            new Date("12-25-2022").toISOString()
                        ),
                    }}
                    // hideResultCard={true}
                    className=" md:!pr-0 !py-0 !border-r-0 !rounded-lg !bg-white !shadow-md !p-4"
                    showToolTip={true}
                    pageName="workspace"
                    label="topic"
                />
            ))}

        </div>
    );

    return null;
};

export default TopicBookmarksSection;
