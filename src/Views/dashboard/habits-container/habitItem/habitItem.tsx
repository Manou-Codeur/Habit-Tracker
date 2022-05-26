import { FC } from "react";

import { ReactComponent as TrashIcon } from "../../../../Assets/img/trash.svg";
import { ReactComponent as ResetIcon } from "../../../../Assets/img/refresh.svg";
import { habitsManagerType, habitsType } from "../../types";

import "./habitItem.scss";

interface Props {
  data: habitsType;
  updateHabits: habitsManagerType;
}

type updateProgressType = (
  left: number,
  action: "decrease days left" | "reset days left"
) => number;

const HabitItem: FC<Props> = ({ data: { name, left }, updateHabits }) => {
  const countProgress = (): number => {
    return 100 - (left * 100) / 66;
  };

  const updateProgress: updateProgressType = (left, operator) => {
    if (operator === "reset days left" && left < 66) {
      return 66;
    } else if (operator === "decrease days left" && left > 0) {
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
            updateHabits(
              "UPDATE",
              name,
              updateProgress(left, "decrease days left")
            )
          }
        >
          +
        </div>
        <div
          className="reset"
          onClick={() =>
            updateHabits(
              "UPDATE",
              name,
              updateProgress(left, "reset days left")
            )
          }
        >
          <ResetIcon />
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
