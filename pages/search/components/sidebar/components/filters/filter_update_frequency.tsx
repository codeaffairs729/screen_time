import { FilterOptionItem, useSearchFilter, SearchVMContext } from "pages/search/search.vm";
import { useRef, useContext } from "react";
import FilterCheckboxField from "../filter_checkbox_field";
import FilterSection from "../filter_section";

const FilterUpdateFrequency = () => {
    const vm = useContext(SearchVMContext);
    const filterValues = useRef<FilterOptionItem[]>([
        { checkbox: false, label: "Continually", value: "continually" },
        { checkbox: false, label: "Daily", value: "daily" },
        { checkbox: false, label: "Weekly", value: "weekly" },
        { checkbox: false, label: "Fortnightly", value: "fortnightly" },
        { checkbox: false, label: "Monthly", value: "monthly" },
        { checkbox: false, label: "Quarterly", value: "quarterly" },
        { checkbox: false, label: "Biannually", value: "biannually" },
        { checkbox: false, label: "Annually", value: "annually" },
        { checkbox: false, label: "As Needed", value: "as_needed" },
        { checkbox: false, label: "Irregular", value: "irregular" },
        { checkbox: false, label: "Not Planned", value: "not planned" },
        { checkbox: false, label: "Unknown", value: "unknown" },
    ]);
    const { register, fields } = useSearchFilter({
        name: "update_frequency",
        filterOptionItems: filterValues.current,
    });

    return (
        <FilterSection label="Update Frequency" disable={vm.isLoading}>
            {fields.map((field, i) => (
                <FilterCheckboxField
                    key={field.id}
                    register={register(`update_frequency.${i}.checkbox`)}
                    label={field.label}
                    value={field.value}
                    defaultChecked={!!field.checkbox}
                />
            ))}
        </FilterSection>
    );
};

export default FilterUpdateFrequency;
