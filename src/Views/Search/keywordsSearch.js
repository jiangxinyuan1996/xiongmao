import React, { Component } from 'react'
import Search from '../../Components/Search/search'
import {hideAction,showAction} from '../../Redux/Actions/tabAction'
import { connect } from 'react-redux'
import style from './keywords.module.scss'
import SearchList from './searchlist'
class keywordsSearch extends Component {
    state={
        current:0,
        currentlist:["默认","价格最低","销量最高"]
    }
    componentWillUnmount(){
        this.props.showAction()
    }
    render() {
        return (
            <div>
                <div className={style.header}>
                    <Search searchname={true}></Search>
                    <ul className={style.nav}>
                        {
                            this.state.currentlist.map((item,index)=>
                            <li key={index} className={style.list+' '+(this.state.current===index?style.active:'')} onClick={()=>this.handleClick(index,item)}>{item}</li>
                            )
                        }
                    </ul>
                </div>
                {
                    //---------------------------商品列表---------------------------
                }        
                <SearchList current={this.state.current} keyword={this.props.match.params.keyword}></SearchList>
            </div>
        )
    }
    handleClick(index){
        this.setState({
            current:index
        })
    }
    componentDidMount(){
        this.props.hideAction()
    }
}

const mapStateToProp = null
const mapDispatchToProps = {
    hideAction,
    showAction
}
export default connect(mapStateToProp,mapDispatchToProps)(keywordsSearch)
