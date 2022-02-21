import DatasetDownload from "components/dataset/dataset_download";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import PrimaryBtn from "components/UI/form/primary_btn";
import InfoIcon from "components/UI/icons/info_icon";
import { capitalize } from "lodash-es";
import StarRating from "components/UI/star_rating";

const SummarySection = () => {
  const vm = useContext(DatasetDetailVMContext);
  if (!vm.dataset) {
    return <div />;
  }

  return (
    <div className="border p-2">
      <div>Dataset</div>
      <h4 className="text-sm font-medium">{vm.dataset?.detail.name}</h4>
      <DatasetDownload urls={vm.dataset?.urls} />
      <div className="text-xs font-medium">Summary</div>
      <div className="text-xs mb-2">{vm.dataset.detail.description}</div>
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">Data Host:</span>
        <a
          href={vm.dataset.detail.hostUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs underline"
        >
          {vm.dataset.detail.hostName}
        </a>
      </div>
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">Data Owner:</span>
        <span className="text-xs">{vm.dataset.owner.name}</span>
      </div>
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
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">
          Tags <InfoIcon title="Keyword and common themes" />:
        </span>
        <span className="text-xs">
          {vm.dataset.detail.topics.map(capitalize).join(", ")}
        </span>
      </div>
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">
          License <InfoIcon title="License" />:
        </span>
        <span className="text-xs">{vm.dataset.detail.license.type}</span>
      </div>
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">
          Popularity <InfoIcon title="Popularity" />:
        </span>
        <span className="text-xs">
          <StarRating rating={vm.dataset.detail.popularity} />
        </span>
      </div>
      <div className="flex mb-2">
        <span className="text-xs font-medium mr-1 whitespace-nowrap">
          Quality <InfoIcon title="Quality" />:
        </span>
        <span className="text-xs">
          <StarRating rating={vm.dataset.detail.dataQuality} />
        </span>
      </div>
    </div>
  );
};

export default SummarySection;
