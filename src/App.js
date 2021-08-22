import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import useAuthListener from 'hooks/use-auth-listener';
import UserContext from 'context/user';

const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const Login = lazy(() => import('pages/login/Login'));
const SignUp = lazy(() => import('pages/sign-up/SignUp'));
const NotFound = lazy(() => import('pages/not-found/NotFound'))

export default function App() {

    const { user } = useAuthListener();

    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <Suspense
                    fallback={
                        <div className="h-screen w-full flex justify-center items-center text-xs text-gray-base">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"/>
                        </div>
                    }
                >
                    <Switch>
                        <Route path={ROUTES['LOGIN']} component={Login} />
                        <Route path={ROUTES['DASHBOARD']} exact component={Dashboard} />
                        <Route path={ROUTES['SIGN_UP']} component={SignUp} />
                        <Route path={ROUTES['NOT_FOUND']} component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>

    );
}

