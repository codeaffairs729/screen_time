import { capitalize } from "lodash-es";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import PrimaryBtn from "components/UI/form/primary_btn";
import StarRating from "components/UI/star_rating";
import LabelledRow from "components/dataset/labelled_row";
import ReactTooltip from "react-tooltip";
import isEmail from "validator/lib/isEmail";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
import BookmarkBtn from "components/UI/user_bookmark/bookmark_btn";

const SummarySection = () => {
    const vm = useContext(DatasetDetailVMContext);
    if (!vm.dataset) {
        return <div />;
    }

    let contactOwnerEmail = vm.dataset?.owner.contact.email;
    if ((contactOwnerEmail?.search(/^mailto:/) ?? -1) > -1) {
        contactOwnerEmail = contactOwnerEmail?.slice(7);
    }

    return (
        <div className="border-t p-3">
            <div className="flex flex-row">
                <h4
                    className="text-lg font-medium mb-3"
                    data-testid="dataset-title"
                >
                    {vm.dataset?.detail.name}
                </h4>
                <div className="flex flex-col">
                    <div className="my-1">
                        <FavouriteBtn
                            className="mx-auto"
                            dataset={vm.dataset}
                            onFavouriteChange={() => {}}
                        />
                    </div>
                    <div className="my-1">
                        <BookmarkBtn className="mx-auto" dataset={vm.dataset} />
                    </div>
                </div>
            </div>

            <div className="text-sm font-medium mt-2">Summary</div>
            <div className="text-xs mb-2 mt-1">
                {vm.dataset.detail.description}
            </div>

            <LabelledRow
                displayContext="data-host"
                className="mb-1.5"
                label="Data Host"
            >
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
                {vm.dataset.owner.organisation}
            </LabelledRow>
            <div
                className="inline-block"
                data-tip={
                    !isEmail(contactOwnerEmail)
                        ? "Data owner contact information not available"
                        : undefined
                }
            >
                <PrimaryBtn
                    label="Contact Owner"
                    isDisabled={!isEmail(contactOwnerEmail)}
                    className="bg-dtech-secondary-light w-32 mb-2"
                    onClick={() => {
                        const subject =
                            "Enquiry about a dataset from a Dtime detechtive user";
                        const body = `Dataset: ${vm.dataset?.detail.name}`;
                        window.open(
                            `mailto:${contactOwnerEmail}?subject=${subject}&body=${body}`,
                            "_blank"
                        );
                    }}
                />
            </div>
            <ReactTooltip uuid="dtechtive-feedbackform-tooltip" />
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
            <LabelledRow
                className="mb-1.5"
                label="Popularity"
                tooltip="Popularity"
            >
                <StarRating rating={vm.dataset.detail.popularity} />
            </LabelledRow>
            <LabelledRow className="mb-1.5" label="Quality" tooltip="Quality">
                <StarRating rating={vm.dataset.detail.dataQuality} />
            </LabelledRow>
        </div>
    );
};

export default SummarySection;
