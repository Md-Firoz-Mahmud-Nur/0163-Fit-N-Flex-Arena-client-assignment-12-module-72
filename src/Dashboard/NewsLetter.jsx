import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const NewsLetter = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const TABLE_HEAD = ["#", "Name", "Email"];

  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["newsletter"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/newsletter?email=${user?.email}`,
      );
      return data;
    },
  });

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="card mx-auto w-full overflow-x-auto shadow-lg md:w-3/4 lg:w-1/2">
        <div className="card-body">
          <table className="table w-full">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="bg-base-200">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map(({ name, email }, index) => (
                <tr key={index}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{name}</td>
                  <td className="p-4">{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
