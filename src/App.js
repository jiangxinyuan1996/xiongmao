import React,{Component}from 'react';
import './App.css';
import Tabbar from './Components/Tabbar/tabbar'
import {connect} from 'react-redux'

class App extends Component {
  render(){
    return <div>
      {
        this.props.isShow?
        <Tabbar></Tabbar>:null
      }
      {this.props.children}
    </div>
  }
}
const mapStateToProp = (state)=>{
  return {
    isShow:state.tabbarReducer.isShow
  }
}
export default connect(mapStateToProp)(App);
