import { FC, useRef, useEffect } from "react";

import { ReactComponent as TrashIcon } from "../../../../Assets/img/trash.svg";
import { ReactComponent as ResetIcon } from "../../../../Assets/img/refresh.svg";
import ReactComponent from "../../../../Assets/img/skip.png";
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

type updateSkipType = (params: habitsType, e: any) => any;

const HabitItem: FC<Props> = ({ data: { name, left, skip }, updateHabits }) => {
  const skipBtn = useRef<HTMLDivElement>(null);
  //css for the skip progress bar
  useEffect(() => {
    if (skip === 0) {
      skipBtn.current!.style.height = `100%`;
    } else if (skip === 1) {
      skipBtn.current!.style.height = `66.66%`;
    } else if (skip === 2) {
      skipBtn.current!.style.height = `33.33%`;
    } else {
      skipBtn.current!.style.height = `0%`;
    }
  });

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

  const updateSkip: updateSkipType = ({ skip, left, name }) => {
    const newSkip = skip + 1;

    if (skip > 2) {
      //run the reset function
      return updateHabits(
        "UPDATE",
        name,
        updateProgress(left, "reset days left"),
        0
      );
    }
    updateHabits("UPDATE", name, left, newSkip);
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
              updateProgress(left, "decrease days left"),
              skip
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
              updateProgress(left, "reset days left"),
              0
            )
          }
        >
          <ResetIcon />
        </div>
        <div
          className="remove"
          onClick={() => updateHabits("DELETE", name, undefined, undefined)}
        >
          <TrashIcon />
        </div>
        <div
          className="skip"
          onClick={e => updateSkip({ left, name, skip }, e)}
        >
          <div className="skip_progress" ref={skipBtn}></div>
          <img src={ReactComponent} alt="Skip Icon" />
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
