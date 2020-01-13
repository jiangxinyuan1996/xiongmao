import React, { Component } from 'react'
import axios from 'axios'
import style from './bige.module.scss'
import { PullToRefresh } from 'antd-mobile';
import 'antd-mobile/lib/date-picker/style/css'; 

export default class bige extends Component {
    state = {
        datalist: [],
     
        id: null,
        refreshing:false,
        num:0,
    }
    render() {
        return (
            <div className={style.bige}>
                <PullToRefresh
                    damping={60}
                    // ref={el => this.ptr = el}
                    style={{

                          height: this.state.height,
                        overflow: 'auto',
                    }}
                    // indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                >

                <ul>{
                    this.state.datalist.map((item,index) =>
                        <li key={index} onClick={() => this.handleClick(item.id)}>
                            <img src={item.image}></img>
                            <div className={style.wrap}>
                                <h3>{item.title}</h3>
                                <div className={style.middle}>
                                    {item.platform == 1 ? <span className={style.platform}>淘宝</span> : <span className={style.platform + " " + style.miao}>天猫</span>}
                                    <span className={style.big}>{item.keywords ? item.keywords.reverse().slice(0, 1) : ''}</span>
                                    <span className={style.by}>包邮</span>
                                </div>
                                <div className={style.foot}>
                                    <span className={style.left}><i>￥</i>{item.price}</span>
                                    <span className={style.saleNum}>
                                        {item.saleNum < 10000 ? item.saleNum + '人已买' : item.saleNum.toString().substr(0, 1) + '.' + item.saleNum.toString().substr(1, 2) + '万人已买'}
                                    </span>
                                    <span className={style.couponValue}>{item.couponValue}</span>
                                </div>

                            </div>
                        </li>
                    )

                }
                </ul>
                </PullToRefresh>

            </div>
        )
    }
    handleClick = (id) => {
        this.props.history.push(`/column/${id}`)
    }
    refresh=()=>{
    this.setState({
        refreshing:true,
        num:this.state.num+20,
    })
    axios.get(`http://www.xiongmaoyouxuan.com/api/sub_column/174/items?start=${this.state.num}`).then(res=>{
        console.log(res.data.data.list)
        this.setState({ 
            refreshing:false,  
            datalist:[...this.state.datalist,...res.data.data.list]
        })
    })
    }
    componentDidMount() {
        
        axios.get(`http://www.xiongmaoyouxuan.com/api/sub_column/174/items?start=${this.state.num}`).then(res => {
            console.log(res.data.data)
            this.setState({
                datalist: res.data.data.list,
            })
            // console.log(this.state.id)

        })
    }

}
