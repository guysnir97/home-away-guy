import { Component } from 'react'
import PriceFilter from './PriceFilter.jsx';
import { LabelFilter } from './LabelFilter.jsx';

export class StayFilter extends Component {

    state = {
        isPrice: false,
        isPropertyType: false,
        isAmenities: false
    }

    onCloseFilters = () => {
        this.setState({ isPrice: false, isPropertyType: false, isAmenities: false })
    }

    toggelPriceFilter = async (ev) => {
        await this.onCloseFilters()
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPrice: !this.state.isPrice }))
    }

    toggelPropertyTypeFilter = async (ev) => {
        await this.onCloseFilters()
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPropertyType: !this.state.isPropertyType }))
    }

    toggelAmenitiesFilter = async (ev) => {
        ev.stopPropagation()
        await this.onCloseFilters()
        this.setState(prevState => ({ ...prevState, isAmenities: !this.state.isAmenities }))
    }

    render() {
        const { isPrice, isPropertyType, isAmenities } = this.state
        const { stays, setCheckedPropertyType, currAmenities, currTypes } = this.props
        return (
            <section className="filter-container flex gap10 ">
                <div className="price-container ">
                    <button className="hover-grey" onClick={this.toggelPriceFilter}>{this.props.minPrice()}</button>
                    {isPrice && <PriceFilter stays={stays} onSavePrice={this.props.onSavePrice} onCloseFilters={this.onCloseFilters} />}
                </div>
                <div className="type-container ">
                    <button className="hover-grey" onClick={this.toggelPropertyTypeFilter}>Property Type</button>
                    {isPropertyType &&
                        <LabelFilter
                            property="type"
                            stays={stays}
                            setCheckedPropertyType={setCheckedPropertyType}
                            currFilter={currTypes}
                            onCloseFilters={this.onCloseFilters}
                        />}
                </div>
                <div className="amenities-container-filter ">
                    <button className="hover-grey" onClick={this.toggelAmenitiesFilter}>Amenities</button>
                    {isAmenities &&
                        <LabelFilter
                            property="amenities"
                            stays={stays}
                            setCheckedPropertyType={setCheckedPropertyType}
                            currFilter={currAmenities}
                            onCloseFilters={this.onCloseFilters}
                        />

                    }
                </div>
            </section >
        )
    }
}



