import { FC } from "react";

import { ReactComponent as TrashIcon } from "../../../../Assets/img/trash.svg";
import { habitsManagerType, habitsType } from "../../types";

import "./habitItem.scss";

interface Props {
  data: habitsType;
  updateHabits: habitsManagerType;
}

const HabitItem: FC<Props> = ({ data: { name, left }, updateHabits }) => {
  return (
    <div className="habit-item">
      <div className="habit-item__progress">
        <div className="habit-item__progress_done"></div>
        <span className="habit-item__name">{name}</span>
        <span className="habit-item__time-left">
          {left + " Day" + (left > 1 ? "s" : "")} left
        </span>
      </div>
      <div className="habit-item__btns">
        <div
          className="add"
          onClick={() => updateHabits("UPDATE", name, left + 1)}
        >
          +
        </div>
        <div
          className="minus"
          onClick={() => updateHabits("UPDATE", name, left - 1)}
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
