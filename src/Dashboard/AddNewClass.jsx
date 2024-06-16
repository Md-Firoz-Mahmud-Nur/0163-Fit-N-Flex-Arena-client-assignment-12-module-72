import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hooks/useAuth";
import { uploadImage } from "../Hooks/imageUpload";

const AddNewClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (newClass) => {
      const { data } = await axiosSecure.post(
        `/addNewClass?email=${user?.email}`,
        newClass,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "You successfully added a new class.",
          icon: "success",
        });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleAddNewClass = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const details = form.details.value;

    try {
      const img_url = await uploadImage(photo);
      const newClass = {
        name: name,
        description: details,
        image: img_url,
        totalBooking: 0,
      };
      await mutateAsync(newClass);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-2 flex min-h-[80vh] w-full items-center justify-center rounded-3xl border border-amber-500 shadow-xl shadow-amber-500">
      <form
        onSubmit={handleAddNewClass}
        className="flex w-full flex-col gap-4 rounded-3xl border border-amber-500 bg-base-100 p-6 shadow-xl shadow-amber-500 md:p-8 lg:w-10/12 lg:gap-6 lg:p-10 xl:w-1/2"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input
            name="name"
            type="text"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Image</span>
          </label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Description</span>
          </label>
          <textarea
            name="details"
            className="textarea textarea-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 shadow-xl shadow-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
          >
            Add Class
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddNewClass;
