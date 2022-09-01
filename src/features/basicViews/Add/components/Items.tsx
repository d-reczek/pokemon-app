import { Box, Typography } from "@mui/material";
import FormikCheckbox from "../../../../components/formik/FormikCheckbox";
interface ItemsProps {
  isFetching: boolean;
}
const Items: React.FC<ItemsProps> = ({ isFetching }) => {
  return (
    <>
      <Typography sx={{ textAlign: "start" }} variant="h6">
        Items
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
