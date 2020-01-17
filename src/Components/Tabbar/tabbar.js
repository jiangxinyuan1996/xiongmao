import React, { Component } from 'react'
import Swiper from '../Swiper/swiper'
import style from './tabbar.module.scss'
import Axios from 'axios'
import { withRouter} from 'react-router-dom'
import Search from '../Search/search'
class tabbar extends Component {  
    state={
        looplist:[],
        current:localStorage.getItem("index"),
        name:'',
        fix: false,
        isShow:false
    }
    UNSAFE_componentWillMount(){
        if(this.props.history.location.pathname==='/home'){
            localStorage.setItem('index',0)
            this.setState({
                current:localStorage.getItem("index")
            })
        }
    }
    render() {
        return (
            <div className={style.wrapper}>
            <div className={style.nav} style={this.state.fix?{position:'fixed',top:'-42px',zIndex:100}:null}>
                {
                    this.props.iconShow===undefined?
                    <Search></Search>:<Search searchname={true} input={false} name={this.state.name}></Search>
                }
                {
                    this.props.isShow?
                    <span className={style.return} onClick={()=>this.handleReturn()}>返回</span>:null
                }
                {
                    this.props.iconShow===undefined?
                    <i className={style.icon+" iconfont icon-nav-list "+ (this.props.isShow?style.hide:'')} onClick={()=>this.handleList()}></i>:null
                }
                {
                    this.state.looplist.length?
                <Swiper options={
                    {
                        loop:false,
                        slidesPerView: 5,
                        spaceBetween:15
                    }
                } swipername={this.props.iconShow===undefined?"choose":"allshow"}>
                    {
                                this.state.looplist.map((item,index)=>
                                <div key={index} className={(parseInt(this.state.current)===index)&&(this.props.match.path!=='/column/:id')&&(this.props.match.path!=='/category/:id')?'swiper-slide select active':'swiper-slide select'} onClick={()=>this.handleClick(index)}>
                                    {/* <Link to={this.props.iconShow===false?('/column/29/subColumn/')+item.id:('/home/tab/'+item.id)}>{item.name}</Link> */}
                                    <span onClick={()=>this.handleSub(item.id)}>{item.name}</span>
                                </div>
                                )
                    }
                </Swiper>:null
        }
            </div>
            {
                this.state.looplist.length&&this.state.isShow?
                <div className={style.listwrap} style={this.state.fix?{position:'fixed',top:'0',zIndex:100}:null}>
                    <div className={style.title}><h2><span>全部分类</span><b onClick={()=>this.handleList()}>X</b></h2></div>
                    <ul className={style.list}>
                    {
                        this.state.looplist.map((item,index)=>
                            <li className={style.item} key={index} onClick={()=>this.handleDump(item.id)}>
                                <img src={item.imageUrl} alt=""></img>
                                <p>{item.name}</p>
                            </li>
                            )
                        }
                    </ul>
                    <div className={style.back}></div>
            </div>:null
            }
            </div>
        )
    }
    handleClick(id){   
            localStorage.setItem("index",id)
        this.setState({
            current:localStorage.getItem("index")
        })
        document.documentElement.scrollTop=0
    }
    handleReturn(){
        this.props.history.push('/home')
    }
    handleList(){
        this.setState({
            isShow:!this.state.isShow
        })
    }
    handleDump(id){
        this.setState({
            isShow:!this.state.isShow
        })
        localStorage.setItem("index",id)
        this.setState({
            current:localStorage.getItem("index")
        })
        this.props.history.push('/home/tab/'+id)
    }
    handleSub(id){
        if(this.props.iconShow===false){
            this.props.history.push('/column/'+this.props.match.params.id+'/subColumn/'+id)
        }else{
            this.props.history.push('/home/tab/'+id)
        }
    }
    bindHandleScroll(){
        if(document.documentElement.scrollTop>42){
            this.setState({
                fix:true
            })
        }else{
            this.setState({
                fix:false
            })
        }
    }
    componentDidMount(){    
        window.addEventListener('scroll', this.bindHandleScroll.bind(this))
        if(this.props.match.params.id){
            if(this.props.iconShow===false){
                Axios.get(`http://www.xiongmaoyouxuan.com/api/column/${this.props.id}`).then(res=>{
                    this.setState({
                        looplist:res.data.data.subColumns,
                        name:res.data.data.name
                    })
                })
            }else{
                Axios.get("http://www.xiongmaoyouxuan.com/api/tabs?sa=").then(res=>{
                    this.setState({
                        looplist:res.data.data.list,
                    })
                })
            }
        }else{
        Axios.get("http://www.xiongmaoyouxuan.com/api/tabs?sa=").then(res=>{
            this.setState({
                looplist:res.data.data.list
            })
        })}
    }
        
    
}
export default withRouter(tabbar)