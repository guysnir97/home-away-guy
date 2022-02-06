import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Plus } from "../svgs/Plus"
import { Minus } from "../svgs/Minus"
import Loader from "react-loader-spinner";


export class _GuestsPicking extends React.Component {

    state = {
        adult: null,
        child: 0,
        infant: 0,
        screenWidth: window.innerWidth

    }

    componentDidMount() {
        window.addEventListener('resize', this.onResizeScreen)
        if (!this.props.order) {
            this.setState({ adult: 0 })
            return
        }
        this.setState(this.props.currOrder.guests)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeScreen)
    }


    updateCount = (ev, action) => {
        ev.stopPropagation()
        ev.preventDefault()
        let { adult, child, infant } = this.state
        let field
        let value
        switch (action) {
            case 'add adult':
                if (adult < 16) {
                    field = 'adult'
                    value = adult + 1
                } else return
                break;
            case 'subtract adult':
                if (adult === 0) return
                else {
                    field = 'adult'
                    value = adult - 1
                }
                break;
            case 'add child':
                if (child < 5) {
                    field = 'child'
                    value = child + 1
                } else return
                break;
            case 'subtract child':
                if (child === 0) return
                else {
                    field = 'child'
                    value = child - 1
                }
                break;
            case 'add infant':
                if (infant < 5) {
                    field = 'infant'
                    value = infant + 1
                } else return
                break;
            case 'subtract infant':
                if (infant === 0) return
                else {
                    field = 'infant'
                    value = infant - 1
                }
                break;
            default:
        }
        this.setState({ [field]: value })
        this.props.handleGuestsChanege(field, value)
    }

    preventPropagation = event => {
        event.stopPropagation()
    }
    onClearInputs = () => {
        this.setState({ adult: 0, child: 0, infant: 0 }, () => {
            this.props.onClearInputs('guest')
        })
    }
    render() {
        const { adult, child, infant, screenWidth } = this.state
        const { pathname } = this.props
        if (adult === null) return (
            <div className="flex align-center justify-center full">
                <Loader
                    type="ThreeDots"
                    color='#FF385C'
                    height={100}
                    width={100}
                />
            </div>
        )
        return (
            <section className="guests-container flex column" onClick={this.preventPropagation} >
                <div className="guest-card flex">
                    <div className="flex column">
                        <span className="medium fs16 clr2" >Adults:</span>
                        <span className="book fs14 clr1 ">Aged 13 or above</span>
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract adult')} className={adult === 0 ? "btn-counter flex fade" : "btn-counter flex"}><span><Minus /></span></button>
                        <span>{adult}</span>
                        <button onClick={(event) => this.updateCount(event, 'add adult')} className="btn-counter flex"><span><Plus /></span></button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span className="medium fs16 clr2" >Children:</span>
                        <span className="book fs14 clr1 ">Ages 2-12</span>
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract child')} className={child === 0 ? "btn-counter flex fade" : "btn-counter flex"}><Minus /></button>
                        <span>{child}</span>
                        <button onClick={(event) => this.updateCount(event, 'add child')} className="btn-counter flex"><span><Plus /></span></button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span className="medium fs16 clr2">Infants:</span>
                        <span className="book fs14 clr1 ">Under 2</span>
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract infant')} className={infant === 0 ? "btn-counter flex fade" : "btn-counter flex"}><Minus /></button>
                        <span>{infant}</span>
                        <button onClick={(event) => this.updateCount(event, 'add infant')} className="btn-counter flex"><span><Plus /></span></button>
                    </div>
                </div>
                {screenWidth < 450 && pathname === '/' && <button type="button" className="btn-clear" onClick={this.onClearInputs}>clear</button>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        currOrder: state.orderReducer.currOrder
    }
}
export const GuestsPicking = connect(mapStateToProps)(withRouter(_GuestsPicking))