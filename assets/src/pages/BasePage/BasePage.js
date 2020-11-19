import React, { useEffect } from 'react';
import { WithStore } from '../../store';
import { getUser } from '../../store/actions/UserAction';
import Router from '../Router/Router';
import RouterPublic from '../Router/Router.public';

const BasePage = (props) => {
    if (!props.auth.isAuthenticated)
        return <RouterPublic />

    useEffect(() => {
        props.getUser()
    })

    return <Router />;
}

export default WithStore(BasePage, ['auth'], [{ 'getUser': getUser }])