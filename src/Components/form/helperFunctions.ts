import { useFormik } from "formik";
import * as Yup from "yup";

import * as schemas from "./yupSchems";

type allowedTypes = "singup" | "singin";

type SubmitType = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => void;

type getInitValuesType = (inputs: Array<string>) => any;

export const getInitValues: getInitValuesType = inputs => {
  const inputsObj: any = {};
  for (let i = 0; i < inputs.length; i++) {
    inputsObj[inputs[i]] = "";
  }
  return inputsObj;
};

export const useCustomFormik = (
  formType: allowedTypes,
  inputs: Array<string>,
  submitFunction: SubmitType
) => {
  return useFormik({
    initialValues: getInitValues(inputs),
    validationSchema: Yup.object(schemas[`${formType}Schema`]),
    onSubmit: values => {
      submitFunction(values);
    },
  });
};
