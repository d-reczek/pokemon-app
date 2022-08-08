import { Box, Typography } from "@mui/material";
import FormikCheckbox from "../../../../components/formik/FormikCheckbox";

const Newsletter = ({ isFetching }) => {
  return (
    <>
      <Typography sx={{ textAlign: "start" }} variant="h6">
        Newsletter
      </Typography>
      <Box>
        <FormikCheckbox
          name="newsletter"
          type="checkbox"
          label="Math"
          value="Math"
          disabled={isFetching}
        />
        <FormikCheckbox
          name="newsletter"
          type="checkbox"
          label="Physics"
          value="Physics"
          disabled={isFetching}
        />
        <FormikCheckbox
          name="newsletter"
          type="checkbox"
          label="Chemistry"
          value="Chemistry"
          disabled={isFetching}
        />
      </Box>
    </>
  );
};

export default Newsletter;
