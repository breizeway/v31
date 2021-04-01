import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

import * as locationActions from '../../store/location'


const ProtectedRoute = props => {
    const dispatch = useDispatch()

    dispatch(locationActions.addRedirect(useLocation().pathname))
    const authenticated = useSelector(state => state.session.user)

    return (
        <Route {...props}>
            {authenticated ? props.children  : <Redirect to='/login' />}
        </Route>
    )
}


export default ProtectedRoute
