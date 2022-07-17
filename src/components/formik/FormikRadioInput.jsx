import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";
const FormikRadioInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl error={!!meta.error} variant="standard">
      <RadioGroup>
        <FormControlLabel
          control={<Radio />}
          labelPlacement="start"
          name={field.name}
          value={true}
          checked={field.checked}
          onBlur={field.onBlur}
          onChange={field.onChange}
          {...props}
        />
        <FormHelperText sx={{ textAlign: "right" }}>
          {meta.error}
        </FormHelperText>
      </RadioGroup>
    </FormControl>
  );
};

export default FormikRadioInput;
