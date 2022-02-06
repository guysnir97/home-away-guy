import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router";
import { onSetOrder } from '../../store/order.action'


export function _PopularImgPreview({ link ,idx,onImgClick}) {

    const order = {
        address: link.city
    }


    return (

        <div className="popular-list flex" onClick={()=>onImgClick(order)}>
            <img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
            <div className="popular-txt fs16  flex column justify-center wide ">
                <h3 className="city">{link.city}</h3>
                <h4 className="country">{link.country}</h4>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return state
  }

const mapDispatchToProps = {
    onSetOrder
}
export const PopularImgPreview = connect(mapStateToProps,mapDispatchToProps)(withRouter(_PopularImgPreview))
