import React from "react";
import { LocationPicking } from "../header/LocationPicking"
import { MobileGoBack } from "../svgs/MobileGoBack"

export const MobileLocationForm = React.forwardRef(({ onChangeForm, onImgClick, links, address, onChange, onClearInputs }, ref) => {
    return (
        <form onSubmit={(ev) => { onChangeForm(ev, 'date') }}>
            <div className="input-container flex align-center gap10">
                <div onClick={(ev) => onChangeForm(ev, 'home')}><MobileGoBack /></div>
                <input className="wide fs16 light" ref={ref} type="search" placeholder="Where are you going?" name="address" value={address} autoComplete="off" onChange={onChange} />
            </div>
            <LocationPicking onImgClick={onImgClick} links={links} />
            <div className="btn mrt20 flex space-between">
                <button type="button" onClick={(ev) => onClearInputs('location')}>clear</button>
                <button type="submit" onClick={(ev) => onChangeForm(ev, 'date')}>next</button>
            </div>
        </form>
    )

})