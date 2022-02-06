import React, { Component } from "react";
import Slider from "react-slick";

export class MultipleRows extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: false,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500,
            rows: 1,
            slidesPerRow: 2,
            arrows: true,
        };

        const { links, onImgClick } = this.props

        return (

            <Slider {...settings}>
                {
                    links.map((link, idx) => (
                        <div key={idx}>
                            <div className="popular-list flex" onClick={() => onImgClick({ address: link.city })} >
                                <img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
                                <div className="popular-txt fs16  flex column justify-center wide ">
                                    <h3 className="city">{link.city}</h3>
                                    <h4 className="country">{link.country}</h4>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </Slider>

        );
    }
}