import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file\

export const DatePicker = ({ order, handlePickingDates, preventPropagation, className = '' }) => {

    const [dateState, setDateState] = useState([
        {
            startDate: order.checkIn ? new Date(order.checkIn) : new Date(),
            endDate: order.checkOut ? new Date(order.checkOut) : null,
            key: 'selection'
        }
    ]);
    useEffect(() => {
        handlePickingDates(dateState[0].startDate, dateState[0].endDate)
    }, [dateState])


    return (
        <div className={`${className} wide`} onClick={preventPropagation}>
            <DateRange
                editableDateInputs={true}
                onChange={item => setDateState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
            />
        </div>
    )
}
