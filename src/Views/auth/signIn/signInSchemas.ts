import * as Yup from "yup";

//Yup schema
export const singinSchema = {
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  password: Yup.string().strict().required("Password is required!"),
};
