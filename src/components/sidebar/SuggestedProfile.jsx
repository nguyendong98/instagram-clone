import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {updateFollowedUserFollowers, updateLoggedInUserFollowing} from 'services/firebase';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {

    const [followed, setFollowed] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);

    }

    return !followed ? (
        <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 h-8 mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{ username }</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
    userDocId: PropTypes.string,
    username: PropTypes.string,
    profileId: PropTypes.string,
    userId: PropTypes.string
}
