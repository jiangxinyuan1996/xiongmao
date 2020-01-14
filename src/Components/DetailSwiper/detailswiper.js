
import React ,{Component} from 'react'
import Swiper from 'swiper'
// import "swiper/css/swiper.min.css"
class MySwiper extends Component{
    render(){
        return <div className="swiper-container Gan">
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    }
    componentDidMount() {
        new Swiper('.Gan',{
            pagination: {
                el: '.swiper-pagination',
              },
            autoplay:true,
        })
    }
    
}
export default MySwiper