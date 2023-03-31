import StarRating from "components/UI/star_rating";
import {
    useSearchFilter,
    SearchVMContext,
    FilterOptionItem,
} from "pages/search/search.vm";
import { ReactNode, useContext, useEffect, useState } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const QualityFilter = () => {
    const vm = useContext(SearchVMContext);
    const [filterOption, setFilterOptions] = useState<
        FilterOptionItem[] | undefined
    >([]);
    useEffect(() => {
        const filterValues = [
            { checkbox: false, value: "1", label: "1" },
            { checkbox: false, value: "2", label: "2" },
            { checkbox: false, value: "3", label: "3" },
            { checkbox: false, value: "4", label: "4" },
            { checkbox: false, value: "5", label: "5" },
        ];

        setFilterOptions(filterValues);
    }, [vm.datasets]);

    const { register, fields } = useSearchFilter({
        name: "metadata_quality",
        filterOptionItems: filterOption,
    });
    console.log("test#################", fields);
    console.log("test######&&&&&&&&&&&&", filterOption);
    return (
        <FilterSection label="Metadata Quality" disable={vm.isLoading}>
            {fields.map((field, i) => (
                 <StarRow key={field.id} stars={i + 1}>
                <FilterCheckboxField
                    className="mr-1.5 mb-0.5"
                    key={field.id}
                    register={register(`metadata_quality.${i}.checkbox`)}
                    value={field.value}
                    defaultChecked={!!field.checkbox}
                />
                 </StarRow>
            ))}
        </FilterSection>
    );
};

const StarRow = ({
    stars,
    children,
}: {
    stars: number;
    children: ReactNode;
}) => {
    return (
        <div className="flex items-center justify-start">
            {children}
            <StarRating rating={stars} />
        </div>
    );
};

export default QualityFilter;
