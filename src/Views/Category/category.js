import React, { Component } from 'react'
import Tabbar from '../../Components/Tabbar/tabbar'
import { hideAction,showAction} from '../../Redux/Actions/tabAction'
import CategoryList from '../Column/columnlist'
import { connect } from 'react-redux'
import Axios from 'axios'
import {PullToRefresh} from 'antd-mobile'

 class category extends Component {
     state={
         itemlist:[],
         start:20
     }
    render() {
        return (
            <div>
                <Tabbar isShow={true}></Tabbar>
                {   
                    this.state.itemlist.length?
                    <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                    height: this.state.height,
                    overflow: 'auto',
                    }}
                    indicator={{deactivate: '上拉刷新' ,finish:'上拉刷新'}}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                >
                    <CategoryList item={this.state.itemlist} key={this.state.itemlist}></CategoryList>
                    </PullToRefresh>:null
                }
            </div>
        )
    }
    refresh = ()=>{
        Axios.get(`http://www.xiongmaoyouxuan.com/api/category/${this.props.match.params.id}/items?start=${this.state.start}&sort=0`).then(res=>{
                this.setState({
                    refreshing: false,
                    itemlist:[...this.state.itemlist,...res.data.data.items.list],
                    start:this.state.start+20,
                })
            })
    }
    componentWillUnmount(){
        this.props.showAction()
    }
    componentDidMount(){
        this.props.hideAction()
        Axios.get(`http://www.xiongmaoyouxuan.com/api/category/${this.props.match.params.id}/items?start=0&sort=0`).then(res=>{
            this.setState({
                itemlist:res.data.data.items.list
            })
        })
    }
}
const mapStateToProp = null
const mapDispatchToProps = {
    showAction,
    hideAction
}
export default connect(mapStateToProp,mapDispatchToProps)(category)