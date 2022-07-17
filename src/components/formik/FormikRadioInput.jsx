import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { useField } from "formik";
const FormikRadioInput = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl error={!!meta.error} variant="standard">
      <FormLabel>I agree to the terms of use</FormLabel>
      <RadioGroup
        name={field.name}
        checked={field.checked}
        onBlur={field.onBlur}
        onChange={field.onChange}>
        <Box>
          <FormControlLabel
            control={<Radio />}
            labelPlacement="start"
            value={true}
            label="Yes"
          />
          <FormControlLabel
            control={<Radio />}
            labelPlacement="start"
            value={false}
            label="No"
          />
        </Box>

        <FormHelperText sx={{ textAlign: "right" }}>
          {meta.error}
        </FormHelperText>
      </RadioGroup>
    </FormControl>
  );
};

export default FormikRadioInput;
