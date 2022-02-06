import { Component } from "react";
import Checkbox from '@mui/material/Checkbox';
import { ClickAwayListener } from '@mui/material';

export class LabelFilter extends Component {
    state = {
        types: [],
        amenities: []
    }

    componentDidMount() {
        this.checkTypeExists()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.currFilter!==this.props.currFilter) this.checkTypeExists()
    }


    checkTypeExists = () => {
        const { stays, property, currFilter } = this.props
        let types
        let amenities
        if (property === 'type') {
            types = stays.reduce((acc, stay) => {
                const typeName = stay[property][0].toUpperCase() + stay[property].substring(1)
                if (!acc.some(currType => currType.name === typeName)) {
                    let isChecked = false
                    if (currFilter.some(filter => filter.name === typeName && filter.isChecked)) {
                        isChecked = true
                    }
                    acc.push({ name: typeName, isChecked })
                }
                return acc
            }, [])
            this.setState({ types })

        } else if (property === 'amenities') {
            amenities = stays.reduce((acc, stay) => {
                for (const amenitie of stay[property]) {
                    const amenitieName = amenitie[0].toUpperCase() + amenitie.substring(1)
                    if (!acc.some(currAmenitie => currAmenitie.name === amenitieName)) {
                        let isChecked = false
                        if (currFilter.some(filter => filter.name === amenitieName && filter.isChecked)) {
                            isChecked = true
                        }
                        acc.push({ name: amenitieName, isChecked })
                    }
                }
                return acc
            }, [])
            this.setState({ amenities }, () => {
            })
        }
    }
    saveChecked = (ev) => {
        const { property } = this.props
        const { name: value, checked } = ev.target
        let key = property === 'type' ? 'types' : [property]
        const types = this.state[key].map(currType => {
            if (currType.name === value) currType.isChecked = checked
            return currType
        })
        this.setState({ [key]: types })
    }

    render() {
        const { property } = this.props
        let key = property === 'type' ? 'types' : [property]
        return (

            <ClickAwayListener onClickAway={this.props.onCloseFilters}>

                <div className="type-filter space-between flex column gap10 round-edge">
                    {this.state[key].map((type, idx) => (
                        <label key={idx}>
                            <Checkbox  size='small' name={type.name} value={type.isChecked}
                                checked={type.isChecked}
                                onChange={this.saveChecked} />
                            {type.name}
                        </label>
                    ))}
                    <div className="btn-inputs flex white space-between">
                        <button onClick={() => { this.props.setCheckedPropertyType([], key) }} className="btn" >Clear</button>
                        <button className="btn" onClick={() =>{
                            this.props.setCheckedPropertyType(this.state[key].length?this.state[key]:null, key)
                            this.props.onCloseFilters()
                        }}>Save</button>
                    </div>
                </div>
            </ClickAwayListener>

        )

    }
}

