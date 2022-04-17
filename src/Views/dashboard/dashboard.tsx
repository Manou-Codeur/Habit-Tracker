import HabitItem from "./habitItem/habitItem";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <button>Add New Habit</button>
      <div className="dashboard__habits-containner">
        <HabitItem />
        <HabitItem />
      </div>
    </div>
  );
};

export default Dashboard;
