import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import { useForm } from "react-hook-form";

const BioForm = ({ className = "" }: { className?: string }) => {
  const { control } = useForm();

  return (
    <div className={className}>
      <span className="text-sm font-medium text-gray-500 block">Biography</span>
      <TextField
        rows={5}
        type="textarea"
        placeholder="Tell us about yourself..."
        formControl={{
          control,
          name: "bio",
          rules: {},
        }}
      />
      <div className="flex space-x-2 mt-3">
        <PrimaryBtn className="bg-dtech-secondary-light" label="Edit" />
        <PrimaryBtn className="bg-gray-400" label="Save" />
        <PrimaryBtn className="bg-gray-400" label="Cancel" />
      </div>
    </div>
  );
};

export default BioForm;
