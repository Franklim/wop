import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home'
import Groups from './pages/groups'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component= {Home} />
                <Route path="/groups" exact component= {Groups} />
                
            </Switch>
        </BrowserRouter>
    );
    
}

export default Routes;