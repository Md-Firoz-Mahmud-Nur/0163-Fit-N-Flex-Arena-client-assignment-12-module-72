import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const signOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
      })
      .catch(() => {});
  };
  const links = (
    <>
      <li>
        <Link to="/" className="md:hidden">
          <div>
            Fit <span className="text-amber-500">N</span> Flex Arena
          </div>
        </Link>
      </li>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allTrainer">All Trainer</NavLink>
      </li>
      <li>
        <NavLink to="/allClasses">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/forum">Forum</NavLink>
      </li>
      <li>
        <NavLink to="/Profile">Profile</NavLink>
      </li>
    </>
  );
  return (
    <div className="container navbar mx-auto mt-6 bg-base-100 mb-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-amber-50 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost items-center p-0 text-xl md:flex">
          <img
            className="size-10"
            src="https://i.ibb.co/ZJp1jPb/Picsart-24-06-08-14-07-25-434.png"
            alt=""
          />
        </Link>
        <Link
          to="/"
          className="btn btn-ghost hidden items-center p-0 pl-2 text-2xl md:flex"
        >
          Fit <span className="text-amber-500">N</span> Flex Arena
        </Link>
      </div>
      <div className="navbar-center hidden lg:ml-20 lg:flex">
        <ul className="menu menu-horizontal bg-amber-50 px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-4">
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom"
              data-tip={
                user.displayName ? user.displayName : "user name not found"
              }
            >
              <div className="mr-2 size-10 rounded-full border-2 border-amber-500">
                <img className="rounded-full" alt="" src={user.photoURL} />
              </div>
            </div>
            <Link
              onClick={signOut}
              to="/"
              className="hover:bg-amber-500hover:text-white btn border-2 border-amber-500 bg-transparent text-lg text-amber-500 hover:border-amber-500"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
