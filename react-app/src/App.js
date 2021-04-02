import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import NewList from './components/forms/NewList';
import List from './components/List';
import Dev from './components/Dev';
import ListsRepeater from './components/ListsRepeater';
import * as sessionActions from './store/session'
import * as locationActions from './store/location'


function App() {
    const dispatch = useDispatch()
    dispatch(locationActions.addCurrentPath(useLocation().pathname))

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
            <MainContent>
                <Switch>
                    <Route path='/login' exact={true}>
                        <LoginForm />
                    </Route>
                    <Route path='/sign-up' exact={true}>
                        <SignUpForm />
                    </Route>
                    <Route path='/' exact={true}>
                        {authenticated ? <Redirect to='/discover' /> : <Redirect to='/discover' />}
                    </Route>
                    <Route path='/discover' exact={true}>
                        <ListsRepeater dir={{next: 'Coming Soon'}} />
                    </Route>
                    <ProtectedRoute path='/my' exact={true}>
                        <User />
                        <ListsRepeater dir={{my: 'My Lists'}} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/my/lists/new' exact={true}>
                        <User>
                            <NewList />
                        </User>
                    </ProtectedRoute>
                    <ProtectedRoute path='/my/lists/:listId' exact={true}>
                        <List />
                    </ProtectedRoute>
                    <ProtectedRoute path='/dev' exact={true}>
                        <Dev />
                    </ProtectedRoute>
                </Switch>
            </MainContent>
        </BrowserRouter>
    );
}


export default App;
