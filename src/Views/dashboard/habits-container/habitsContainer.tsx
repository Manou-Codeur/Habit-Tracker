import { FC } from "react";

import { habitsManagerType, habitsType } from "../types";
import HabitItem from "./habitItem/habitItem";

interface Props {
  updateHabits: habitsManagerType;
  habits: habitsType[];
}

const HabitsContainer: FC<Props> = ({ updateHabits, habits }) => {
  return (
    <div className="dashboard__habits-containner">
      {habits.length > 0 ? (
        habits.map(habit => (
          <HabitItem
            data={habit}
            key={habit.name}
            updateHabits={updateHabits}
          />
        ))
      ) : (
        <h1>You haven't created any HABIT yet !</h1>
      )}
    </div>
  );
};

export default HabitsContainer;
