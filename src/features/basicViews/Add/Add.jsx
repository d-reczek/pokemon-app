import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";
import FormikRadioInput from "../../../components/formik/FormikRadioInput";
import FormikTextField from "../../../components/formik/FormikTextField";

import * as yup from "yup";
import PasswordForm from "./components/PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsFetching, selectUserData } from "../userSlice";
import { useEffect } from "react";
import CheckboxError from "./components/CheckboxError";
import Newsletter from "./components/Newsletter";
import Items from "./components/Items";

const Add = () => {
  const updateProfile = values =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res(console.log("updated", values));
      }, 1000);
    });

  const userData = useSelector(selectUserData);
  const isFetching = useSelector(selectIsFetching);
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
    items: [],
  };
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().email().required("Email is required"),
    isCodexAgreed: yup
      .boolean()
      .oneOf([true], "Terms must be accepted")
      .required("Terms must be accepted"),
    newsletter: yup.array().of(yup.string()),
    items: yup.array().of(yup.string()).min(1).required(),
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
                console.log(formik);
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

              <Newsletter isFetching={isFetching} />
              <Items isFetching={isFetching} />
              {formik.touched.items &&
                formik.touched.newsletter &&
                formik.errors.items && (
                  <CheckboxError error={formik.errors.items} />
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
