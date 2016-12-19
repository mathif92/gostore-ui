import React from 'react';
import {render} from 'react-dom';
import {createHashHistory, useBasename} from 'history';
import {Router} from 'react-router';
import "./common/styles/app.less";
import NProgress from 'nprogress';

NProgress.configure({showSpinner: true});

const history = useBasename(createHashHistory)({
    queryKey: false
})

const rootRoute = {
    path: '/',
    component: require('./components/layouts/Base'),
    indexRoute: {component: require('./components/pages/Login')},
    childRoutes: [
        {
            path: '/dashboard',
            component: require('./components/layouts/Dashboard'),
            indexRoute: {component: require('./components/pages/dashboard/Categories')},
            childRoutes: [
                require('./components/pages/dashboard/Categories'),
                require('./components/pages/dashboard/Products'),
                require('./components/pages/dashboard/Reports')
            ]
        },
        // {
        //     path: '/login',
        //     component: require('./components/pages/Login'),
        //     childRoutes: []
        // },
        {
            path: '/register',
            component: require('./components/pages/SignUp'),
            childRoutes: []
        }
    ]
}

render(
    <Router history={history} routes={rootRoute}/>,
    document.getElementById('app')
)

export default history;