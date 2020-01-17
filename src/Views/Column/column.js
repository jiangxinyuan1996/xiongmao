import React, { Component } from 'react'
import Tabbar from '../../Components/Tabbar/tabbar'
import {connect} from 'react-redux'
import {showAction,hideAction} from '../../Redux/Actions/tabAction'
import style from './column.module.scss'
import ColumnList from './columnlist'
import {PullToRefresh} from 'antd-mobile'
import Axios from 'axios'
 class column extends Component {
     state={
         cover:'',
         columnlist:[],
         start:20
     }
    render() {
        return (
            <div>
                <Tabbar isShow={true}></Tabbar>
                {
                    this.state.cover?
                    <div className={style.banner}><img src={this.state.cover} alt=""></img></div>:null
                }
                {
                    this.state.columnlist.length?
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
                    <ColumnList item={this.state.columnlist} key={this.state.columnlist}></ColumnList>
                    </PullToRefresh>:null
                }
            </div>
        )
    }
    refresh = ()=>{
        Axios.get(`http://www.xiongmaoyouxuan.com/api/column/${this.props.match.params.id}/items?start=${this.state.start}`).then(res=>{
                this.setState({
                    refreshing: false,
                    columnlist:[...this.state.columnlist,...res.data.data.list],
                    start:this.state.start+20
                })
            })
    }
    componentWillUnmount(){
        this.props.showAction()
    }
    componentDidMount(){
        this.props.hideAction()
            Axios.get(`http://www.xiongmaoyouxuan.com/api/column/${this.props.match.params.id}`).then(res=>{
                this.setState({
                    cover:res.data.data.cover
                })
            })
        Axios.get(`http://www.xiongmaoyouxuan.com/api/column/${this.props.match.params.id}/items?start=0`).then(res=>{
            this.setState({
                columnlist:res.data.data.list
            })
        })
        
    }
}
const mapStateToProp = null
const mapDispatchToProps = {
    showAction,
    hideAction
}
export default connect(mapStateToProp,mapDispatchToProps)(column)
