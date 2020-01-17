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
                 <div className={style.listwrap} key={this.props.key}>
                    {
                        this.state.itemlist.length?
                    <ul className={style.list}>
                        {   
                            this.state.itemlist.map(item=>
                            (
                                item.type===1?    
                            <li key={item.id} onClick={()=>this.handleClick(item.id)}>
                                <div className={style.box1}>
                                    <img src={item.image} alt=""></img>
                                </div>
                                <div className={style.box2}>
                            <h3 className={style.title}>{item.title}</h3>
                                    <p className={style.text}>
                            <span>{item.platform===1?'淘宝':'天猫'}</span>
                            {
                                item.keywords.length?
                                <span style={{position:'absolute',left:'.3rem',color: '#ff9000',boxShadow: 'inset 0 0 0 1px #ff9000',borderRadius:'.025rem',padding:'0 .015rem'}}>{item.keywords[0]}</span>:null
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
    handleClick(id){
        this.props.history.push('/c/'+id)
    }
}
export default withRouter(columnlist)
