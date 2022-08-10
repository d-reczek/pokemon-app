import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import * as yup from "yup";

import { Formik, Form } from "formik"; 
import FormikTextField from "../../../../components/formik/FormikTextField";

const PasswordForm = () => {
  const onSubmit = async values => {
    console.log({ values });
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password doesn't match")
      .required("Confirm password is required"),
  });

  return (
    <div>
      <Box display={"flex"} justifyContent="center">
        <Box maxWidth={600} width="100%">
          <Box mt={2} mb={2}>
            <Typography variant="h4">Add new password</Typography>
          </Box>

          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
              <Box pt={2}>
                <FormikTextField
                  name="password"
                  type={"password"}
                  placeholder="enter password"
                  fullWidth
                />
              </Box>

              <Box pt={2}>
                <FormikTextField
                  name="confirmPassword"
                  type={"password"}
                  placeholder="confirm password"
                  fullWidth
                />
              </Box>

              <Box display={"flex"} justifyContent="flex-end" pt={2}>
                <Button type="submit" variant="contained">
                  Submit password
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default PasswordForm;
