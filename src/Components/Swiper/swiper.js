import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import '../Swiper/swiper.scss'
export default class swiper extends Component {
    state={
       
    }
    render() {
        return (
            <div className={'swiper-container '+(this.props.banner===undefined?'':this.props.banner)+' '+(this.props.swipername===undefined?'':this.props.swipername)+' '+(this.props.topname===undefined?'':this.props.topname)}>
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
    componentDidMount() {
        new Swiper("."+this.props.swipername,{
            loop:true,
            ...this.props.options
        })
    }
    
}
