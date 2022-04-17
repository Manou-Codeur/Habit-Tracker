import "./habitItem.scss";
import { ReactComponent as TrashIcon } from "../../../Assets/img/trash.svg";

const HabitItem = () => {
  return (
    <div className="habit-item">
      <div className="habit-item__progress">
        <div className="habit-item__progress_done"></div>
        <span className="habit-item__name">Habit 01</span>
        <span className="habit-item__time-left">10 Days left</span>
      </div>
      <div className="habit-item__btns">
        <div className="add">+</div>
        <div className="minus">-</div>
        <div className="remove">
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
