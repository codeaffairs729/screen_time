import TextField from "components/UI/form/text_field";
import HeaderValue from "../header_value";
import BioForm from "./bio_form";

const YourInfo = () => {
  return (
    <div className="md:p-3 flex min-w-[420px]">
      <div className="w-1/2">
        <HeaderValue
          header="Education"
          value="Enter this in your settings"
          className="flex-col mb-4"
        />
        <HeaderValue
          header="Achievements"
          value="Enter this in your settings"
          className="flex-col mb-4"
        />
        <HeaderValue
          header="Interests"
          value="Enter this in your settings"
          className="flex-col mb-4"
        />
      </div>
      <BioForm className="w-1/2" />
    </div>
  );
};

export default YourInfo;
