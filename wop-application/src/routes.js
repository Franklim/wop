import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home'
import Groups from './pages/groups'
import Persons from './pages/persons'
import Users from './pages/users'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component= {Home} />
                <Route path="/groups" exact component= {Groups} />
                <Route path="/persons" exact component= {Persons} />
                <Route path="/users" exact component= {Users} />
                
            </Switch>
        </BrowserRouter>
    );
    
}

export default Routes;