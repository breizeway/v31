import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import Search from './components/Search';
import * as sessionActions from './store/session'


function App() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(sessionActions.restore())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users/:userId' exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true}>
                    <h1>My Home Page</h1>
                </ProtectedRoute>
                <ProtectedRoute path='/search' exact={true}>
                    <Search />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
