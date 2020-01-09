import React from 'react'
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../App'
import Home from '../Views/Home/home'



const router = <HashRouter>
    <App>
        <Switch>
        <Route path="/" render={()=>
            <Home>
            </Home>
        }></Route>
        <Redirect from="/" to="/" exact></Redirect>
        <Redirect to="/error"></Redirect>
        </Switch>
    </App>
</HashRouter>
export default router