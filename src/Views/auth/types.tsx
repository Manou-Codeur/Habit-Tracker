import { RouteComponentProps } from "react-router-dom";
import { ChangeEvent, FocusEvent } from "react";

export interface SignInProps extends RouteComponentProps<any> {
  handleSubmit: () => void;
  touched: { email: boolean; password: boolean };
  errors: { email: string; password: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: { email: string; password: string };
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  waiting: boolean;
}

export interface SignUpProps extends RouteComponentProps<any> {
  handleSubmit: () => void;
  touched: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    name: boolean;
  };
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  waiting: boolean;
}
