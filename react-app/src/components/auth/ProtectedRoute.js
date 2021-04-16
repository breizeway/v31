import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

import * as locationActions from '../../store/location'


const ProtectedRoute = props => {
    const dispatch = useDispatch()

    dispatch(locationActions.addRedirect(useLocation().pathname))
    const loggedIn = useSelector(state => state.session.loggedIn)

    return (
        <Route {...props}>
            {loggedIn ? props.children  : <Redirect to='/login' />}
        </Route>
    )
}


export default ProtectedRoute
