import { Route, Switch, Redirect } from "react-router-dom";
import { useContext, FC, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import SignIn from "../../Views/auth/signIn/signIn";
import SignUp from "../../Views/auth/signUp/signUp";
import NotFound from "./../../Views/NotFound/notFound";
import FirebaseContext from "./../../Services/firebase/firebaseContext";

import "./auth.scss";

interface Props extends RouteComponentProps<any> {
  userAuthed: string | null;
}

const AuthRouter = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <Switch>
      <Route
        path="/auth/signIn"
        exact
        render={props => <SignIn {...props} firebase={firebase} />}
      />
      <Route
        path="/auth/signUp"
        exact
        render={props => <SignUp {...props} firebase={firebase} />}
      />
      <Redirect from="/auth" exact to="/auth/signIn" />
      <Route component={NotFound} />
    </Switch>
  );
};

const Auth: FC<Props> = ({ history, userAuthed }) => {
  //If the user is authed then redirect him to the dashboard component
  useEffect(() => {
    if (userAuthed) history.push("/dashboard");
  });

  return (
    <div className="auth">
      <AuthRouter />
    </div>
  );
};

export default Auth;
