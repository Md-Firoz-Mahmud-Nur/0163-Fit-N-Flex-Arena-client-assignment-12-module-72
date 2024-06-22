import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BookedTrainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myBooking = [], isLoading } = useQuery({
    queryKey: ["booked-trainer", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/myBooked/${user?.email}?email=${user?.email}`,
      );
      return data;
    },
  });

  function open(trainer, pkg, price, trxId) {
    const info = {
      trainer,
      pkg,
      price,
      trxId,
    };
    setInfo(info);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const TABLE_HEAD = ["", "Day", "Class", "Slot Name", "Slot Time", "Action"];

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <>
      {myBooking.length === 0 ? (
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <p className="text-3xl font-medium text-gray-700 md:text-4xl lg:text-5xl">
            You haven't booked any
          </p>
        </div>
      ) : (
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <div className="card mx-auto h-full w-full overflow-scroll bg-base-100 shadow-xl md:w-3/4 lg:w-1/2">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="bg-gray-100 p-4">
                        <p className="font-normal leading-none opacity-70">
                          {head}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myBooking &&
                    myBooking.map((slot, index) => {
                      return (
                        <tr key={index} className="hover">
                          <td className="p-4">
                            <p className="font-normal">{index + 1}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-normal">{slot?.class?.day}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-normal">
                              {slot?.class?.cName.label}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="font-normal">{slot?.class?.sName}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-normal">
                              {slot?.class?.sTime} Hr
                            </p>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() =>
                                open(
                                  slot.trainer,
                                  slot.package,
                                  slot.price,
                                  slot.transactionId,
                                )
                              }
                              className="btn btn-ghost"
                            >
                              <IoEyeOutline className="text-xl" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {isOpen && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25">
              <div className="modal modal-open">
                <div className="modal-box relative w-full max-w-md rounded-xl border border-[#DC5F00] bg-gray-50 p-6">
                  {info && (
                    <div className="flex flex-col gap-3 p-4 text-gray-700 md:p-6 lg:gap-4">
                      <p>
                        <span className="font-semibold">
                          Trainer Name: {info?.trainer?.name}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Trainer Email: {info?.trainer?.email}
                        </span>
                      </p>
                      <div className="h-[1px] w-full bg-gray-700"></div>
                      <p>
                        <span className="font-semibold">
                          Package:{" "}
                          <span className="text-green-500">{info?.pkg}</span>
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Price: {info?.price} $
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Trx Id: {info?.trxId}
                        </span>
                      </p>
                      <div className="mt-5 text-right">
                        <button
                          onClick={close}
                          className="rounded-lg bg-red-500 px-3 py-2 text-white"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookedTrainer;
