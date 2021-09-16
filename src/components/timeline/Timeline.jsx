import React, {useContext} from 'react';
import usePhotos from 'hooks/use-photos';
import LoggedInUserContext from 'context/logged-in-user';
import Skeleton from 'react-loading-skeleton';
export default function Timeline() {

    const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);
    console.log(photos)
    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400} />
                    ))}
                </>
            ) : photos?.length > 0 ? (
                photos.map(content => <p key={content.docId}>{ content.imageSrc }</p> )
            ) : (
                <p className="text-center text-2xl"></p>
            )}
        </div>
    )
}
