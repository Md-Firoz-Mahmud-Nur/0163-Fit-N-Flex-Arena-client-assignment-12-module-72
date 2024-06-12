import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pendingUsers.length) return <div>No pending users found</div>;

  return (
    <div>
      <h1>Pending Users</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Available Days</th>
            <th className="border border-gray-300 px-4 py-2">
              Available Times
            </th>
            <th className="border border-gray-300 px-4 py-2">Skills</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.availableDays.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.availableTimes.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.skills.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.status}
              </td>
              <td className="flex border border-gray-300 px-4 py-2">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedTrainer;
