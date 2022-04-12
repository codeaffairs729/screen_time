import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";

const FAQPage = () => {
  return (
    <DefaultLayout>
      <div>FAQ</div>
    </DefaultLayout>
  );
};

export default withAuth(FAQPage);
