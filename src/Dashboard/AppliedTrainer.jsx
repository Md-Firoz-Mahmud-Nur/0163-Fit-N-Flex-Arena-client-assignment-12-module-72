import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axiosSecure.get("/usersPending");
        setPendingUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, [axiosSecure]);

  const handleActionClick = (user) => {
    navigate(`appliedTrainerDetails/${user._id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pendingUsers.length) return <div>No pending users found</div>;

  return (
    <div>
      <h1 className="my-8 text-center text-3xl font-semibold text-amber-500">
        Pending Users
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl border border-gray-200 bg-white shadow-xl">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Email</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Role</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Age</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Available Days</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Available Times</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Skills</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4">{user.availableDays.join(", ")}</td>
                <td className="px-6 py-4">{user.availableTimes.join(", ")}</td>
                <td className="px-6 py-4">{user.skills.join(", ")}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4">
                  <button
                    className="btn bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => handleActionClick(user)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
