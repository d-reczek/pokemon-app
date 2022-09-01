import TextField from "@mui/material/TextField";
import { useField } from "formik";
interface FormikTextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  fullWidth: boolean;
}
const FormikTextField: React.FC<FormikTextFieldProps> = ({ name, ...rest }) => {
  const [field, meta /* helpers*/] = useField(name);
  return (
    <TextField
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      error={meta.touched && !!meta.error}
      helperText={meta.error}
      {...rest}
    />
  );
};

export default FormikTextField;
