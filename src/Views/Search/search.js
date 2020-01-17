import React, { Component } from 'react'
import Search from '../../Components/Search/search'
import style from './search.module.scss'
import Axios from 'axios'
import {connect} from 'react-redux'
import {showAction,hideAction} from '../../Redux/Actions/tabAction'
class search extends Component {
    state={
        hotlist:[],
        categorylist:[],
        keyword:''
    }
    componentWillUnmount(){
        this.props.showAction()
    }
    render() {
        return (
            <div className={style.wrap}>
                <Search keyword={this.state.keyword} searchname={true}></Search>
                {
                        this.state.hotlist.length?
                <div className={style.hot}>
                    <h2 className={style.title}>热门搜索</h2>
                    {
                        this.state.hotlist.map((item,index)=>
                        (index<8?
                        <span key={index} className={style.hotwords+' '+(item.highlight?style.highlight:'')} onClick={()=>this.handleClick(item.word)}>{item.word}</span>:null    
                        )
                        )}
                </div>:null
                }
                {
                    this.state.categorylist.length?
                <div className={style.category}>
                    <h2 className={style.title}>商品分类</h2>
                    {
                        this.state.categorylist.map((item,index)=>
                        <div key={index} className={style.goods}>{item.name}</div>        
                    )
                    }
                </div>:null
                }
            </div>
        )
    }
    handleClick(keyword){
        this.setState({
            keyword
        })
        this.props.history.push('/s/'+keyword)
    }
    componentDidMount() {
        this.props.hideAction()
        Axios.get("http://www.xiongmaoyouxuan.com/api/search/home").then(res=>{
            // console.log(res.data.data.hotWords)
            this.setState({
                hotlist:res.data.data.hotWords
            })
        })
        Axios.get("http://www.xiongmaoyouxuan.com/api/tabs?sa=").then(res=>{
            this.setState({
                categorylist:res.data.data.list.slice(1)
            })
        })
    }
    
}
const mapStateToProp = null
const mapDispatchToProps = {
    showAction,
    hideAction
}
export default connect(mapStateToProp,mapDispatchToProps)(search)
