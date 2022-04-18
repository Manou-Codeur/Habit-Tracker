import { Link } from "react-router-dom";
import ReactComponent from "../../Assets/img/Habit-Vector.jpg";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__presentation">
        <h1>
          Fix A List Of Habits, Track your progression over them, Acquire them!
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cupiditate
          dicta porro in, at consectetur molestias accusamus voluptates! Iusto
          dolorem a error adipisci suscipit iste.
        </p>
        <div className="home__btns">
          <Link to="/auth/signUp" className="link">
            Start Tracking
          </Link>
          <Link to="/auth/signIn" className="link">
            Continue Tracking
          </Link>
        </div>
      </div>
      <div className="home__img">
        <img src={ReactComponent} alt="Habits vector" />
      </div>
    </div>
  );
};

export default Home;
