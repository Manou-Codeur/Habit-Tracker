import { Link } from "react-router-dom";

import "./navBar.scss";

const NavBar = () => {
  return (
    <div className="navBar">
      <p className="navBar__logo">H-tracker</p>

      <div className="navBar__links">
        <Link to="auth/signIn">SignIn</Link>
        <Link to="auth/signUp">SignUp</Link>
      </div>
    </div>
  );
};

export default NavBar;
