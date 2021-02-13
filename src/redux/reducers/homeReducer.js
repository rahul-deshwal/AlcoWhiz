import * as actionTypes from '../actions/actionTypes'

const initialState = {
    heading: '',
    categoryList: [],
    productListData: []
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORY_LIST:
            return {
                ...state,
                heading: action.payLoad.heading,
                categoryList: action.payLoad.category_list,
            }
        case actionTypes.GET_PRODUCT_LIST:
            return {
                ...state,
                productListData: action.payLoad
            }
        default:
            return state
    }
}

export default homeReducer
