import React, {useContext} from 'react';
import FirebaseContext from 'context/firebase';
import UserContext from 'context/user';
import {Link} from 'react-router-dom';
import * as ROUTES from 'constants/routes';

export default function Header() {

    const { authService } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-md h-full">
                <div className="flex justify-between h-full">
                    <div className="text-center flex justify-center items-center cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES['DASHBOARD']}  aia-label="Instagram logo">
                                <img src="/images/logo.png" alt="Instagram" className="w-6/12" />
                            </Link>

                        </h1>
                    </div>
                    <div className="flex justify-center items-center text-center cursor-pointer">
                        {user ? (
                            <>
                                <Link to={ROUTES['DASHBOARD']}  aia-label="Dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                </Link>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => authService.signOut()}
                                    onKeyDown={async e => {
                                        if (e.key === 'Enter') await authService.signOut();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-5" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                    </svg>
                                </button>
                                <div className="flex items-center cursor-pointer">
                                    <Link to={`/profile/${user.displayName}`}>
                                        <img
                                            className="rounded-full h-8 w-8 flex"
                                            src={`/images/avatars/${user.displayName}.jpg`}
                                            alt="profile picture"
                                        />
                                    </Link>
                                </div>

                            </>

                        ) : (
                            <>
                                <Link to={ROUTES['LOGIN']}>
                                    <button
                                        type="button"
                                        className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                    >
                                        Log In
                                    </button>

                                </Link>
                                <Link to={ROUTES['SIGN_UP']}>
                                    <button
                                        type="button"
                                        className="border-0 font-bold text-sm rounded text-blue-medium w-20 h-8"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )

                        }
                    </div>
                </div>
            </div>
        </header>
    )
}