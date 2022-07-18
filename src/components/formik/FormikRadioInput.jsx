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
const FormikRadioInput = ({ title, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  console.log("value", field.value);
  return (
    <FormControl error={!!meta.error} variant="standard">
      <FormLabel>{title}</FormLabel>
      <RadioGroup>
        <FormControlLabel
          control={<Radio />}
          labelPlacement="start"
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          checked={!!value}
          onClick={() => setValue(!value)}
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
