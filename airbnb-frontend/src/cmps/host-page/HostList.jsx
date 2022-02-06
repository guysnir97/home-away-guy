import { Component } from "react";
import { HostAssetPreview } from "./HostAssetPreview";
export class HostList extends Component {

    state = {
        sortPrice: {
            isOnPrice: false,
            sortByPrice: 'up'
        },
        sortType: {
            isOnType: false,
            sortByType: 'up'
        }
    }

    TogglesortPrice = () => {
        const { sortPrice } = this.state
        let { sortByPrice, isOnPrice } = sortPrice
        if (isOnPrice) {
            if (sortByPrice === 'up') sortByPrice = 'down'
            else sortByPrice = 'up'
            this.setState({ sortPrice: { ...sortPrice, sortByPrice } })
        }
        else {
            this.setState({ sortPrice: { ...sortPrice, isOnPrice: !isOnPrice } })
        }
    }

    toggleSortType = () => {
        const { sortType } = this.state
        let { sortByType, isOnType } = sortType
        if (isOnType) {
            if (sortByType === 'up') sortByType = 'down'
            else sortByType = 'up'
            this.setState({ sortType: { ...sortType, sortByType } }, () => {
            })
        }
        else {
            this.setState({ sortType: { ...sortType, isOnType: !isOnType } })
        }
    }
    sortPrice = () => {
        const { assets } = this.props
        const { sortByPrice } = this.state.sortPrice
        return assets.sort((a, b) => sortByPrice === 'up' ? a.price - b.price : b.price - a.price)
    }
    sortType = () => {
        const { assets } = this.props
        const { sortByType } = this.state.sortType
        return assets.sort((a, b) => {
            if (sortByType === 'up') {
                if (a.type < b.type) return -1
                else if (a.type > b.type) return 1
                else return 0
            }
            else {
                if (a.type < b.type) return 1
                else if (a.type > b.type) return -1
                else return 0
            }
        })
    }

    getAssetsForDisplay = () => {
        let { assets } = this.props
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        if (isOnPrice) {
            assets = this.sortPrice()
        }
        if (isOnType) {
            assets = this.sortType()
        }
        return assets
    }

    render() {
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        const assets = this.getAssetsForDisplay()
        return (
            <table className="host-list">
                <thead>
                    <tr>
                        {this.props.screenWidth > 460 && <th></th>}
                        <th>Name</th>
                        <th className={`sort ${isOnType ? 'black' : ''}`} onClick={this.toggleSortType}>Type</th>
                        <th>Address</th>
                        <th className={`sort ${isOnPrice ? 'black' : ''}`} onClick={this.TogglesortPrice}>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, idx) => (
                        <HostAssetPreview screenWidth={this.props.screenWidth} toggleComponent={this.props.toggleComponent} key={idx} asset={asset} />
                    ))}
                </tbody>
            </table >
        )
    }
}
