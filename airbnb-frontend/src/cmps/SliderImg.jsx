import React, { Component } from "react";
import Slider from "react-slick";
import { Like } from '../cmps/svgs/Like.jsx'

export class SimpleSlider extends Component {
    state = {
        isLike: false,
    }

    likeStay = (ev) => {
        ev.preventDefault()
        const { isLike } = this.state
        this.setState(prevState => ({ ...prevState, isLike: !isLike }))
    }

    render() {
        const { stay,property } = this.props
        const { isLike } = this.state
        
        const settings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendDots: dots => <ul>{dots.slice(0, 5)}</ul>
        };
        return (
            <>
            {property==='preview'&&
                <button onClick={this.likeStay} className={`like-tag ${isLike ? 'like' : ''}`}> <Like /> </button>}
                <Slider className='slider-img' {...settings}>
                    {stay.imgUrls.slice(0, 5).map((stayImg, idx) => (
                        <img key={idx} className="stay-img" src={stayImg} alt="" />
                    ))}
                </Slider>
            </>
        );
    }
}
