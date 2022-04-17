import { FormikErrors } from "formik";

interface errorType {
  code: string;
}

type setErrorsType = (errors: FormikErrors<{}>) => void;

type allowedTypes = "singup" | "singin";

const handleSingupErrors = (error: errorType, setErrors: setErrorsType) => {
  if (error.code.includes("email-already-in-use")) {
    setErrors({ email: "Email is already taken!" });
  } else {
    setErrors({ password: "There is an unexpected error, try again please!" });
  }
};

const handleSinginErrors = (error: errorType, setErrors: setErrorsType) => {
  if (error.code.includes("user-not-found")) {
    setErrors({ password: "Wrong e-mail or password." });
  } else if (error.code.includes("wrong-password")) {
    setErrors({ password: "Wrong password." });
  } else {
    setErrors({ password: "There is an unexpected error, try again please!" });
  }
};

export const handleErrors = (
  form: allowedTypes,
  error: errorType,
  setErrors: setErrorsType
) => {
  if (form === "singup") handleSingupErrors(error, setErrors);
  else if (form === "singin") handleSinginErrors(error, setErrors);
};
