import { FC } from "react";

import { ReactComponent as TrashIcon } from "../../../../Assets/img/trash.svg";
import { habitsManagerType, habitsType } from "../../types";

import "./habitItem.scss";

interface Props {
  data: habitsType;
  updateHabits: habitsManagerType;
}

type updateProgressType = (left: number, operator: "+" | "-") => number;

const HabitItem: FC<Props> = ({ data: { name, left }, updateHabits }) => {
  const countProgress = (): number => {
    return 100 - (left * 100) / 40;
  };

  const updateProgress: updateProgressType = (left, operator) => {
    if (operator === "+" && left < 40) {
      return left + 1;
    } else if (operator === "-" && left > 0) {
      return left - 1;
    }
    return left;
  };

  return (
    <div className="habit-item">
      <div className="habit-item__progress">
        <div
          className="habit-item__progress_done"
          style={{ width: `${countProgress()}%` }}
        ></div>
        <span className="habit-item__name">{name}</span>
        <span className="habit-item__time-left">
          {left + " Day" + (left > 1 ? "s" : "")} left
        </span>
      </div>
      <div className="habit-item__btns">
        <div
          className="add"
          onClick={() =>
            updateHabits("UPDATE", name, updateProgress(left, "-"))
          }
        >
          +
        </div>
        <div
          className="minus"
          onClick={() =>
            updateHabits("UPDATE", name, updateProgress(left, "+"))
          }
        >
          -
        </div>
        <div
          className="remove"
          onClick={() => updateHabits("DELETE", name, undefined)}
        >
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
