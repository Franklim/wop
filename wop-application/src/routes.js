import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from './components/privaterouter'
import Home from './pages/home'
import Groups from './pages/groups'
import Persons from './pages/persons'
import Users from './pages/users'
import Login from './pages/login'

function Routes(){   

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component= {Login} />
                <PrivateRoute path="/home" exact component= {Home} />
                <PrivateRoute path="/groups" exact component= {Groups} />
                <PrivateRoute path="/persons" exact component= {Persons} />
                <PrivateRoute path="/users" exact component= {Users} />                
                
            </Switch>
        </BrowserRouter>
    );
    
}

export default Routes;