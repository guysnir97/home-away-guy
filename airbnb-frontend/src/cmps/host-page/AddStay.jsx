import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addAsset, loadAssets } from '../../store/host.action'
import { CloudService } from '../../services/cloudinary-service'
import { onSetMsg } from '../../store/user.action'
import { UserMsg } from '../UserMsg'

class _AddStay extends Component {

    state = {
        asset: {
            imgUrls: ['', '', '', '', ''],
            name: '',
            price: '',
            type: 'Villa',
            capacity: '',
            rating: '',
            loc: {
                address: '',
                country: '',
                countryCode: '',
                lat: '',
                lng: '',
                city: ''
            },
            amenities: [],
            tags: [],
            host: null,
            description: '',
            reviews: [],
            likedByUserIds: [],
        },
        propertyType: ['Villa', 'Studio', 'Apartment', 'Room in hotel', 'House'],
        amenitiesType: ['TV', 'Wifi', 'Air conditioning', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'Kitchen', 'Washer', 'Dryer', 'Hair dryer', 'Crib'],
        tagType: ['entire to yourself', 'enhanced clean', 'self check-in', 'free cancellation'],
        isHostPage: true
    }

    inputRef = React.createRef(null)

    componentDidMount() {
        const { user, currAsset } = this.props

        if (user) this.setState({ asset: { ...this.state.asset, host: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl } } })

