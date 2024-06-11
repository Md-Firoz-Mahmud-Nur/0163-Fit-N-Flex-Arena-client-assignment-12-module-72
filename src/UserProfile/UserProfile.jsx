import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/${user.email}`);
        setUserData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      {/* <p>Last Login: {Date(userData.lastLoginAt).toLocaleString()}</p> */}
      <p>Last Login: {Date(userData.lastSignInTime).toLocaleString()}</p>
      <img src={userData.photoURL} alt={`${userData.name}'s profile`} />
    </div>
  );
};

export default UserProfile;
