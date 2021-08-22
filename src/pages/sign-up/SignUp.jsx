import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from 'context/firebase';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes'
import Footer from 'components/footer/Footer';
import {doesUsernameExist} from 'services/firebase';

export default function SignUp() {

    const history = useHistory();
    const { authService, firebaseInstance } = useContext(FirebaseContext);
    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Sign up - Instagram';
    }, []);

    const onSubmit = async data => {
        const usernameExists = await doesUsernameExist(data.username)
        if (!usernameExists.length) {
            try {
                const createdUserResult = await authService
                    .createUserWithEmailAndPassword(data.emailAddress, data.password);

                await createdUserResult.user.updateProfile({
                    displayName: data.username
                })

                await firebaseInstance.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: data.username.toLowerCase(),
                    fullName: data.fullName,
                    emailAddress: data.emailAddress,
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })

                history.push(ROUTES.LOGIN);

            } catch (e) {
                setError(e.message);
            }
        } else {
            setError('The username is already taken, please try another!')
        }
    }

    return (
        <>
            <div className="container flex mx-auto max-w-screen-md  items-center h-screen">
                <div className="hidden md:flex w-3/5 ">
                    <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
                </div>
                <div className="flex mx-auto flex-col w-4/5 sm:w-3/5 md:w-2/5">
                    <div className="flex flex-col bg-white p-4 border border-gray-primary ">
                        <h1 className="flex justify-center w-full">
                            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4 object-contain"/>
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                aria-label="Enter your fullname"
                                type="text"
                                placeholder="Full name"
                                {...register("fullName", { required: "Full name is required!" })}
                                className="text-sm bg-gray-background text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            />
                            <input
                                aria-label="Enter your username"
                                type="text"
                                placeholder="User name"
                                {...register("username", { required: "Username is required!" })}
                                className="text-sm bg-gray-background text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            />
                            <input
                                aria-label="Enter your email"
                                type="text"
                                placeholder="Email address"
                                {...register("emailAddress", { required: "Email is required!" })}
                                className="text-sm bg-gray-background text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            />
                            <input
                                aria-label="Enter your password"
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: "Password is required!" })}
                                className="text-sm bg-gray-background text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            />
                            <button  type="submit" disabled={!formState.isValid}
                                     className={`bg-blue-medium text-white mt-2 w-full rounded h-8 font-bold ${!formState.isValid && 'opacity-50  cursor-not-allowed'}`}>
                                Sign Up
                            </button>
                            <div className="w-full text-center mt-2">
                                <small className="text-red-primary">{ error }</small>
                            </div>
                            <div className="flex items-center mt-3">
                                <div className="bg-gray-primary flex-grow" style={{height: '1px'}} />
                                <div className="uppercase px-4 text-sm text-gray-base">or</div>
                                <div className="bg-gray-primary flex-grow" style={{height: '1px'}}/>
                            </div>
                            <button type="button" className="border-0 text-sm text-blue-medium w-full text-center mt-5 mb-4">
                                Log in with Facebook
                            </button>
                        </form>
                    </div>
                    <div className="flex justify-center items-center w-full p-4 bg-white border border-gray-primary mt-2">
                        <p className="text-sm">Have an account? <Link to="/login" className="text-blue-medium font-bold">Log in</Link></p>
                    </div>
                    <div className="text-sm text-center my-3">Get the app.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="w-6/12 flex justify-end pr-1">
                            <img src="/images/appstore.png" className="w-4/5 object-contain" alt="appstore"/>

                        </div>
                        <div className="w-6/12 pl-1">
                            <img src="/images/google-play.png" className="w-4/5 object-contain" alt="google-play"/>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}
