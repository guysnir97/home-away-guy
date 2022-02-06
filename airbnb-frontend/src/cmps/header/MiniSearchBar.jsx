import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SearchMini } from '../svgs/SearchMini'


class _MiniSearchBar extends React.Component {

    state = {
        isClicked: false,
    }

    getTotalGuests = () => {
        const { currOrder } = this.props
        if (!currOrder.guests) return null
        let { adult, child, infant } = currOrder?.guests
        if (!(adult + child + infant)) return null
        return adult + child + infant
    }

    getDateValue = (checkIn, checkOut) => {
        const calcDate = new Date(+checkIn).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) + '-' +
            new Date(+checkOut).toLocaleString('en-IL', { month: 'short', day: 'numeric' })
        return calcDate

    }

    onSearchBarClicked = (ev) => {
        this.props.toggleSearchBar(ev)
    }

    capitalizeFirstLetter = (string) => {
        if (string) return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        return null
    }


    render() {
        const { animateClassName, currOrder } = this.props
        const { pathname } = this.props.history.location
        if (pathname === '/stay' && currOrder) return (
            <div className={`mini-search-bar flex space-between ${animateClassName}`} onClick={this.onSearchBarClicked}>
                <span className="fs14 fh18 medium fw-unset">{this.capitalizeFirstLetter(currOrder.address) || 'Location'}</span>
                <div className="seperation-line-vertical"></div>
                {currOrder.checkOut && <span className="fs14 fh18 medium fw-unset">{this.getDateValue(currOrder.checkIn, currOrder.checkOut)}</span>}
                {!currOrder.checkOut && <span className="fs14 fh18 book fw-unset">Add dates</span>}
                <div className="seperation-line-vertical"></div>
                {this.getTotalGuests() && <span className="fs14 fh18 medium fw-unset">Guests: {this.getTotalGuests()}</span>}
                {!this.getTotalGuests() && <span className="fs14 fh18 book fw-unset">Add guests</span>}
            </div>
        )
        else
            return (
                <div className={`mini-search-bar flex space-between ${animateClassName}`} onClick={this.onSearchBarClicked}>
                    <span className="fs14 fh18 medium fw-unset">Start your search</span>
                    <button className="search-bar-submit-mini flex ">{<SearchMini className='icon' />}</button>
                </div>
            )
    }
}

function mapStateToProps({ orderReducer }) {
    return {
        currOrder: orderReducer.currOrder

    }
}
const mapDispatchToProps = {

}

export const MiniSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MiniSearchBar))