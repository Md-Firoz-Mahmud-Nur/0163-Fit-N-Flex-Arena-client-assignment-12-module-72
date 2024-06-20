import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";

const AppliedTrainerDetails = () => {
  const { id } = useParams();
  const appliedTrainerDetail = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setIsSubmitDisabled(e.target.value.trim() === "");
  };

  const handleReject = () => {
    document.getElementById("my_modal_5_reject").showModal();
  };

  const handleSubmit = async () => {
    try {
      await axiosSecure.put(`/users/${id}/statusReject`, {
        status: "rejected",
        feedback: feedback,
      });
      navigate("/appliedTrainer");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      await axiosSecure.put(
        `/users/${appliedTrainerDetail._id}/statusResolved`,
        {
          status: "resolved",
          role: "trainer",
        },
      );
      navigate("/dashboard/appliedTrainer");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold">User Details</h3>
      <p>Name: {appliedTrainerDetail.name}</p>
      <p>Email: {appliedTrainerDetail.email}</p>
      <p>Role: {appliedTrainerDetail.role}</p>
      <p>Age: {appliedTrainerDetail.age}</p>
      <p>Available Days: {appliedTrainerDetail.availableDays.join(", ")}</p>
      <p>Available Times: {appliedTrainerDetail.availableTimes.join(", ")}</p>
      <p>Skills: {appliedTrainerDetail.skills.join(", ")}</p>
      <p>Status: {appliedTrainerDetail.status}</p>
      <div>
        <button className="btn btn-error" onClick={handleReject}>
          Reject
        </button>
        <button className="btn btn-success" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      <dialog
        id="my_modal_5_reject"
        className="modal modal-bottom sm:modal-middle"
      >
        {appliedTrainerDetail && (
          <div className="modal-box">
            <h3 className="text-lg font-bold">User Details</h3>
            <p>Name: {appliedTrainerDetail.name}</p>
            <p>Email: {appliedTrainerDetail.email}</p>
            <p>Role: {appliedTrainerDetail.role}</p>
            <p>Age: {appliedTrainerDetail.age}</p>
            <p>
              Available Days: {appliedTrainerDetail.availableDays.join(", ")}
            </p>
            <p>
              Available Times: {appliedTrainerDetail.availableTimes.join(", ")}
            </p>
            <p>Skills: {appliedTrainerDetail.skills.join(", ")}</p>
            <p>Status: {appliedTrainerDetail.status}</p>
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

export default AppliedTrainerDetails;
