import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ClassCard from "./ClassCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [totalClass, setTotalClass] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosPublic = useAxiosPublic();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["allClasses", currentPage, search],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage - 1}&search=${search}`,
      );
      setAllClasses(data.result);
      setTotalClass(data.matchedTrainers);
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;
    setSearch(searchText);
    setCurrentPage(1);
  };

  const pages = [...Array(Math.ceil(parseInt(totalClass) / 6)).keys()];

  return (
    <div className="min-h-[60vh] py-8 md:py-8 lg:py-12">
      <Helmet>
        <title>Fit N Flex Arena | All Classes</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="flex justify-center py-6 md:py-8 lg:py-12">
          <form onSubmit={handleSearch} className="flex max-w-lg items-center">
            <input
              type="search"
              name="search"
              id="input-9"
              className="h-10 w-full rounded-l border border-r-0 border-amber-500 px-3 text-sm text-gray-700 shadow-sm focus:outline-none"
              placeholder="Search class name"
            />
            <button className="h-10 rounded-r border border-l-0 border-amber-500 bg-amber-500 px-4 text-sm text-blue-50 shadow-sm hover:border-amber-500 hover:bg-amber-500 hover:bg-opacity-80 hover:text-white focus:outline-none">
              Search
            </button>
          </form>
        </div>
        {!isLoading && allClasses.length === 0 ? (
          <div className="flex h-[30vh] items-center justify-center">
            <p className="text-5xl text-red-400">{`No class found by "${search}"`}</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {allClasses.map((item) => (
                <ClassCard key={item._id} item={item}></ClassCard>
              ))}
            </div>
            <div className="mt-8 flex justify-center md:mt-12 lg:mt-16">
              {allClasses && (
                <ul className="inline-flex">
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                      }}
                      className="focus:shadow-outline h-8 rounded-s-lg border border-gray-500 bg-white px-5 font-bold text-[#DC5F00] transition-colors duration-150 hover:bg-indigo-100 disabled:cursor-not-allowed"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                  </li>
                  {pages.map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => {
                          setCurrentPage(page + 1);
                        }}
                        className={`${
                          currentPage === page + 1
                            ? "bg-[#DC5F00] text-white"
                            : "bg-white"
                        } focus:shadow-outline h-8 border border-r-0 border-gray-500 px-5 font-bold text-[#DC5F00] transition-colors duration-150 hover:bg-indigo-100`}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                      }}
                      className="focus:shadow-outline h-8 rounded-r-lg border border-gray-500 bg-white px-5 font-bold text-[#DC5F00] transition-colors duration-150 hover:bg-indigo-100 disabled:cursor-not-allowed"
                      disabled={currentPage === pages.length}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
