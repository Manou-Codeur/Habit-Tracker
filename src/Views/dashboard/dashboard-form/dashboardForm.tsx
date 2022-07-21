import { FC, useState, ChangeEvent } from "react";

import { habitsManagerType, habitsType } from "../types";

interface Props {
  updateHabits: habitsManagerType;
  habits: habitsType[];
}

type onChange = (e: ChangeEvent<HTMLInputElement>) => void;
type checkIfHabitNameExistType = (habitName: string) => boolean;

const DashboardForm: FC<Props> = ({ updateHabits, habits }) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOnChange: onChange = ({ target }) => {
    setInput(target.value);
    setError(null);
  };

  const checkIfHabitNameExist: checkIfHabitNameExistType = habitName => {
    for (let habit of habits) {
      if (habit.name === habitName) return true;
    }
    return false;
  };

  //I used "any" to avoid TS checking error msg
  const handleOnSubmit = (e: any) => {
    if (input === "") {
      if (e.key === "Enter" || e.target.textContent === "Add New Habit") {
        setError("Please enter the habit name!");
      }
    } else {
      if (e.key === "Enter" || e.target.textContent === "Add New Habit") {
        if (checkIfHabitNameExist(input)) {
          setError("Habit name already taken! chose another one please.");
          return;
        }
        updateHabits("ADD", input, 66, 0);
        setInput("");
      }
    }
  };

  return (
    <div className="dashboard__form">
      <button onClick={handleOnSubmit}>Add New Habit</button>
      <input
        type="text"
        placeholder="Enter Habit Name"
        onChange={handleOnChange}
        value={input}
        onKeyUp={handleOnSubmit}
      />
      <div className="error-msg">{error}</div>
    </div>
  );
};

export default DashboardForm;
