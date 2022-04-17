import { FC, ChangeEvent, FocusEvent, KeyboardEvent } from "react";

import Input from "./../../../Components/Input/input";
import withForm from "./../../../Components/form/form";

interface Props {
  handleSubmit: () => void;
  touched: { email: boolean; password: boolean };
  errors: { email: string; password: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: { email: string; password: string };
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  waiting: boolean;
  history: any;
}

const SignIn: FC<Props> = ({
  handleSubmit,
  touched,
  errors,
  handleChange,
  values,
  handleBlur,
  waiting,
  history,
}) => {
  const goToSignUp = () => {
    history.push("/auth/signUp");
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) handleSubmit();
  };

  return (
    <div className="signIn" onKeyUp={handleOnKeyPress}>
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
      <span className="signIn__passReset">Forget your password ?</span>
      <button
        onClick={handleSubmit}
        disabled={waiting || Object.keys(errors).length > 0}
      >
        {waiting ? "LOGGING..." : "LOGIN"}
      </button>
      <div className="signIn__register">
        You are not member yet? <span onClick={goToSignUp}>Register now</span>.
      </div>
    </div>
  );
};

//the user also need to precise the inputs he wanna use
const inputs = ["email", "password"];
export default withForm(SignIn, inputs);
