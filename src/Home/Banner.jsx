import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="https://i.ibb.co/PWLSrvj/orangetheory-today-180605-tease.jpg"
          className="max-h-[calc(60vh)] w-full rounded-3xl border border-amber-500 object-cover shadow-xl shadow-amber-200"
        />
        <div className="absolute bottom-5 left-10 right-10 rounded-xl border border-amber-500 bg-base-content bg-opacity-60 p-4 text-center text-2xl font-bold text-white">
          <h1>Your Ultimate Fitness Destination</h1>
          <p className="text-lg font-medium">
            Top-notch equipment, personalized training plans, and a supportive
            community. Start your fitness journey with us now.
          </p>
          <Link
            to="/allClasses"
            className="btn btn-outline mt-5 border-2 border-amber-500 bg-transparent text-xl text-white hover:border-amber-500 hover:bg-amber-500 hover:text-white"
          >
            All Classes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
