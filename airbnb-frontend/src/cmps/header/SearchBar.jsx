import React from 'react'
import { connect } from 'react-redux'
import { onSetFilter } from '../../store/stay.action.js'
import { withRouter } from 'react-router'
import { DatePicker } from './DatePicker.jsx'
import { utilService } from '../../services/util.service'
import { GuestsPicking } from './GuestsPicking.jsx'
import { onSetOrder } from '../../store/order.action'
import { Search } from '../svgs/Search.jsx'
import { LocationPicking } from './LocationPicking.jsx'


export class _SearchBar extends React.Component {

  state = {
    criteria: {
      address: '',
      checkIn: '',
      checkOut: '',
      guests: {
        adult: 0,
        child: 0,
        infant: 0
      },
    },
    isPickingGuests: false,
    isPickingDates: false,
    isPickingLocation: false,
    isInsideHeader: true,
    dateFormat: null,
    tempName: false
  }

  componentDidMount() {
    window.addEventListener('click', this.closeInputs)
    if (this.props.history.location.pathname === '/') {
      this.props.onSetOrder(null)
    }

  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeInputs)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.closeInputs()
    if (this.props.isClearSearchBar && this.props.location.pathname === '/') {
      this.initState()
      this.props.setClearSearchBar()
    }
  }

  initState = () => {
    this.setState({
      criteria: {
        address: '',
        checkIn: '',
        checkOut: '',
        guests: {
          adult: 0,
          child: 0,
          infant: 0
        },
      },
      isPickingGuests: false,
      isPickingDates: false,
      isPickingLocation: false,
      isInsideHeader: true,
      dateFormat: null
    })
  }
  inputRef = React.createRef(null)

  handleChange = (ev) => {
    const { criteria } = this.state
    const field = ev.target.name
    const value = ev.target.value
    this.setState({ criteria: { ...criteria, [field]: value } })
  }

  handleGuestsChanege = (field, value) => {
    let { criteria } = this.state
    let { guests } = criteria
    this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
  }

  handlePickingDates = (start, end) => {
    let { criteria } = this.state
    let { checkIn, checkOut } = criteria
    checkIn = start
    if (end) checkOut = end
    this.setState({ criteria: { ...criteria, checkIn, checkOut }, dateFormat: { start, end } })
    if (end && start !== end) this.activeInput('guest')
  }

  onSubmit = async (ev) => {
    ev.preventDefault()
    const { criteria, dateFormat } = this.state
    if (dateFormat) {
      criteria.checkIn = Date.parse(dateFormat.start)
      criteria.checkOut = Date.parse(dateFormat.end)
    }
    const queryString = utilService.makeQueryParams(criteria)
    this.props.toggleSearchBar()
    await this.props.onSetOrder(criteria)
    this.props.history.push(`/stay?${queryString}`)

  }

  activeInput = (input, loc) => {
    this.closeInputs()
    switch (input) {
      case 'guest':
        this.setState({ isPickingGuests: true })
        break;
      case 'date':
        this.setState({ isPickingDates: true })
        break;
      case 'location':
        loc.focus()
        this.setState({ isPickingLocation: true })
        break;
      default:
    }
  }

  getDateValue = (date) => {
    if (new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) === 'Invalid Date') return 'Add dates'
    else return new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' })
  }

  getTotalGuests = () => {
    let { adult, child, infant } = this.state.criteria.guests
    return adult + child + infant
  }

  preventPropagation = event => {
    event.stopPropagation()
  }

  closeInputs = () => {
    let { isPickingGuests, isPickingDates, isPickingLocation } = this.state
    isPickingGuests = false
    isPickingDates = false
    isPickingLocation = false
    this.setState({ isPickingGuests, isPickingDates, isPickingLocation })
  }

  onLocationClick = async (order) => {
    const queryString = utilService.makeQueryParams(order)
    await this.props.onSetOrder(order)
    this.props.history.push(`/stay?${queryString}`)
  }

  render() {
    const { isPickingGuests, isPickingDates, isPickingLocation, criteria } = this.state
    const { animateClassName, isEnter } = this.props
    const { checkIn, checkOut, address } = criteria
    if (this.props.location.pathname === '/host') return null
    return (
      <section className={`flex column align-center search-bar-main-container ${animateClassName}`}>
        <div>
          <div className="flex column margin-top20">
            <form className={`${isEnter ? 'enter-postion' : ''} search-bar-container flex`} onClick={this.preventPropagation} onSubmit={this.onSubmit}>
              <div className="input-container flex column" onClick={() => this.activeInput('location', this.inputRef.current)} >
                <span>Location</span>
                <input
                  type="search"
                  placeholder="Where are you going?"
                  name="address"
                  value={address}
                  autoComplete="off"
                  ref={this.inputRef}
                  onChange={this.handleChange}
                  onClick={this.closeInputs}
                />
              </div>
              <div className="seperation-line-vertical"></div>
              <div className="input-container flex column" onClick={() => this.activeInput('date')}>
                <span>Check in</span>
                <input
                  type="text"
                  placeholder="Add dates"
                  name="checkIn"
                  value={this.getDateValue(checkIn)}
                  autoComplete="off"
                  disabled
                  onChange={this.handleChange}
                />
              </div>
              <div className="seperation-line-vertical"></div>
              <div className="input-container flex column"
                onClick={() => this.activeInput('date')}>
                <span>Check out</span>
                <input
                  type="text"
                  placeholder="Add dates"
                  autoComplete="off"
                  name="checkOut"
                  value={this.getDateValue(checkOut)}
                  disabled
                  onChange={this.handleChange}

                />
              </div>
              <div className="seperation-line-vertical"></div>
              <div className="input-container flex column"
                onClick={() => this.activeInput('guest')}
              >
                <span>Guests</span>
                <input
                  type="text"
                  autoComplete="off"
                  name="guests"
                  placeholder={'Guests:' + this.getTotalGuests()}
                  disabled
                  onChange={this.handleChange}
                />
              </div>
              <button className="search-bar-submit flex ">{<Search style={{ height: '20px', width: '20px' }} />}</button>
              <div className={isPickingGuests ? "picking-guest-container" : "none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
              <div className={isPickingDates ? "picking-dates-container" : "none"}> {isPickingDates && <DatePicker order={{}} preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
              <div className={isPickingLocation ? "picking-location-container" : "none"}> {isPickingLocation && <LocationPicking onImgClick={this.onLocationClick} links={utilService.HomePageImgPopular()} />} </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = {
  onSetFilter,
  onSetOrder

}


export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBar))


