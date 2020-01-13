import React, { Component } from 'react'
import Axios from 'axios'
import style from './searchlist.module.scss'
import { withRouter } from 'react-router-dom'
class searchlist extends Component {
    state={
        itemlist:[],
        current:0,
        keyword:''
    }
    render() {
        return (
            <div>
                 <div className={style.listwrap}>
                    {
                        this.state.itemlist.length?
                    <ul className={style.list}>
                        {   
                            this.state.itemlist.map(item=>
                            (
                                item.type===1?    
                            <li key={item.id}>
                                <div className={style.box1}>
                                    <img src={item.image} alt=""></img>
                                </div>
                                <div className={style.box2}>
                            <h3 className={style.title}>{item.title}</h3>
                                    <p className={style.text}>
                            <span>{item.platform===1?'淘宝':'天猫'}</span>
                                        <span>包邮</span>
                                    </p>
                                    <div className={style.price}>
                                        <h6>
                                            <span>
                                                ￥{item.price}
                                            </span>
                                            <p className={style.bought}>{item.saleNum>10000?(Math.round(item.saleNum/1000)/10+'万人已买'):item.saleNum+'人已买'}</p>
                                        </h6>
                                        <span className={style.quan+' '}>{item.couponValue}</span>
                                    </div>
                                </div>
                            </li>:
                            <li key={item.id}>
                                <div className={style.card}>
                                    <img src={item.image} alt=""></img>
                                </div>
                            </li>
                            )
                            )}
                    </ul>:null
                    }
                </div>
            </div>
        )
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
                itemlist:res.data.data.list
            })
        })
    }
}
export default withRouter(searchlist)
