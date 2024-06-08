import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createNewUser, updateExistingUserProfile } = useContext(AuthContext);

  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photoUrl = e.target.url.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    createNewUser(email, password, name, photoUrl)
      .then(() => {
        updateExistingUserProfile(name, photoUrl);
        toast.success(
          "Registration successful. Please Wait For Redirect To The Home Page",
          { autoClose: 1500 },
        );
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1500);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Fit N Flex Arena | Register</title>
      </Helmet>
      <div className="hero px-5 pb-2 pt-6 md:px-20">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-amber-500">
              Please Register!
            </h1>
            <p className="py-6 text-amber-500">
              Unlock your dream with our comprehensive Dream Tourism listings.
              Register today for exclusive access to prime services and
              personalized assistance.
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl shadow-amber-100">
            <form onSubmit={handleRegister} className="card-body pb-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="url"
                  placeholder="Provide Link"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "Text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    className="absolute right-2 top-4 ml-2 text-amber-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {!showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <label className="label">
                  <p className="mt-4">
                    Already have an account? Please{" "}
                    <Link
                      className="btn-link font-semibold text-amber-500"
                      to="/login"
                    >
                      Login
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control my-6">
                <button className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Register;
