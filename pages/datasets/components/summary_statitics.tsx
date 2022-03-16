import LabelledRow from "components/dataset/labelled_row";
import { capitalize } from "lodash-es";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
// import LabelledRow from "./1labelled_row";

const SummaryStatistics = () => {
  const vm = useContext(DatasetDetailVMContext);
  const dataset = vm.dataset;
  if (!dataset) return <div />;
  // LIKES start
  const totalLikes = dataset?.detail.likes;
  const totalDislikes = dataset?.detail.dislikes;
  let likePercent = 0;
  if (totalDislikes + totalLikes) {
    likePercent = Number(
      ((totalLikes / (totalDislikes + totalLikes)) * 100).toFixed(0)
    );
  }
  // LIKES end

  return (
    <div className="flex divide-x-2 pt-2">
      <div className="w-full px-3 pt-1">
        <LabelledRow
          className="mb-1.5"
          label="Likes"
          tooltip="Number of users who have liked this dataset / proportion of likes in all user feedback"
        >
          {`${totalLikes} / ${likePercent}%`}
        </LabelledRow>
        <LabelledRow
          className="mb-1.5"
          label="Added to favourites"
          tooltip="Number of users who have added this dataset to their favourites list"
        >
          {dataset.detail.favourites}
        </LabelledRow>
        <LabelledRow
          className="mb-1.5"
          label="Feedback Sentiment"
          tooltip="Feedback Sentiment"
        >
          {capitalize(dataset.detail.sentiment)}
        </LabelledRow>
      </div>
      <div className="w-full px-3 pt-1">
        <LabelledRow
          className="mb-1.5"
          label="Viewed"
          tooltip="Number of times users have looked at the detailed view of this dataset"
        >
          {dataset.detail.views}
        </LabelledRow>
        <LabelledRow
          className="mb-1.5"
          label="Downloaded"
          tooltip="Number of times users have looked at the detailed view of this dataset"
        >
          {dataset.detail.downloads}
        </LabelledRow>
        <LabelledRow
          className="mb-1.5"
          label="Displayed in search results"
          tooltip="Number of times this dataset has been displayed to users in the list view of the search results"
        >
          {dataset.detail.displays}
        </LabelledRow>
      </div>
    </div>
  );
};

export default SummaryStatistics;
