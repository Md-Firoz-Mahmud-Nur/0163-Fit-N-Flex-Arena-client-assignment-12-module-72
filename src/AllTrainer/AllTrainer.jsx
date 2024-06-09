import { Link } from "react-router-dom";

const AllTrainer = () => {
  return (
    <div className="flex justify-center">
      <Link
        to="/becomeATrainer"
        className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
      >
        Become a Trainer
      </Link>
    </div>
  );
};

export default AllTrainer;
