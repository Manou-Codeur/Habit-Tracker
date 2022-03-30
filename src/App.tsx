import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Views/home/home";
import Auth from "./Layouts/auth/auth";
import Dashboard from "./Views/dashboard/dashboard";
import NotFound from "./Views/NotFound/notFound";
import NavBar from "./Components/navBar/navBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Redirect from="/" exact to="/home" />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
