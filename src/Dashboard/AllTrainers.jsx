import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosSecure.get("/usersTrainer");
        setTrainers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [axiosSecure]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!trainers.length) return <div>No trainers found</div>;

  return (
    <div>
      <h1>Trainers List</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Photo</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Available Days</th>
            <th className="border border-gray-300 px-4 py-2">Available Times</th>
            <th className="border border-gray-300 px-4 py-2">Skills</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Last Login</th>
            <th className="border border-gray-300 px-4 py-2">Last Sign-In Time</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td className="border border-gray-300 px-4 py-2">
                <img src={trainer.photoUrl} alt={trainer.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{trainer.name}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.email}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.role}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.age}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.availableDays.join(", ")}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.availableTimes.join(", ")}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.skills.join(", ")}</td>
              <td className="border border-gray-300 px-4 py-2">{trainer.status}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(parseInt(trainer.lastLoginAt)).toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(trainer.lastSignInTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainers;
