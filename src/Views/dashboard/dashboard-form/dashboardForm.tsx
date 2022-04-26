import { FC, useState, ChangeEvent } from "react";

import { habitsManagerType } from "../types";

interface Props {
  updateHabits: habitsManagerType;
}

type onChange = (e: ChangeEvent<HTMLInputElement>) => void;

const DashboardForm: FC<Props> = ({ updateHabits }) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOnChange: onChange = ({ target }) => {
    setInput(target.value);
    setError(null);
  };

  //I used "any" to avoid TS checking error msg
  const handleOnSubmit = (e: any) => {
    if (input === "") {
      if (e.key === "Enter" || e.target.textContent === "Add New Habit") {
        setError("Please enter the habit name!");
      }
    } else {
      if (e.key === "Enter" || e.target.textContent === "Add New Habit") {
        updateHabits("ADD", input, 40);
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
