import React, { Component } from 'react'
import style from './columnlist.module.scss'
import { withRouter } from 'react-router-dom'
class columnlist extends Component {
    state={
        itemlist:this.props.item
    }
    render() {
        return (
            <div>
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
            </div>
        )
    }
}
export default withRouter(columnlist)
