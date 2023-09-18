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
        const filterValues = vm.filterOptions?.metadata_quality?.map((format: any) => ({
            value: format.value,
            label: format.value,
            checkbox: false,
        })) ?? [];

        setFilterOptions(filterValues?.slice().reverse());
    }, [vm.filterOptions]);

    const { register, fields, control, setValue   } = useSearchFilter({
        name: "metadata_quality",
        filterOptionItems: filterOption?.sort((a:any,b:any) => b.value - a.value),
    });

    return (
        <FilterSection label="Metadata Quality" disable={(vm.isLoading || !fields.length)}>
            {fields.map((field, i) => (
                    <FilterCheckboxField
                        className="mr-1.5 mb-0.5"
                        key={field.id}
                        register={register(`metadata_quality.${i}.checkbox`)}
                        value={field.value}
                        count={field.label}
                        defaultChecked={!!field.checkbox}
                        name={`metadata_quality.${i}.checkbox`}
                        control={control}
                        setValue={setValue}
                        stars={parseInt(field.value)}
                    />
                // <StarRow key={field.id} stars={parseInt(field.value)}>
                // </StarRow>
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
