import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useField } from "formik";
interface FormikCheckboxProps {
  name: string;
  type: string;
  label: string;
  disabled: boolean;
  multiple?: boolean;
  value: string;
}
const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          "& .MuiFormControlLabel-label": {
            color:
              meta.touched && !!meta.error
                ? theme => theme.palette.error.main
                : undefined,
          },
        }}
        control={
          <Checkbox
            sx={{
              color:
                meta.touched && !!meta.error
                  ? theme => theme.palette.error.main
                  : undefined,
            }}
          />
        }
        name={field.name}
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
