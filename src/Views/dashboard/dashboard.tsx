import { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import FirebaseContext from "./../../Services/firebase/firebaseContext";
import { habitsType, habitsManagerType } from "./types";

import "./dashboard.scss";
import DashboardForm from "./dashboard-form/dashboardForm";
import HabitsContainer from "./habits-container/habitsContainer";

interface Props extends RouteComponentProps<any> {
  userAuthed: string | null;
}

const Dashboard: FC<Props> = ({ history, userAuthed }) => {
  const [habits, setHabits] = useState<habitsType[]>([]);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    //If the user is not authed then redirect him to the auth component
    if (!userAuthed) {
      history.push("/auth");
      //the return statment prevent the comp from reaching the getHabis()
      //so there will be no state update after unmounting
      return;
    }

    getHabits();
  }, [userAuthed]);

  const getHabits = async () => {
    try {
      const snapshot = await firebase!.getHabits(userAuthed!).get();
      const habitsArr = snapshot.val() || [];

      setHabits(habitsArr);
    } catch (error) {
      console.log(error);
    }
  };

  const updateState = (
    type: any,
    habitName: any,
    originalState: any,
    left: any
  ) => {
    const copy = [...originalState];
    const index = copy.findIndex(habit => habit.name === habitName);
    if (type === "DELETE") {
      copy.splice(index, 1);
    } else if (type === "UPDATE") {
      copy[index].left = left;
    } else if (type === "ADD") {
      copy.push({ name: habitName, left: left! });
    }
    setHabits(copy);
  };

  const updateHabits: habitsManagerType = async (type, habitName, left) => {
    //I used a pattern that consist of updating the state and the db at the same time
    //but i'm not fetching the data from the server at each update, and if there was
    //an error i'll reset the state to the latest version.
    let originalState: habitsType[] = [];
    if (Array.isArray(habits)) {
      originalState = [...habits];
    }

    updateState(type, habitName, originalState, left);

    try {
      await firebase!.habitsManager(userAuthed!, {
        type: type,
        habitName: habitName,
        left: left,
      });
    } catch (error) {
      console.log(error);
      setHabits(originalState);
    }
  };

  return (
    <div className="dashboard">
      <DashboardForm updateHabits={updateHabits} />
      <HabitsContainer updateHabits={updateHabits} habits={habits} />
    </div>
  );
};

export default Dashboard;
