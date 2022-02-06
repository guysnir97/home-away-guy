import { DatePicker } from "../header/DatePicker";
import { MobileGoBack } from "../svgs/MobileGoBack"

export const MobileDateForm = ({ onChangeForm, handlePickingDates, getDateValue, onClearInputs, checkIn, checkOut, preventPropagation, }) => {
  return (
    <form onSubmit={(event) => onChangeForm(event, 'guest')}>
      <div className="margin40 flex align-center">
        <div onClick={(event) => onChangeForm(event, 'location')}><MobileGoBack /></div>
        <div className="date-inputs fh26 flex column">
          <span className="text-align">when you will be there?</span>
          <div className="flex">
            <input className="wide light fs14 input-first clr1" type="text" name="checkIn" value={getDateValue(checkIn)} autoComplete="off" disabled />-
            <input className="wide light fs14 input-seconde clr1" type="text" name="checkOut" value={getDateValue(checkOut)} autoComplete="off" disabled />
          </div>
        </div>
      </div>
      <DatePicker order={{}} preventPropagation={preventPropagation} handlePickingDates={handlePickingDates} />
      <div className="btn flex space-between">
        <button type="button" onClick={() => onClearInputs('date')}>clear</button>
        <button type="submit" onClick={(event) => onChangeForm(event, 'guest')}>next</button>
      </div>
    </form>
  )

}

