import { FC } from "react";

import Input from "./../../../Components/Input/input";
import withForm from "./../../../Components/form/form";
import { SignUpProps } from "../types";

const SignUp: FC<SignUpProps> = ({
  handleSubmit,
  touched,
  errors,
  handleChange,
  values,
  handleBlur,
  waiting,
  history,
}) => {
  const goSignIn = () => history.push("/auth");

  return (
    <div className="signUp">
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.email}
        errors={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.password}
        errors={errors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.confirmPassword}
        errors={errors.confirmPassword}
      />
      <Input
        label="Profile Name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.name}
        errors={errors.name}
      />
      <button
        onClick={handleSubmit}
        disabled={waiting || Object.keys(errors).length > 0}
      >
        {waiting ? "SIGNING UP..." : "SIGN UP"}
      </button>
      <div className="signUp__goLogIn">
        Already member? <span onClick={goSignIn}>Log In</span>.
      </div>
    </div>
  );
};

const inputs = ["email", "password", "confirmPassword", "name"];
export default withForm(SignUp, inputs);
