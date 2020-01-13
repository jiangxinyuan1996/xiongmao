import React from 'react'
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../App'
import Home from '../Views/Home/home'
// import Detail from '../Views/Detail/detail'
// import Bige from '../Views/Bige/bige'



const router = <HashRouter>
    <App>
        <Switch>
            <Route path="/home" render={() =>
                <Home>
                </Home>
            } ></Route>


            {/* <Route path="/column/:myid" component={Detail} exact/>
        <Route path="/column" component={Bige}/> */}

           
            <Redirect from="/" to="/home" exact></Redirect>
            <Redirect to="/error"></Redirect>
        </Switch>
    </App>
</HashRouter>
export default router