import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  return (
    <div className="flex">
      <div className="sticky min-h-screen w-64 bg-amber-500">
        <NavLink to="home">Home</NavLink>
        <br />
        <NavLink to="login">Login</NavLink>
        <br />
        <NavLink to="allUsers">All Users</NavLink>
        <br />
        <NavLink to="appliedTrainer">Applied Trainer</NavLink>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
