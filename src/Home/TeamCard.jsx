import PropTypes from "prop-types";

const TeamCard = ({ team }) => {
  return (
    <div className="mx-auto my-12 lg:my-16 xl:my-20">
      <div className="mx-auto h-full w-full max-w-4xl overflow-hidden rounded-lg border border-amber-500 bg-white shadow-xl transition-shadow duration-300 hover:shadow-amber-300 lg:flex lg:rounded-lg">
        <div
          className="h-64 lg:block lg:h-auto lg:w-64 lg:rounded-l-lg lg:rounded-r-none lg:bg-cover lg:bg-center"
          style={{ backgroundImage: `url(${team.photoUrl})` }}
        ></div>
        <div className="p-6 lg:p-8">
          <h1 className="mb-2 text-2xl font-semibold text-amber-500 lg:text-3xl">
            {team.name}
          </h1>
          <div className="mb-4 w-20 border-b-2 border-amber-500 lg:w-24"></div>
          <p className="mb-4 text-gray-700">
            {team.experience} years of experience
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {team.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-gray-600">{team.biography.slice(0, 100)}...</p>
        </div>
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    biography: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamCard;
