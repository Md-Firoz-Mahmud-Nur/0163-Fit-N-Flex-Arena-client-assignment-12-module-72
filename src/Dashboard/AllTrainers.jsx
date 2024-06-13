import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  const handleRemove = (trainer) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.put(`/users/${trainer._id}/roleMember`, {
            role: "member",
          });
          const response = await axiosSecure.get("/usersTrainer");
          setTrainers(response.data);
        } catch (error) {
          console.error("Error updating user role:", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

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
            <th className="border border-gray-300 px-4 py-2">
              Available Times
            </th>
            <th className="border border-gray-300 px-4 py-2">Skills</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={trainer.photoUrl}
                  alt={trainer.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.role}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.age}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.availableDays.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.availableTimes.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.skills.join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="btn" onClick={() => handleRemove(trainer)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainers;
