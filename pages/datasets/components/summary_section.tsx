import { capitalize } from "lodash-es";
import DatasetDownload from "./dataset_download";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import PrimaryBtn from "components/UI/form/primary_btn";
import StarRating from "components/UI/star_rating";
import LabelledRow from "components/dataset/labelled_row";

const SummarySection = () => {
  const vm = useContext(DatasetDetailVMContext);
  if (!vm.dataset) {
    return <div />;
  }

  return (
    <div className="border p-3">
      <div className="p-3 -m-3 mb-3 border-b-2 border-gray-400 text-sm font-semibold">
        Dataset
      </div>
      <h4 className="text-sm font-medium mb-3">{vm.dataset?.detail.name}</h4>
      <DatasetDownload urls={vm.dataset?.urls} />
      <div className="text-xs font-medium mt-2">Summary</div>
      <div className="text-xs mb-2">{vm.dataset.detail.description}</div>
      {/* <DataHost className="mb-2" dataset={vm.dataset}/>
      <DataOwner className="mb-2" dataset={vm.dataset}/> */}
      <LabelledRow className="mb-1.5" label="Data Host">
        <a
          href={vm.dataset.detail.hostUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs underline"
        >
          {vm.dataset.detail.hostName}
        </a>
      </LabelledRow>
      <LabelledRow className="mb-1.5" label="Data Owner">
        {vm.dataset.owner.name}
      </LabelledRow>
      <PrimaryBtn
        label="Contact Owner"
        className="bg-dtech-secondary-light w-32 mb-2"
        onClick={() => {
          const email = vm.dataset?.owner.contact.email;
          const subject =
            "Enquiry about a dataset from a Dtime detechtive user";
          const body = `Dataset: ${vm.dataset?.detail.name}`;
          window.open(
            `mailto:${email}?subject=${subject}&body=${body}`,
            "_blank"
          );
        }}
      />
      <LabelledRow
        className="mb-1.5"
        label="Tags"
        tooltip="Keyword and common themes"
      >
        {vm.dataset.detail.topics.map(capitalize).join(", ")}
      </LabelledRow>
      <LabelledRow className="mb-1.5" label="License" tooltip="License">
        {vm.dataset.detail.license.type}
      </LabelledRow>
      <LabelledRow className="mb-1.5" label="Popularity" tooltip="Popularity">
        <StarRating rating={vm.dataset.detail.popularity} />
      </LabelledRow>
      <LabelledRow className="mb-1.5" label="Quality" tooltip="Quality">
        <StarRating rating={vm.dataset.detail.dataQuality} />
      </LabelledRow>
    </div>
  );
};

export default SummarySection;
