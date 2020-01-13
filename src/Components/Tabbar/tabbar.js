import React, { Component } from 'react'
import Swiper from '../Swiper/swiper'
import style from './tabbar.module.scss'
import Axios from 'axios'
import { Link,withRouter} from 'react-router-dom'
import Search from '../Search/search'
class tabbar extends Component {  
    state={
        looplist:[],
        current:localStorage.getItem("index"),
        fix: false,
    }
    UNSAFE_componentWillMount(){
        if(this.props.history.location.pathname==='/home'){
            localStorage.setItem('index',1)
            this.setState({
                current:localStorage.getItem("index")
            })
        }
    }
    render() {
        return (
            <div className={style.nav} style={this.state.fix?{position:'fixed',top:'-42px',zIndex:100}:null}>
                <Search></Search>
                {
                    this.props.isShow?
                    <span className={style.return} onClick={()=>this.handleReturn()}>返回</span>:null
                }
                <i className={style.icon+" iconfont icon-nav-list "+ (this.props.isShow?style.hide:'')}></i>
                {
                    this.state.looplist.length?
                <Swiper options={
                    {
                        loop:false,
                        slidesPerView: 5,
                        spaceBetween:15
                    }
                } swipername="choose">
                    {
                                this.state.looplist.map((item,index)=>
                                <div key={index} className={(parseInt(this.state.current)===item.id)&&(this.props.match.path!=='/column')?'swiper-slide select active':'swiper-slide select'} onClick={()=>this.handleClick(item.id)}>
                                    <Link to={'/home/tab/'+item.id}>{item.name}</Link>
                                </div>
                                )
                    }
                </Swiper>:null
        }

            </div>
        )
    }
    handleClick(id){   
            localStorage.setItem("index",id)
        this.setState({
            current:localStorage.getItem("index")
        })
    }
    handleReturn(){
        this.props.history.push('/home')
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
        Axios.get("http://www.xiongmaoyouxuan.com/api/tabs?sa=").then(res=>{
          this.setState({
              looplist:res.data.data.list
          })
        })
    }
}
export default withRouter(tabbar)