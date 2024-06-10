import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import Select from "react-select";

const BecomeATrainer = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const skills = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
  ];

  const daysOfWeek = [
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];

  const timesOfDay = [
    { value: "morning", label: "Morning (7 AM - 8 AM)" },
    { value: "afternoon", label: "Afternoon (3 PM - 4 PM)" },
    { value: "evening", label: "Evening (5 PM - 6 PM)" },
    { value: "night", label: "Night (7 PM - 8 PM)" },
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleSkillsChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };
  const handleDaysChange = (selectedOptions) => {
    setSelectedDays(selectedOptions);
  };
  const handleTimesChange = (selectedOptions) => {
    setSelectedTimes(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const age = form.age.value;
    const selectedSkillsValues = selectedSkills.map((skill) => skill.value);
    const selectedDayValues = selectedDays.map((day) => day.value);
    const selectedTimeValues = selectedTimes.map((time) => time.value);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: selectedSkillsValues,
          availableDays: selectedDayValues,
          availableTimes: selectedTimeValues,
          status: "pending",
          fullName,
          email,
          age,
        }),
      });
      if (response.ok) {
        console.log("Skills submitted successfully");
      } else {
        console.error("Failed to submit skills");
      }
    } catch (error) {
      console.error("Error submitting skills:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              className="input input-bordered w-full"
              name="fullName"
              defaultValue={user?.displayName}
              placeholder="Enter Full Name"
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">E-Mail</span>
          </label>
          <label className="input-group">
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              disabled
              defaultValue={user?.email}
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              name="age"
              placeholder="Enter Your Age"
              required
            />
          </label>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Applied For</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              min={0}
              className="input input-bordered w-full"
              name="applierFor"
              placeholder=""
              required
              defaultValue="Trainer"
              disabled
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Available Days</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={daysOfWeek}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Available Days"
              onChange={handleDaysChange}
              required
            />
          </div>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Profile Image URL</span>
          </label>
          <label className="input-group">
            <input
              type="url"
              min={0}
              className="input input-bordered w-full"
              name="profileImage"
              placeholder="Profile Image URL"
              defaultValue={user?.photoURL}
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Available Times</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={timesOfDay}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Available Times"
              onChange={handleTimesChange}
              required
            />
          </div>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={skills}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Your Skills"
              onChange={handleSkillsChange}
              required
            />
          </div>
        </div>
        <button className="btn btn-outline col-span-2 border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
          Add
        </button>
      </div>
    </form>
  );
};

export default BecomeATrainer;
