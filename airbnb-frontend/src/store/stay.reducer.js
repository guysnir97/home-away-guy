const initialState = {
    stays: [],
    isMobileSearch: false
};

export function stayReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_STAYS':
            return {...state, stays: action.stays };
        case 'FILTER_STAYS':
            const { price, propertyTypes } = action.filterBy
            const { types, isRemoveType } = propertyTypes
            if (price) {
                const { minPrice } = price
                const { maxPrice } = price
                if (minPrice || maxPrice) {
                    return {
                        ...state,
                        stays: state.stays.filter(stay => {
                            return stay.price >= minPrice && stay.price <= maxPrice
                        })
                    }
                }

            }
            if (types) {
                if (!isRemoveType) {
                    return {
                        ...state,
                        stays: state.stays.filter(stay => {
                            for (let i = 0; i < types.length; i++) {
                                return stay.type === types[i]
                            }
                        })
                    }

                } else {
                    return {

                        ...state,
                        stays: state.stays.filter(stay => {
                            return stay.type !== types[0]
                        })
                    }

                }
            }

        default:
            return {...state };
    }
}