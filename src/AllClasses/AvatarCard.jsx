import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AvatarCard = ({ trainer }) => {
    return (
        <Link to={`/trainer-details/${trainer._id}`}>
            <div className="relative hover:scale-105 duration-200 cursor-pointer">
                <div className="absolute -inset-2">
                    <div
                        className="w-14 h-full max-w-sm mx-auto lg:mx-0 ">
                    </div>
                </div>
                <img src={trainer.photoUrl}
                    className="relative object-cover shrink-0 size-14 z-10 rounded-xl" />
            </div>
        </Link>
    );
};

AvatarCard.propTypes = {
    trainer: PropTypes.object
};

export default AvatarCard;