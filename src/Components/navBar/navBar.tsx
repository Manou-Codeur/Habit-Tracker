import { Link } from "react-router-dom";
import { useAuth } from "./../../hooks/authHook";

import "./navBar.scss";

const NavBar = () => {
  const userAuthed = useAuth();

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
        {!userAuthed ? (
          <>
            <Link className="link" to="/auth/signIn">
              Sign In
            </Link>
            <Link className="link" to="/auth/signUp">
              Sign Up
            </Link>
          </>
        ) : (
          <Link className="link" to="/" onClick={doSignOut}>
            Log Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
