import {FieldValue, firebaseInstance} from 'lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebaseInstance
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()
    return result.docs.map(user => user.data().length > 0);
}

export async function getUserByUserId(userId) {
    const result = await firebaseInstance
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get()
    return result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebaseInstance
        .firestore()
        .collection('users')
        .limit(10)
        .get();
    return result.docs
        .map(user => ({...user.data(), docId: user.id}))
        .filter(profile => profile.userId !== userId && !following.includes(profile.userId))


}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,
    isFollowingProfile
) {
    return await firebaseInstance
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId,
    loggedInUserDocId,
    isFollowingProfile
) {
    return await firebaseInstance
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPhotos(userId, following) {
    const result = await firebaseInstance
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get()
    const userFollowedPhotos = result.docs.map(photo => ({
        ...photo.data(),
        docId: photo.id
    }))
    return await Promise.all(
        userFollowedPhotos.map(async photo => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const {username} = user[0];
            return {username, ...photo, userLikedPhoto};
        })
    );
}
