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
      <div className="navBar__logo">H-Tracker</div>
      <div className="navBar__btns">
        {true ? (
          <>
            <Link className="test" to="/auth/signIn">
              Sign Up
            </Link>
            <Link className="test" to="/auth/signUp">
              Log In
            </Link>
          </>
        ) : (
          <button onClick={doSignOut}>Log Out</button>
        )}
      </div>
      <div className="navBar__mobile">
        <Link className="test" to="/auth/signIn">
          Sign Up
        </Link>
        <Link className="test" to="/auth/signUp">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
