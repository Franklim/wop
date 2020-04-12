import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
                <Route path="/home" component= {Home} />
                <Route path="/groups" component= {Groups} />
                <Route path="/persons" component= {Persons} />
                <Route path="/users" component= {Users} />                
                
            </Switch>
        </BrowserRouter>
    );
    
}

export default Routes;