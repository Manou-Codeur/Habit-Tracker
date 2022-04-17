import { Link } from "react-router-dom";

import "./navBar.scss";

const NavBar = () => {
  //will look at it later
  const doSignOut = () => {
    localStorage.removeItem("user-authed");
    window.location.reload();
  };

  return (
    <div className="navBar">
      <a className="navBar__logo" href="/">
        H-Tracker
      </a>

      <div className="navBar__btns">
        {true ? (
          <>
            <Link className="link" to="/auth/signIn">
              Sign In
            </Link>
            <Link className="link" to="/auth/signUp">
              Sign Up
            </Link>
          </>
        ) : (
          <Link className="link" to="/">
            Log Out
          </Link>
        )}
      </div>
      <div className="navBar__mobile">
        <Link className="link" to="/auth/signIn">
          Sign In
        </Link>
        <Link className="link" to="/auth/signUp">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
