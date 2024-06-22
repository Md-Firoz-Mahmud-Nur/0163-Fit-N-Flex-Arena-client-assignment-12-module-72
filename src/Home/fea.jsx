import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch featured classes data using react-query
  const { data: featuredClasses = [], isLoading } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featuredClass");
      return data;
    },
  });

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Featured Classes
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Discover a variety of engaging fitness classes at Fit N Flex Arena. From yoga
          to HIIT, our expert-led sessions cater to all levels and keep you
          motivated.
        </p>
        {isLoading ? (
          // Show loading indicator while data is being fetched
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          // Render featured classes once data is loaded
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredClasses.map((item) => (
              <div
                key={item.id}
                className="card flex h-full w-full flex-col justify-between rounded-lg border border-amber-500 p-6 shadow-xl transition-shadow duration-300 hover:shadow-amber-300"
              >
                <Link to="/allClasses" className="">
                  <img src={item.image} alt="" srcset="" />

                  <div className="group mb-5 flex h-full flex-col">
                    <h5 className="mb-3 max-w-max rounded-full bg-black bg-opacity-80 px-2 py-1 text-white">
                      {item.totalBooking} Bookings
                    </h5>
                    <h3 className="mb-2 max-w-max border-b-2 border-amber-500 pb-2 text-xl font-medium text-amber-500 group-hover:text-white">
                      &quot;{item.name}&quot;
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {item.description.slice(0, 80)}...
                  </p>
                  <div className="mt-auto flex items-end justify-end">
                    <div className="text-2xl text-amber-500 group-hover:text-white">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedClasses;
