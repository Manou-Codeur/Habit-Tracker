import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Views/home/home";
import Auth from "./Layouts/auth/auth";
import Dashboard from "./Views/dashboard/dashboard";
import NotFound from "./Views/NotFound/notFound";
import NavBar from "./Components/navBar/navBar";
import { useAuth } from "./hooks/authHook";

const App = () => {
  const userAuthed: null | string = useAuth();

  return (
    <>
      <NavBar />
      <Switch>
        <Route
          path="/home"
          exact
          render={props => <Home {...props} userAuthed={userAuthed} />}
        />
        <Route
          path="/dashboard"
          render={props => <Dashboard {...props} userAuthed={userAuthed} />}
        />
        <Route
          path="/auth"
          render={props => <Auth {...props} userAuthed={userAuthed} />}
        />
        <Redirect from="/" exact to="/home" />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
