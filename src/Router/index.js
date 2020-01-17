import React from 'react'
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../App'
import Home from '../Views/Home/home'
import Error from '../Views/Error/error'
import Search from '../Views/Search/search'
import Column from '../Views/Column/column'
import keywordsSearch from '../Views/Search/keywordsSearch'
import Detail from '../Views/Detail/detail'
import {Provider} from 'react-redux'
import store from '../Redux/store'
import Category from '../Views/Category/category'
import SubColumn from '../Views/SubColumn/subColumn'

const router = (
<Provider store={store}>
    <HashRouter>
        <App>
            <Switch>
            <Route path="/home" render={()=>
                <Home>
                </Home>
            }></Route>
            <Route path="/category/:id" component={Category} exact></Route>
            <Route path="/column/:id/subColumn/:sid" component={SubColumn} exact></Route>
            <Route path="/c/:id" component={Detail} exact></Route>
            <Route path="/column/:id" component={Column} exact></Route>
            <Route path="/search" component={Search} exact></Route>
            <Route path="/s/:keyword" component={keywordsSearch} exact></Route>
            <Route path="/error" component={Error} exact></Route>
            <Redirect from="/" to="/home" exact></Redirect>
            <Redirect to="/error"></Redirect>
            </Switch>
        </App>
    </HashRouter>
</Provider>
)
export default router