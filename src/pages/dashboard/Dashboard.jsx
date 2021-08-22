import React, {useEffect} from 'react';
import Header from 'components/header/Header';
import Timeline from 'components/timeline/Timeline';
import Sidebar from 'components/sidebar/Sidebar';

export default function Dashboard() {

    useEffect(() => {
        document.title = 'Instagram';
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}
