import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import style from './tab.module.scss'
import ColumnList from '../Column/columnlist'
import {PullToRefresh} from 'antd-mobile'

class tab extends Component {
    state={
        title:'',
        categorylist:[],
        itemlist:[],
        key:0,
        start:20
    }
    render() {
        return (
            <div>
                <div className={style.wrap}>
                    <div className={style.splitline}>
                        <span className={style.line}></span>
                        {
                            this.state.title?
                            <span className={style.text}>{this.state.title}</span>:null
                        }
                        <span className={style.line}></span>
                    </div>
                    {
                    this.state.categorylist.length?
                    <ul className={style.list}>
                    {
                        this.state.categorylist.map((item,index)=>
                            <li className={style.item} key={index} onClick={()=>this.handleClick(item.url)}>
                                <img src={item.imageUrl} alt=""></img>
                                <p>{item.title}</p>
                            </li>
                            )
                        }
                </ul>:null
                }
                    <div className={style.splitline} style={{background:'#f5f5f5'}}>
                        <span className={style.line}></span>
                        {
                            this.state.title?
                            <span className={style.text}>大家都在逛</span>:null
                        }
                        <span className={style.line}></span>
                    </div>
                </div>
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
                    <ColumnList item={this.state.itemlist} key={this.state.itemlist+this.state.key}></ColumnList>
                    </PullToRefresh>:null
                }
            </div>
        )
    }
    refresh = ()=>{
        Axios.get(`http://www.xiongmaoyouxuan.com/api/tab/${this.props.match.params.myid}?start=${this.state.start}`).then(res=>{
                this.setState({
                    refreshing: false,
                    itemlist:[...this.state.itemlist,...res.data.data.items.list],
                    start:this.state.start+20,
                })
            })
    }
    handleClick(id){
        

        if(id.indexOf("category")===-1){
            this.props.history.push('/column/'+id.slice(-4))
        }else if(id.indexOf("category")!==-1){
            this.props.history.push('/category/'+id.slice(-4))
        }
    }
    UNSAFE_componentWillReceiveProps(nextprops){
        Axios.get(`http://www.xiongmaoyouxuan.com/api/tab/${nextprops.match.params.myid}?start=0`).then(res=>{
            this.setState({
                title:res.data.data.categoriesTitle,
                categorylist:res.data.data.categories,
                itemlist:res.data.data.items.list,
                key:nextprops.match.params.myid
            })
        })
    }
    componentDidMount(){
        Axios.get(`http://www.xiongmaoyouxuan.com/api/tab/${this.props.match.params.myid}?start=0`).then(res=>{
            this.setState({
                title:res.data.data.categoriesTitle,
                categorylist:res.data.data.categories,
                itemlist:res.data.data.items.list
            })
        })
    }
}
export default withRouter(tab)
