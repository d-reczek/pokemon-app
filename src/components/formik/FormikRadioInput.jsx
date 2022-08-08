import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";
const FormikRadioInput = ({ title, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  return (
    <FormControl error={!!meta.error && !!meta.touched} variant="standard">
      <FormLabel>{title}</FormLabel>
      <RadioGroup onClick={() => setValue(!value)}>
        <FormControlLabel
          control={<Radio />}
          labelPlacement="start"
          name={field.name}
          onBlur={field.onBlur}
          checked={value}
          {...props}
        />
        {meta.error && meta.touched && (
          <FormHelperText sx={{ textAlign: "right" }}>
            {meta.error}
          </FormHelperText>
        )}
 
      </RadioGroup>
    </FormControl>
  );
};

export default FormikRadioInput;