        if (currAsset) this.editAsset()

    }

    editAsset = () => {
        this.setState({ asset: this.props.currAsset, isEdit: true }, () => { })
    }

    onUploadImg = async (ev) => {
        let { imgUrls } = this.state.asset
        const urlImg = await CloudService.uploadImg(ev)
        const idx = imgUrls.findIndex(img => img === '')
        imgUrls[idx] = urlImg
        this.setState({ imgUrls })
    }

    handleChange = (ev) => {
        const { asset } = this.state
        const property = ev.target.name
        const { value } = ev.target
        this.setState({ asset: { ...asset, [property]: value } })
    }

    handleChangeLoc = (ev) => {
        const { asset } = this.state
        const { loc } = asset
        const property = ev.target.name
        const { value } = ev.target
        this.setState({ asset: { ...asset, loc: { ...loc, [property]: value } } }, () => {
            this.createAddress()
        })

    }

    createAddress() {
        const { asset } = this.state
        const { loc } = asset
        const { city, country } = loc
        const address = `${city}, ${country}`
        this.setState({ asset: { ...asset, loc: { ...loc, address } } })
    }

    saveCheckedAmenities = (ev) => {
        const { asset } = this.state
        let { amenities } = asset
        const { value } = ev.target
        if (ev.target.checked) {
            const isExist = amenities.some(currAmenities => currAmenities === value)
            if (isExist) return
            amenities.push(value)
        } else {
            let idx = amenities.indexOf(value)
            amenities.splice(idx, 1)
        }
        this.setState({ asset: { ...asset, amenities } })

    }

    saveCheckedTags = (ev) => {
        let { tags } = this.state.asset
        const { asset } = this.state
        const { value } = ev.target
        if (ev.target.checked) {
            const isExist = tags.some(currTag => currTag === value)
            if (isExist) return
            tags.push(value)
        } else {
            let idx = tags.indexOf(value)
            tags.splice(idx, 1)
        }
        this.setState({ asset: { ...asset, tags } })
    }

    isChecked = (property, value) => {
        const { asset } = this.state
        return asset[property].find(currValue => currValue === value)
    }

    onAddStay = async (ev) => {
        ev.preventDefault()
        const { asset } = this.state
        const { amenities, tags } = asset
        let { imgUrls } = asset
        if (!this.props.user) {
            this.props.onSetMsg({ type: 'error', txt: 'Please Sign up/log in to continue' })
            return
        }

        imgUrls = imgUrls.filter(img => img !== '')

        if (imgUrls.length === 5 && amenities && tags) {
            
            await this.props.addAsset(asset)
            await this.props.loadAssets(this.props.host._id)
        } else {
            this.props.onSetMsg({ type: 'error', txt: 'Please fill all fields' })

        }


    }

    onSetColor = (ev) => {
        let x = ev.clientX
        let y = ev.clientY
        this.inputRef.current.style.setProperty('--mouse-x', x)
        this.inputRef.current.style.setProperty('--mouse-y', y)
    }


    render() {
        const { asset, isHostPage } = this.state
        const { imgUrls } = asset

        const { propertyType, amenitiesType, tagType, isEdit } = this.state
        return (
            <section className='add-stay-continer'>
                <form >
                    <h1>Start hosting at your place!</h1>
                    <div className="inputs-containers flex gap30 align-center">
                        <label className="flex column wrap">
                            Asset Name
                            <input onChange={this.handleChange} name='name' type='text' value={asset.name} />
                        </label>
                        <label className="flex column">
                            Country
                            <input onChange={this.handleChangeLoc} name='country' type='text' value={asset.loc.country} />
                        </label>
                        <label className="flex column">
                            City
                            <input onChange={this.handleChangeLoc} name='city' type='text' value={asset.loc.city} />
                        </label>
                    </div>
                    <div className="add-stay-grid">
                        {imgUrls.map((src, idx) => (
                            <div key={idx} className={`grid-img grid-img${idx} medium pointer flex justify-center align-center relative`}>
                                <label className={`upload-img pointer wide high flex justify-center align-center absolute ${isEdit ? 'f-white' : 'f-black'} `}>
                                    <input onChange={this.onUploadImg} className={`img-upload-btn img${idx}`} type='file' accept='img/*' />
                                    Upload Image
                                </label>
                                {src && <img src={src} alt="" />}
                            </div>
                        ))
                        }
                    </div>
                    <div className="inputs-containers flex gap30 align-center">
                        <label className="flex column" >
                            Capacity
                            <input onChange={this.handleChange} value={asset.capacity} name='capacity' type='number' />
                        </label>
                        <label htmlFor="type" className="flex column">
                            PropertyType
                            <select
                                id="type"
                                name="type"
                                style={{ width: '190px' }}
                                value={asset.type}
                                onChange={this.handleChange}>
                                {
                                    propertyType.map((type, idx) => {
                                        return <option key={idx} value={type}>{type}</option>
                                    })
                                }
                            </select>
                        </label>
                        <label className="flex column">
                            Price
                            <input onChange={this.handleChange} name='price' value={asset.price} type='number' />
                        </label>
                    </div>
                    <div className="flex gap30 column margin-top20">
                        <div className="flex column gap5 wrap">
                            <span className="fs20 medium fw-unset ">Amenities</span>
                            {amenitiesType.map((amenitie, idx) => (
                                <label style={{ width: '200px' }} key={idx}>
                                    <input type="checkbox" name={amenitie} value={amenitie}
                                        onChange={this.saveCheckedAmenities} checked={this.isChecked('amenities', amenitie)}
                                    />
                                    {amenitie}
                                </label>
                            ))}
                        </div>
                        <div className="flex column gap5 wrap">

                            <span className="fs20 medium fw-unset ">Tags</span>

                            {tagType.map((tag, idx) => (
                                <label style={{ width: '200px' }} key={idx} >
                                    <input type="checkbox" name={tag} value={tag} checked={this.isChecked('tags', tag)}
                                        onChange={this.saveCheckedTags}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="description flex column margin-top20" >
                        <textarea
                            placeholder="Enter description for your asset here"
                            onChange={this.handleChange}
                            type="text"
                            name="description"
                            autoComplete="off"
                            value={asset.description}
                            style={{ height: '200px', fontFamily: 'airbnb-cereal-book', fontSize: '1rem' }}
                        ></textarea>
                    </div>
                    <button onMouseMove={this.onSetColor} ref={this.inputRef} className="add-stay-save " onClick={this.onAddStay}>Save</button>
                    <UserMsg isHostPage={isHostPage} />
                </form>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    addAsset,
    loadAssets,
    onSetMsg
}
export const AddStay = connect(mapStateToProps, mapDispatchToProps)(_AddStay)