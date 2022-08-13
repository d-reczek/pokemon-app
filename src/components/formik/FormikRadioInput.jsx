import {
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useField } from "formik";

const FormikRadioInput = ({ title, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleToggleChecked = e => {
    setValue(!value);
  };
  return (
    <FormControlLabel
      onClick={e => handleToggleChecked(e.target.value)}
      name={field.name}
      onBlur={field.onBlur}
      labelPlacement="start"
      control={
        <Radio
          checked={value}
          sx={{
            color:
              meta.touched && !!meta.error
                ? theme => theme.palette.error.main
                : undefined,
          }}
        />
      }
      value={value}
      {...props}
      sx={{
        "& .MuiFormControlLabel-label": {
          color:
            meta.touched && !!meta.error
              ? theme => theme.palette.error.main
              : undefined,
        },
      }}
    />
  );
};

export default FormikRadioInput;
