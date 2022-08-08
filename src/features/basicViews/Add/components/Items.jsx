import { Box, Typography } from "@mui/material";
import FormikCheckbox from "../../../../components/formik/FormikCheckbox";

const Items = ({ isFetching }) => {
  return (
    <>
      <Typography sx={{ textAlign: "start" }} variant="h6">
        items
      </Typography>
      <Box>
        <FormikCheckbox
          name="items"
          type="checkbox"
          label="Math"
          value="item 1"
          disabled={isFetching}
        />
        <FormikCheckbox
          name="items"
          type="checkbox"
          label="Physics"
          value="item 2"
          disabled={isFetching}
        />
        <FormikCheckbox
          name="items"
          type="checkbox"
          label="Chemistry"
          value="item 3"
          disabled={isFetching}
        />
      </Box>
    </>
  );
};

export default Items;
