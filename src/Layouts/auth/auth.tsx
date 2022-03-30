import { Route, Switch, Redirect } from "react-router-dom";

import SignIn from "./../../Views/auth/signIn";
import SignUp from "./../../Views/auth/signUp";
import NotFound from "./../../Views/NotFound/notFound";

import "./auth.scss";

const AuthRouter = () => {
  //i'll comeback to it later
  const firebase = null;

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

const Auth = () => {
  return (
    <div className="auth">
      <AuthRouter />
    </div>
  );
};

export default Auth;
