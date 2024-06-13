import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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
    setSelectedUser(user);
    document.getElementById("my_modal_5").showModal();
  };

  const handleReject = () => {
    // Implement the reject logic here
    console.log("Rejected", selectedUser);
    document.getElementById("my_modal_5").close();
    document.getElementById("my_modal_5_reject").showModal();
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setIsSubmitDisabled(e.target.value.trim() === "");
  };

  const handleConfirm = async () => {
    try {
      await axiosSecure.put(`/users/${selectedUser._id}/statusResolved`, {
        status: "resolved",
        role: "trainer",
      });
      // Update the local state
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id),
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      document.getElementById("my_modal_5").close();
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosSecure.put(`/users/${selectedUser._id}/statusReject`, {
        status: "rejected",
        feedback: feedback,
      });
      const response = await axiosSecure.get("/usersPending");
      setPendingUsers(response.data);
      document.getElementById("reject_modal").close();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };


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
              <td className="border border-gray-300 px-4 py-2">
                <button className="btn" onClick={() => handleActionClick(user)}>
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">User Details</h3>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <p>Age: {selectedUser.age}</p>
            <p>Available Days: {selectedUser.availableDays.join(", ")}</p>
            <p>Available Times: {selectedUser.availableTimes.join(", ")}</p>
            <p>Skills: {selectedUser.skills.join(", ")}</p>
            <p>Status: {selectedUser.status}</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleReject}>
                Reject
              </button>
              <button className="btn btn-success" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      )}
      <dialog
        id="my_modal_5_reject"
        className="modal modal-bottom sm:modal-middle"
      >
        {selectedUser && (
          <div className="modal-box">
            <h3 className="text-lg font-bold">User Details</h3>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <p>Age: {selectedUser.age}</p>
            <p>Available Days: {selectedUser.availableDays.join(", ")}</p>
            <p>Available Times: {selectedUser.availableTimes.join(", ")}</p>
            <p>Skills: {selectedUser.skills.join(", ")}</p>
            <p>Status: {selectedUser.status}</p>
            <textarea
              className="textarea textarea-bordered mt-4 w-full"
              placeholder="Enter feedback"
              value={feedback}
              onChange={handleFeedbackChange}
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_5_reject").close()
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default AppliedTrainer;
