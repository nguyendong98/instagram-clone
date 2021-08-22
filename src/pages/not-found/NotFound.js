import React, {useEffect} from 'react';

export default function NotFound() {

    useEffect(() => {
        document.title = 'Not Found! - Instagram'
    }, [])

    return (
        <div className="bg-gray-background h-screen flex justify-center items-center">
                <p className="text-center text-2xl">404 Error!</p>
        </div>
    )
}
