import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";
import FormikRadioInput from "../../../components/formik/FormikRadioInput";
import FormikTextField from "../../../components/formik/FormikTextField";

import * as yup from "yup";
import PasswordForm from "./PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectUserData } from "../userSlice";
import { useEffect } from "react";
import FormikCheckbox from "../../../components/formik/FormikCheckbox";

const Add = () => {
  const updateProfile = values =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res(console.log("updated", values));
      }, 1000);
    });

  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const initialValues = {
    name: userData ? userData.name : "",
    surname: userData ? userData.surname : "",
    email: userData ? userData.email : "",
    isCodexAgreed: false,
    newsletter: [],
  };
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().email().required("Email is required"),
    isCodexAgreed: yup.boolean().oneOf([true]).required(),
    newsletter: yup.string(),
  });

  const onSubmit = async values => {
    await updateProfile(values);
  };

  return (
    <Box display={"flex"} justifyContent="center">
      <Box maxWidth={600} width="100%">
        <Box mt={2} mb={2}>
          <Typography variant="h4">Add new item form</Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize>
          {formik => (
            <Form>
              {(() => {
                console.log(formik.values);
              })()}
              <Box pt={2}>
                <FormikTextField
                  name="email"
                  type="email"
                  placeholder="enter email"
                  fullWidth
                />
              </Box>
              <Box pt={2}>
                <FormikTextField
                  name="name"
                  type="text"
                  placeholder="enter name"
                  fullWidth
                />
              </Box>
              <Box pt={2}>
                <FormikTextField
                  name="surname"
                  type="text"
                  placeholder="enter surname"
                  fullWidth
                />
              </Box>
              <Box display={"flex"} justifyContent={"end"} pt={2}>
                <FormikRadioInput
                  name="isCodexAgreed"
                  title="I agree to the terms of use"
                  label="Accept"
                  type="radio"
                />
              </Box>
              <Typography sx={{ textAlign: "start" }} variant="h6">
                Newsletter
              </Typography>
              <Box>
                <FormikCheckbox
                  name="newsletter"
                  type="checkbox"
                  label="Math"
                  value="Math"
                />
                <FormikCheckbox
                  name="newsletter"
                  type="checkbox"
                  label="Physics"
                  value="Physics"
                />
                <FormikCheckbox
                  name="newsletter"
                  type="checkbox"
                  label="Chemistry"
                  value="Chemistry"
                />
              </Box>
              <Typography sx={{ textAlign: "start" }} variant="h6">
                items
              </Typography>
              <Box>
                <FormikCheckbox
                  name="items"
                  type="checkbox"
                  label="Math"
                  value="item 1"
                />
                <FormikCheckbox
                  name="items"
                  type="checkbox"
                  label="Physics"
                  value="item 2"
                />
                <FormikCheckbox
                  name="items"
                  type="checkbox"
                  label="Chemistry"
                  value="item 3"
                />
              </Box>
              {formik.errors.items && (
                <p style={{ color: "red" }}>{formik.errors.items}</p>
              )}
              <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="contained">
                  {formik.isSubmitting ? "sendig data" : "submit form"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <PasswordForm />
      </Box>
    </Box>
  );
};

export default Add;
