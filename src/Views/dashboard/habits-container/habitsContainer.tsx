import { FC } from "react";

import { habitsManagerType, habitsType } from "../types";
import HabitItem from "./habitItem/habitItem";

interface Props {
  updateHabits: habitsManagerType;
  habits: habitsType[];
  loading: boolean;
}

const HabitsContainer: FC<Props> = ({ updateHabits, habits, loading }) => {
  return (
    <div className="dashboard__habits-containner">
      {loading && <div className="loading-msg">Loading...</div>}

      {habits.length > 0 &&
        !loading &&
        habits.map(habit => (
          <HabitItem
            data={habit}
            key={habit.name}
            updateHabits={updateHabits}
          />
        ))}

      {!loading && habits.length === 0 && (
        <h1 className="noHabit-msg">You haven't created any HABIT yet !</h1>
      )}
    </div>
  );
};

export default HabitsContainer;
/**
 * 
 * 
 * : (
        <h1 className="noHabit-msg">You haven't created any HABIT yet !</h1>
      )
 */
