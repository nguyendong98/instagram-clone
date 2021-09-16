import React, {useEffect} from 'react';
import Header from 'components/header/Header';
import Timeline from 'components/timeline/Timeline';
import Sidebar from 'components/sidebar/Sidebar';
import useUser from 'hooks/use-user';
import LoggedInUserContext from 'context/logged-in-user';

export default function Dashboard({ user: loggedInUser }) {
    const { user, setActiveUser } = useUser(loggedInUser?.uid);
    useEffect(() => {
        document.title = 'Instagram';
    }, [])

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    )
}
