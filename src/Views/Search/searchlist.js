import React, { Component } from 'react'
import Axios from 'axios'
import style from './searchlist.module.scss'
import { withRouter } from 'react-router-dom'
import {PullToRefresh} from 'antd-mobile'
class searchlist extends Component {
    state={
        itemlist:[],
        current:0,
        start:0,
        keyword:''
    }
    render() {
        return (
            <div>
                 <div className={style.listwrap}>
                    {
                        this.state.itemlist.length?
                    <ul className={style.list}>
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
                        {   
                            this.state.itemlist.map((item,index)=>
                            (
                                item.type===1?    
                            <li key={index} onClick={()=>this.handleClick(item.id)}>
                                <div className={style.box1}>
                                    <img src={item.image} alt=""></img>
                                </div>
                                <div className={style.box2}>
                            <h3 className={style.title}>{item.title}</h3>
                                    <p className={style.text}>
                            <span>{item.platform===1?'淘宝':'天猫'}</span>
                            {
                                item.keywords.length?
                                <span className={style.keyword}>{item.keywords[0]}</span>:null
                            }
                                        <span>包邮</span>
                                    </p>
                                    <div className={style.price}>
                                        <h6>
                                            <span>
                                                ￥{item.price}
                                            </span>
                                            <p className={style.bought}>{item.saleNum>10000?(Math.round(item.saleNum/1000)/10+'万人已买'):item.saleNum+'人已买'}</p>
                                        </h6>
                                        {
                                            item.couponValue?
                                            <span className={style.quan}>{item.couponValue}</span>:null
                                        }
                                    </div>
                                </div>
                            </li>:
                            <li key={index}>
                                <div className={style.card}>
                                    <img src={item.image} alt=""></img>
                                </div>
                            </li>
                            )
                            )}
                            </PullToRefresh>
                    </ul>:null
                    }
                </div>
            </div>
        )
    }
    refresh = ()=>{
        Axios.get(`http://www.xiongmaoyouxuan.com/api/search?word=${encodeURIComponent(this.state.keyword)}&start=${this.state.start}&sort=${this.state.current}&couponOnly=NaN&minPrice=0&maxPrice=99999`).then(res=>{
                this.setState({
                    refreshing: false,
                    itemlist:[...this.state.itemlist,...res.data.data.list],
                    start:this.state.start+40
                })
            })
    }
    handleClick(id){
        this.props.history.push('/c/'+id)
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if((this.state.current===nextProps.current)&&this.state.keyword===nextProps.keyword){
            return
        }
            Axios.get(`http://www.xiongmaoyouxuan.com/api/search?word=${encodeURIComponent(nextProps.keyword)}&start=0&sort=${nextProps.current}&couponOnly=NaN&minPrice=0&maxPrice=99999`).then(res=>{
                this.setState({
                    itemlist:res.data.data.list,
                    current:nextProps.current,
                    keyword:nextProps.keyword
                })
            })
    }
    componentDidMount() {
        Axios.get(`http://www.xiongmaoyouxuan.com/api/search?word=${encodeURIComponent(this.props.keyword)}&start=0&sort=${this.state.current}&couponOnly=NaN&minPrice=0&maxPrice=99999`).then(res=>{
            this.setState({
                itemlist:res.data.data.list,
                keyword:this.props.keyword
            })
        })
    }
}
export default withRouter(searchlist)
