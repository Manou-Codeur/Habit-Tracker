import { FC, ChangeEvent, FocusEvent } from "react";

import "./input.scss";

interface Props {
  label: "Email" | "Password" | "Confirm Password" | "Profile Name";
  type: "email" | "password" | "text";
  name: "email" | "password" | "confirmPassword" | "name";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  touched: boolean;
  errors: any;
}

const Input: FC<Props> = ({ label, touched, errors, ...rest }) => {
  return (
    <div className="input-comp">
      <label htmlFor={label}>{label}</label>
      <input {...rest} id={label} />
      <div className="input-comp__error">{touched && errors}</div>
    </div>
  );
};

export default Input;
