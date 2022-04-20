import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import HabitItem from "./habitItem/habitItem";

import "./dashboard.scss";

interface Props extends RouteComponentProps<any> {
  userAuthed: string | null;
}

const Dashboard: FC<Props> = ({ history, userAuthed }) => {
  //If the user is not authed then redirect him to the auth component
  if (!userAuthed) history.push("/auth");

  return (
    <div className="dashboard">
      <button>Add New Habit</button>
      <div className="dashboard__habits-containner">
        <HabitItem />
        <HabitItem />
      </div>
    </div>
  );
};

export default Dashboard;
