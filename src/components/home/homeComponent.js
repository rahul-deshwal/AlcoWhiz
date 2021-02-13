import React, { useState, useEffect } from 'react'

import classes from './home.css'

const Home = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [productListData, setProductListData] = useState([])
    const [viewButton, setViewButton] = useState(false)
    const [showInfo, setShowInfo] = useState('')
    const [cartValues, setCartValues] = useState([])
    const [listData, setListData] = useState({
        heading: 'Loading...',
        changeButton: false,
        changeButtonData: '',
    })


    useEffect(() => {
        props.getCategoryData()
        window.addEventListener('mousedown', handleClickOutside)

        const prevCartItems = JSON.parse(sessionStorage.getItem('cartItems'))
        if (prevCartItems)
            setCartValues(prevCartItems)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartValues))
    }, [cartValues])


    useEffect(() => {
        if (props.categoryList.length) {
            setCategoryList(props.categoryList)
            setShowInfo(props.categoryList[0])
            props.getProductList(props.categoryList[0]?.category_id)
        }
        if (props.heading) {
            setListData(prevState => {
                return {
                    ...prevState,
                    heading: props.heading
                }
            })
        }
    }, [props.heading])



    useEffect(() => {
        if (props.productListData)
            setProductListData(props.productListData)
    }, [props.productListData])

    const categoryItemClicked = (item) => {
        props.getProductList(item.category_id)
        setShowInfo(item)
        setViewButton(false)
    }

    const handleClickOutside = (event) => {
        if (document.getElementById('outerListDiv') && !document.getElementById('outerListDiv').contains(event.target)) {
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: !prevState.changeButton
                }
            })
        }
    }


    const addToCartHandler = (item) => {
        setCartValues(prevValue => {
            return [
                ...prevValue,
                item
            ]
        })
    }

    console.log(cartValues, 'data', "ln")

    const showProductList = () => {
        let newProductList = []
        if (viewButton) {
            newProductList = productListData.products.slice(0, productListData.count)
        } else {
            newProductList = productListData.products.slice(0, 3)
        }

        const products = newProductList.map(item => {
            return (
                <div className={classes.outerListDiv} key={item.id}>
                    <div className={classes.listImageDiv}>
                        <img src={item.image_urls.x120} alt={item.name} />
                    </div>
                    <div className={classes.listNameDiv}>
                            <p className={classes.list_name}>{item.name}</p>
                            <div className={classes.listPriceDiv}>
                                <p className={classes.list_weight}>{`(${item.weight} ${item.weight_unit})`}</p>
                                <div >
                                    <p className={classes.list_final_price}>{`₹ ${item.final_price}`}</p>
                                    <p className={classes.price_list}>{item.price > item.final_price && `₹ ${item.price}`}</p>
                                </div>
                            </div>
                            <button className={item.is_in_stock ? classes.greenButton : classes.greyButton}
                                disabled={item.is_in_stock ? false : true}
                                onClick={() => addToCartHandler(item)}>
                                {item.is_in_stock ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </button>
                    </div>
                    <div className={classes.ratingDiv}>
                        <span>{item.rating ? `${item.rating} ⭐` : null}</span>
                    </div>
                </div>
            )
        })

        return products
    }

    const viewButtonClicked = () => {
        setViewButton(!viewButton)
    }

    const categoryChangeHandler = (item, index) => {
        categoryItemClicked(item)
        const newCategory = [...categoryList]
        newCategory.splice(index, 1)
        newCategory.unshift(item)
        setCategoryList(newCategory)
        setListData(prevState => {
            return {
                ...prevState,
                changeButton: false
            }
        })
        setShowInfo(item)
    }

    const changeButtonHandler = () => {
        if (listData.changeButton) {
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: false
                }
            })
        } else {
            const newCategory = (
                <div className={classes.changeButtonData} id='outerListDiv'>
                    <ul >
                        {categoryList.length && categoryList.map((item, index) => {
                            return (
                                <div key={item.category_name}>
                                    <li onClick={() => categoryChangeHandler(item, index)}>{item.category_name}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )
            // return newCategory
            setListData(prevState => {
                return {
                    ...prevState,
                    changeButton: true,
                    changeButtonData: newCategory
                }
            })
        }
    }

    const cartButtonHandler = () => {
        props.history.push('/cart')
    }

    return (
        <div>
            <div className={classes.bannerRoot}>
                <div className={classes.heading}>
                    <span>{listData.heading}</span>
                    <button onClick={cartButtonHandler}>{`CART ( ${cartValues.length} )`}</button>
                </div>
                <div>
                    <div className={classes.categoryList}>
                        <ul>
                            <li><button>View All</button></li>
                            {categoryList.length ? categoryList.map(list => (
                                <li key={list.category_id} style={{ backgroundImage: `url(${list.category_image})` }} onClick={() => categoryItemClicked(list)}>
                                    <span>{list.category_name}</span>
                                </li>
                            )) : 'Loading...'}
                            <li><button>View All</button></li>
                        </ul>
                    </div>
                </div>
                    {productListData.count ? showProductList() : null}
                {listData.changeButton && listData.changeButtonData}
                <div className={classes.featureButton}>
                    {showInfo && <span>{`Showing for : ${showInfo.category_name}  `}</span>}
                    <button onClick={() => changeButtonHandler()}>change</button>
                    <button onClick={() => viewButtonClicked()}>{viewButton ? '[-] View Less' : '[+] View More'}</button>
                </div>
            </div>
        </div>
    )
}

export default Home
