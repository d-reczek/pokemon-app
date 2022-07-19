import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useField } from "formik";

const FormikCheckbox = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        name={field.name}
        value={field.value}
        checked={field.checked}
        onChange={field.onChange}
        onBlur={field.onBlur}
        multiple={field.multiple}
        {...props}
      />
    </FormGroup>
  );
};

export default FormikCheckbox;
