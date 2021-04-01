import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import Search from './components/Search';
import Lists from './components/Lists';
import * as sessionActions from './store/session'


function App() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const authenticated = useSelector(state => state.session.user)

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
                <Route path='/' exact={true}>
                    {authenticated ? <Redirect to='/search' /> : <Redirect to='/discover' />}
                </Route>
                <Route path='/discover' exact={true}>
                    <Lists type='next'/>
                </Route>
                <ProtectedRoute path='/users/:userId' exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/search' exact={true}>
                    <Search />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
