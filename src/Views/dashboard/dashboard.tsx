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
  const [habits, setHabits] = useState<habitsType[] | []>([]);
  const [httpErrors, setHttpErrors] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      const habitsArr = (Array.isArray(snapshot.val()) && snapshot.val()) || [];

      setHabits(habitsArr);
    } catch (error) {
      setHttpErrors(error);
    }
    setLoading(false);
  };

  const updateState = (
    type: any,
    habitName: any,
    originalState: any,
    left: any,
    skip: any
  ) => {
    const copy = [...originalState];
    const index = copy.findIndex(habit => habit.name === habitName);
    if (type === "DELETE") {
      copy.splice(index, 1);
    } else if (type === "UPDATE") {
      copy[index].left = left;
      copy[index].skip = skip;
    } else if (type === "ADD") {
      copy.push({ name: habitName, left: left!, skip });
    }
    setHabits(copy);
  };

  const updateHabits: habitsManagerType = async (
    type,
    habitName,
    left,
    skip
  ) => {
    //I used a pattern that consist of updating the state and the db at the same time
    //but i'm not fetching the data from the server at each update, and if there was
    //an error i'll reset the state to the latest version.
    let originalState: habitsType[] = [];
    if (Array.isArray(habits)) {
      originalState = [...habits];
    }

    updateState(type, habitName, originalState, left, skip);

    try {
      await firebase!.habitsManager(userAuthed!, {
        type: type,
        habitName: habitName,
        left: left,
        skip: skip,
      });
    } catch (error) {
      setHabits(originalState);
      setHttpErrors(error);
    }
  };

  //So i can be catched by the error boundary comp
  if (httpErrors) throw new Error(httpErrors);
  return (
    <div className="dashboard">
      <DashboardForm updateHabits={updateHabits} habits={habits} />
      <HabitsContainer
        updateHabits={updateHabits}
        habits={habits}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
