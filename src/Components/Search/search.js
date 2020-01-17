import React, { Component } from 'react'
import style from './search.module.scss'
import { withRouter } from 'react-router-dom'
 class search extends Component {
    render() {
        return (
            <div>
                <div className={style.wrap}>
                    {
                        this.props.searchname?
                        <span className={style.goback} onClick={()=>this.handleDump()}>返回</span>:null
                    }
                    {
                        this.props.input===undefined?
                        <input className={style.input} type="text" placeholder="搜索商品, 发现更多优选" onClick={()=>this.handleClick()} ref="inputValue"></input>
                        :<h3 style={{width:'84%',textAlign:'center',paddingRight:'.3rem',boxSizing:'border-box'}}>{this.props.name}</h3>
                    }
                    {
                        this.props.searchname&&this.props.input===undefined?
                        <span className={style.search} onClick={()=>this.handleSearch(this.refs.inputValue.value)}>搜索</span>:null
                    }
                </div>
            </div>
        )
    }
    handleClick(){
        if(this.props.history.location.pathname==="/search"){
            return
        }else if(this.props.history.location.pathname===("/s/"+this.props.match.params.keyword)){
            return
        }
        this.props.history.push('/search')
    }
    handleDump(){
        this.props.history.push("/home")
    }
    handleSearch(keyword){
        if(keyword.trim()===''){
            return
        }
        this.props.history.push("/s/"+keyword)
    }
    componentDidMount(){
        if(this.props.match.params.keyword){
            this.refs.inputValue.value=this.props.match.params.keyword   
        }
    }
}
export default withRouter(search)
