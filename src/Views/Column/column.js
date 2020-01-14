import React, { Component } from 'react'
import Tabbar from '../../Components/Tabbar/tabbar'
import {connect} from 'react-redux'
import {showAction,hideAction} from '../../Redux/Actions/tabAction'
import style from './column.module.scss'
import ColumnList from './columnlist'
import Axios from 'axios'
 class column extends Component {
     state={
         cover:'',
         columnlist:[]
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
                    <ColumnList item={this.state.columnlist}></ColumnList>:null
                }
            </div>
        )
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
