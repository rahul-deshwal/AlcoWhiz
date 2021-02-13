import * as actionTypes from './actionTypes'
import URLS from '../../network/api'

export const getCategoryList = response => {
    return {
        type: actionTypes.GET_CATEGORY_LIST,
        payLoad: response
    }
}

export const getCategoryData = () => {
    return async dispatch => {
        try {
            const response = await fetch(URLS.categoryListApi)
            if(response.status === 200){
                const responseData = await response.json()
                dispatch(getCategoryList(responseData))
            }
        }
        catch(err) {
            console.log('something went wrong', err)
        }
    }
}

export const getProductListData = response => {
    return {
        type: actionTypes.GET_PRODUCT_LIST,
        payLoad: response
    }
}

export const getProductList = (catId) => {
    return async dispatch => {
        try {
            const response = await fetch(URLS.productListApi + `${catId}`)
            if(response.status === 200){
                const responseData = await response.json()
                dispatch(getProductListData(responseData))
            }
        } 
        catch(err) {
            console.log('something went wrong', err)
        }
    }
}