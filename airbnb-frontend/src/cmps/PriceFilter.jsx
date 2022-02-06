import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AirbnbSlider, AirbnbThumbComponent } from './AirbnbSlider'

const minDistance = 20;


export default function PriceFilter(props) {

  const [price, setPrice] = useState([0, 100]);
  const handleChange = (ev, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };


  const handleInputChange = ({ target }) => {
    let { name, value } = target
    value = +value
    if (isNaN(value)) return
    if (name === 'minPrice') price[0] = value
    else if (name === 'maxPrice') price[1] = value
    setPrice([...price])
  }

  const preventPropagation = ev => {
    ev.stopPropagation()
  }

  return (
    <div className="price-filter" onClick={preventPropagation}>
      <Box className="margin0" sx={{ m: 3 }} />
      <Typography className="margin0" gutterBottom ><span className="fs20 medium"> Change Price</span></Typography>
      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]}
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        disableSwap
      />
      <div className="inputs-price flex gap10">
        <label className='pointer round-edge'>
          <div className="price-input round-edge">
            <span className="fs10 book clr1">min price</span>
            <input className=" pointer fs16 book clr2"
              name="minPrice"
              type="text"
              onChange={handleInputChange}
              value={price[0]} />
          </div>
        </label >
        <span className="flex align-center">-</span>
        <label className='pointer round-edge'>
          <div className="price-input  round-edge">
            <span className="fs10 book clr1">max price</span>
            <input className="pointer fs16 book clr2"
              name="maxPrice"
              type="text"
              onChange={handleInputChange}
              value={price[1]} />
          </div>
        </label>
      </div>
      <div className="btn-price">
      </div>
      <div className="btn-inputs flex white space-between">
        <button className="btn" onClick={() => { props.onSavePrice([0, 500]) }}>Clear</button>
        <button className="btn" onClick={() => { props.onSavePrice(price) 
        props.onCloseFilters()}}>Save</button>
      </div>
    </div >
  );
}
