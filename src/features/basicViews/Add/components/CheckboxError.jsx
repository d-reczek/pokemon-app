import { Box } from "@mui/material";

const CheckboxError = ({ error }) => {
  return (
    <Box color="red">
      <p>{error}</p>
    </Box>
  );
};

export default CheckboxError;
