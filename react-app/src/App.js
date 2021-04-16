import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import LoginPage from './components/LoginPage';
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
    const currentPath = useLocation().pathname

    const [loaded, setLoaded] = useState(false);
    const authenticated = useSelector(state => state.session.user)

    useEffect(() => {
        (async () => {
            await dispatch(sessionActions.restore())
            setLoaded(true);
        })();
        dispatch(locationActions.addCurrentPath(currentPath))
    }, [dispatch, currentPath]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <MainContent>
                <Switch>
                    <Route path='/login' exact={true}>
                        <LoginPage />
                    </Route>
                    <Route path='/signup' exact={true}>
                        <SignUpForm />
                    </Route>
                    <Route path='/' exact={true}>
                        {authenticated ? <Redirect to='/discover' /> : <Redirect to='/discover' />}
                    </Route>
                    <Route path='/discover' exact={true}>
                        <ListsRepeater dir={[
                            { listsType: 'next', listsTitle: 'Coming Soon'},
                        ]} />
                    </Route>
                    <Route path='/lists/:listId' exact={true}>
                        <List />
                    </Route>
                    <ProtectedRoute path='/my' exact={true}>
                        <User />
                        <ListsRepeater dir={[
                            { listsType: 'my', listsTitle: 'My Lists'},
                        ]} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/my/lists/new' exact={true}>
                        <User>
                            <NewList />
                        </User>
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
