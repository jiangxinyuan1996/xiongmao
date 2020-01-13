import React, { Component } from 'react'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import TabHome from '../Tab/home'
import Tab from '../Tab/tab'
export default class Home extends Component {
    render() {
        return (
            <div>
                 <Switch>
                    <Route path="/home" component={TabHome} exact></Route>
                    <Redirect from="/home/tab/1" to="/home" exact></Redirect>
                    <Route path="/home/tab/:myid" component={Tab} exact></Route>
                </Switch>
            </div>
        )
    }
}
