import React, { Component } from 'react'
import Tabbar from '../../Components/Tabbar/tabbar'
// import { PullToRefresh } from 'antd-mobile';
import {hideAction,showAction} from '../../Redux/Actions/tabAction'
import { connect } from 'react-redux';
import SubList from '../Column/columnlist'
import Axios from 'axios';

class bige extends Component {
    state={
        itemlist:[]
    }
    render(){
        return <div>
            <Tabbar isShow={false} iconShow={false} id={this.props.match.params.id}></Tabbar>
            {
                this.state.itemlist.length?
                <SubList item={this.state.itemlist} key={this.state.itemlist}></SubList>:null
            }
        </div>
    }
    componentWillUnmount(){
        this.props.showAction()
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        Axios.get(`http://www.xiongmaoyouxuan.com/api/sub_column/${nextProps.match.params.sid}/items?start=0`).then(res=>{
            this.setState({
                itemlist:res.data.data.list
            })
        })
    }
    componentDidMount() {
        this.props.hideAction()
        Axios.get(`http://www.xiongmaoyouxuan.com/api/sub_column/${this.props.match.params.sid}/items?start=0`).then(res=>{
            this.setState({
                itemlist:res.data.data.list
            })
        })
    }

}
const mapStateToProp = null
const mapDispatchToProps = {
    hideAction,
    showAction
}
export default connect(mapStateToProp,mapDispatchToProps)(bige)
