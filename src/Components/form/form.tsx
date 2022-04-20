import { useState, FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import { useCustomFormik } from "./helperFunctions";
import { handleErrors } from "./errorHandling";
import { MethodsTypes } from "../../Services/firebase/types";

interface Props extends RouteComponentProps<any> {
  firebase: MethodsTypes;
}

type hocType = (Component: FC, inputs: Array<string>) => FC<Props>;

const withForm: hocType = (Component, inputs) => props => {
  const formType = inputs.length <= 2 ? "singin" : "singup";
  const [waiting, setWaiting] = useState(false);

  //Should pass the firebase context to wrapped component as props
  const firebase = props.firebase;

  const {
    handleSubmit,
    touched,
    errors,
    handleChange,
    values,
    handleBlur,
    setErrors,
  } = useCustomFormik(formType, inputs, handleOnSubmit);

  async function handleOnSubmit({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    setWaiting(prev => !prev);
    try {
      let data;
      if (formType === "singin") {
        data = await firebase.doSignInWithEmailAndPassword(email, password);
      } else {
        data = await firebase.doCreateUserWithEmailAndPassword(email, password);

        // add the new user to database (optional)
        await firebase.addUser({
          uid: data.user.uid,
          name,
          email,
        });
      }

      //store the json web token in the localstorage (optional)
      localStorage.setItem(
        "user-authed",
        JSON.stringify(
          data.user.ya.split(".")[0] + "." + data.user.ya.split(".")[1]
        )
      );
      // props.history.push("/dashboard");
      window.location.reload();
    } catch (error: any) {
      handleErrors(formType, error, setErrors);
      setWaiting(prev => !prev);
    }
  }

  const moreProps = {
    handleSubmit,
    touched,
    errors,
    handleChange,
    values,
    handleBlur,
    waiting,
  };

  return <Component {...props} {...moreProps} />;
};

export default withForm;
