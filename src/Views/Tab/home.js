import React, { Component } from 'react'
import Swiper from '../../Components/Swiper/swiper'
import axios from 'axios'
import style from './home.module.scss'
import { withRouter} from 'react-router-dom'
import {PullToRefresh} from 'antd-mobile'

// import { PullToRefresh } from 'antd-mobile'
class home extends Component {
    state={
        banlist:[],
        gridlist:[],
        toplist:[],
        iconlist:[
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAMAAAD79pkTAAAAXVBMVEVHcEz9SgD7TAD+XAD9SgD/TQD9SQD9SgD9SgD/SQD/fgD8SwD/fwD9SgD+fgD////9YQD9bwD+vn/9roz8VAD+zZz+fAD+sWX+nDr+iBT+hQ/+1rj+pk/+v5f+6dr/UBYvAAAADXRSTlMA5Raxnwp0xPhB8FUm91KgegAAAVpJREFUOMuV1O1igyAMBdCoKLg2FRjFr27v/5gTpK3WgCy/LD3iJYIA1+rrllEGsQKAaxa+3RSiKAGqtBrHcGERsQE4mXwYnlcSkQOcZOj7bZr6hE9aT5s0bZpPD60f07s3TYKPQ6999cMYwrP/cU7w+zz3VJhlrcWRD13XaWKpET4v/FuqQyN9J+Ez7m/nOMrDazpy3YV689cmIMIQfL/Jdtz281K/MU40chn6SfDP16SMiXJ6E9wjPLLFYjyygWM8cjwiPBy+XB6Odi4PH45Mrnxfcrk1fqG5XIbJ87iLwiCXuyiuLZl80XgBmq9BN9zKVxSK2z33P3kd5ccWvjWok8+61+VTA0qbmNoF2cy9cDQqOTWyjQY3YBTxBLticYFtMfQl93dYJddxVsK+Wr7+gUZK5UtKE4Z4C8dqK4FEiYrCrsqGf9wheFNCouq2YbwohCgKzpq2ptUfiLFgyVAnMPAAAAAASUVORK5CYII=',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAMAAAD79pkTAAAAclBMVEVHcEz/fgD/fgD/ugH/fwD/fwD/fgD/fgD/fgD/fgD/fgD/vAD/uwH/fgD/ugH/////mQD/pgD/3ID/vxP/twD+iQD/yjz/57X/rgD/1mf+yZP/7s3+ggH+kQn/4ZL/9OX+rmD/z0//xiv+vn7/1GP+oEThpfeUAAAADXRSTlMAtt/wQZ909BHFVSatTsAaqgAAAcpJREFUOMuVlWt7gjAMhYPj1m3Blpab46Zu//8vri2gNq24nU88+DacnAQE+Ph8K/6gCjECgI8/wUUhEDEH+NynpFwvVI+YArwoXtfbFUdkAC88dN2Dmyx/gcuyvLnR5uN9XJ7L8izv2aQ7uKy70qqr5Wo++R/OKF6PTdOUdciM7vXg4rI5Lmqk16qNxsW/jpsmSYMsWop3FmzsoUaRMfm44U463qvhB+UsgW9Gmtqa7gdzbh78JXNarY0HRF4UpuMrti5Og7yM42nGfnU1o/BwMibdDWoPF+P9xzyGvCBkCVrOuViKTz2p/mzFllnNSPAnC1xPxyXPXvmdergdlU2feFlevpCRaV5aDrzaLm3n/zUg0li2D4dzz9a+msGKwHcjJvj3GglWZKCFqmyj4K3YdNIatc4kFlvcWYLjo0Yy7QQI3jn4iYtHK3pEBC9d/BaOMkm9A8WX/u/a8OFmheA8hBs6ghAekHXC8g1v9+m2cmhArnZKW3fRnQY9QvH0H8OUvnW54uZA4AlqgbP3RxoSG0LP3RNK8N7+kOTgKmZrbpV+T0XbCsF5td5iMfiKIwwqCsFGecoyF81YmsOO8jhN2CHTOrAkjZ+wv+A3ZD0SYbq4AAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAMAAAD79pkTAAAAWlBMVEVHcEz/ugH/uwL/uwD/vAD/vAD/uwH/1mr/uwH/ugH/uQD/13L/13D/ugH/13D/////zkz/67f/2nr/4ZX/wBn/+/H/xSr/5qX/yTv/0Vn/vQz/9dr/3YT/78RP4sVgAAAADXRSTlMArZxwEUXl/8T4eSatLhHsjwAAAd1JREFUOMuVldl6gyAQhTFR0bRDhsUFl/d/zTJoGrYk7Vz5xZ/hzOFgGPv6Fn8pA1Axxr7E3woBoGbsQ2+lzge+AFwZ+9BU68fTCNB9xKcpUNPXH3Al5a8aJ755jystpVZPb27sHTtJX9Oxwom//AOfadbUiX1dd7mVxLhZ2xjf1vtRu8pGzXE13B+1ZkYK65yM8N1xw6T9Fponx5Tjrvng5gdJckwcglzM5qjJ0SMnNTDnIYtwPQyrOzsrtMdNgudGWuothPTbLAmeHxMuy4Ib0W4Gk1+QPATa+zig3yascsRO3M+QTloIsD7PiWMuvXg9LPrjSpq/vHwIhsJgsaAl8n2aJn+InGKwAS98OJLIHIk6cEy+G02Mk98S+ZlMG6aAlLtBWZqZu0ChqPlgQnw+m0ejHpfjCP0GgRgKBymP8e15PaQDeCiFbElwofYDHlzvQIt5SEl958YK5ZLm3pvwPF0WizindxD1pl86VsRpBc7zjE/dpKSrH7h9/5G0S0QzmPlrmJPfIc0AFnz5j0Gtf6c8cWcCFnbgSKqhb0KaVd6HZYxXcBx9Z6hqFlfTndaZcUa0FnEezflT17C8mqqHUlUlmKq+dsmKvrvW7E3Vze3StW3ft213uTUv2B+AKmH3cIcgWwAAAABJRU5ErkJggg=='],
        note:'',
        itemlist:[],
        start:20,
        refreshing:false
    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.state.banlist.length?
                            <Swiper options={{
                                autoplay: {
                                    delay: 2500,
                                  },
                                pagination:{
                                    el: '.swiper-pagination'
                                }
                            }} swipername="banner">
                                {
                                    this.state.banlist.map((item,index)=>
                                        <div key={index} className="swiper-slide"><img src={item.imageUrl} alt=""></img></div>
                                        )
                                }
                        </Swiper>:null
                    }
                </div>
                {
                    this.state.gridlist.length?
                    <div className={style.grids}>
                        {
                        this.state.gridlist.map((item,index)=>
                        <div key={item.id} className={style.grid} onClick={()=>this.handleClick(index,item.url)}>
                            <div className={style.msg}>
                                <p className={style.title}>{item.title}</p>
                                <p className={style.text}>{item.text}</p>
                            </div>
                            <div className={style.pic}>
                                <img src={item.imageUrl} alt=""></img>
                            </div>
                        </div>
                        )}
                </div>:null
                }
                <div className={style.topList}>
                    <div className={style.topSwiper}>
                        <span className={style.box0}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAB2BAMAAAB1xq2/AAAAKlBMVEVHcExDJAtEJAxDJA9DIwtDJAxDIws/JQBEIQpEIwxEJAxDIwtDIwtDIwt5hIz3AAAADnRSTlMAs34OTjRhBRkoP3Cji0R6mLEAAAMMSURBVEjH7Zbda9NQGMZfSdIkrV4c8ANlg3LapB+7iWSg+AFbjBW/oBQzGHjRBe0GvYkV7dCb0pvpQCgbyIo3XR1TOoTZ6WTGC3e1m96Id/41npOkW0IzQXAisheannN+5DnPed9zDgH4b4JRAt2jvR7AsV7PAmgjJAF86TmxA3AEDRGOkAWXEYkEvEdOnPIhZpuODFshKOYOFUPQA4R+vEPo6x39FkL39Gs+tIyGgd9Gp4kphGrU4S4aR8cBpujDhwzjLkFT6AzAODrpR24QZycAlg8YDanqpX1s/Mq8b8nfQpd8lpSEJGonBPXTG4K8oighCF5Q9B3CEH+blAV8yB+zc3AYfyvQvvHn0WEceFT3R21ySD84LXGGPteAGURsCpgt0KDScm/wZ9rSnLqpqqRd+dzJlwlqu7c6izG+T36YdBcwLtbzGpN05YSmNrlkyIZGkElue7aoRRPeVDx9PUlFhCztEkHFZ4PJQkGBSKJahdxmt1Tqs/bq1esSRY/XMM6buVyu66JHOSwbOA0Fco2ImqGUvOVQw7KpwMUkLNQUZ8yHGNqod6frjTRQVdO2bazs2TCfyJXXCc7u2hvlTqdj9pGmsBJMRj6mRN3Ur/gEeXsE2mNk6bjojJVVVfUQrLyFC/R/XnHn8pLmVCIPFr8IE9605WazqXkoth4p0mzQQhSURd9c0G5EU3AT2Axtr2V8SJBBkGChwdsk7d1krQyC0bXcem0An4TKGLwimTIskg0BZ71lkZfn6G7g3S6pdtU6PEu/F8IWQHSdc/a5+CaISKHYuIuefuL0FX3lRgjSGvRM4ZE9ZEzEuayRh2gyoMeVRmYwjnMYr0O7OIA8wUgS5q1wG7EW2AMo6iAGolKd2iDaffT8ZZyTmvScj43qek7WW33U1BwbeRAx1RMzu4JYejga59KqBQUMfiSacsOzwcpmAMXkXYeRlhZAwmyGUR1BhYEgIjZibjZSMIhEmkOJ5HAQ9ZccithQFF0NIsGYSHsogqcDggKmA76P4RrjfNecpwfs3L+0c38CYwTk/O+qFngAAAAASUVORK5CYII=" alt=""></img></span>
                        {
                            this.state.toplist.length?
                        <Swiper options={{
                            loop:false,
                            slidesPerView: 3.1,
                            spaceBetween:15,
                            freeMode:true
                        }} swipername="top">
                            {
                                this.state.toplist.map((item,index)=>
                                    <div key={index} className="swiper-slide">
                                        <div className={style.topwrap}>
                                            {
                                                index<4?
                                                <img src={this.state.iconlist[index]} className={style.icon} alt=""></img>:null
                                            }  
                                            <img src={item.image} alt=""></img>
                                            <p className={style.toptitle}>{item.title}</p>
                                            <p className={style.topinfo}><i className={style.tag}>￥</i>{item.price}</p>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="swiper-slide">
                                <div className={style.more}>
                                    <p><span className={style.moretitle}>更多商品</span></p>
                                    <p><span>see-more</span></p>
                                </div>
                            </div>
                        </Swiper>:null
                        }
                    </div>
                </div>  
                <div className={style.splitline}>
                    <span className={style.line}></span>
                    {
                        this.state.note?
                        <span className={style.text}>{this.state.note}</span>:null
                    }
                    <span className={style.line}></span>
                </div>

{
    //-------------------------------商品列表----------------------------------
}
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
                            this.state.itemlist.map(item=>
                            (
                                item.type===1?    
                            <li key={item.id} onClick={()=>this.handleDump2(item.id)}>
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
                            <li key={item.id} onClick={()=>this.handleDump(item.url)}>
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
    handleClick(index,id){
       if(index===2){
           this.props.history.push('/column/'+id.slice(-4))
       }else if(index===0){
           this.props.history.push('/column/'+id.slice(20)+'/subColumn/7')
       }else if(index===1){
            this.props.history.push('/column/'+id.slice(20)+'/subColumn/174')
       }
    }
    handleDump(id){
        this.props.history.push('/column/'+id.slice(20,24))
    }
    handleDump2(id){
        this.props.history.push('/c/'+id)
    }
    refresh = ()=>{
        axios.get(`http://www.xiongmaoyouxuan.com/api/tab/1/feeds?start=${this.state.start}&sort=0`).then(res=>{
                this.setState({
                    refreshing: false,
                    itemlist:[...this.state.itemlist,...res.data.data.list],
                    start:this.state.start+20
                })
            })
    }
    componentDidMount() {
        axios.get("http://www.xiongmaoyouxuan.com/api/tab/1?start=0").then(res=>{
            this.setState({
                banlist:res.data.data.banners,
                gridlist:res.data.data.gridsV2,
                toplist:res.data.data.topList,
                note:res.data.data.note,
                itemlist:res.data.data.items.list
             })
         })
    }
    
}
export default withRouter(home)
