import React, { useState , useEffect } from 'react'
import classes from './cart.css'
import homeClasses from '../home/home.css'

const Cart = (props) => {

    const [cartItems, setCartItems] = useState([])

    
    useEffect(()=> {
        const prevCartItems = JSON.parse(sessionStorage.getItem('cartItems'))
        if(prevCartItems)
        setCartItems(prevCartItems)
    }, [])
    
    
    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    
    const removeItemHandler = (item) => {
        const newCartItems = [...cartItems].filter(val => val.id !== item.id)
        setCartItems(newCartItems)
    }

    const showProductList = () => {
        const products = cartItems.map((item, index) => {
            return (
                <div className={homeClasses.outerListDiv} key={item.id + index + 1}>
                    <div className={homeClasses.listImageDiv}>
                        <img src={item.image_urls.x120} alt={item.name} />
                    </div>
                    <div className={homeClasses.listNameDiv}>
                        <div>
                            <p className={homeClasses.list_name}>{item.name}</p>
                            <div className={homeClasses.listPriceDiv}>
                                <p className={homeClasses.list_weight}>{`(${item.weight} ${item.weight_unit})`}</p>
                                <div >
                                    <p className={homeClasses.list_final_price}>{`₹ ${item.final_price}`}</p>
                                    <p className={homeClasses.price_list}>{item.price > item.final_price && `₹ ${item.price}`}</p>
                                </div>
                            </div>
                            <button className={item.is_in_stock ? homeClasses.greenButton : homeClasses.greyButton}
                                disabled={item.is_in_stock ? false : true}
                                onClick={() => removeItemHandler(item)}
                                >
                                REMOVE
                            </button>
                        </div>
                    </div>
                    <div className={homeClasses.ratingDiv}>
                        <span>{item.rating ? `${item.rating} ⭐` : null}</span>
                    </div>
                </div>
            )
        })
        return products
    }

    const goToHome = () => {
        props.history.goBack()
    }

    return (
        <div>
            <div className={classes.outerDiv}>
                <div>
                    <button onClick={goToHome}> Go To Home</button>
                </div>
                <div className={classes.cartItems}>
                    {/* <p>Your Cart is empty.</p> */}
                    {cartItems.length ? `My Cart (${cartItems.length})` : null}
                    {cartItems.length ? showProductList() : 'Your Cart is empty.'}
                </div>
            </div>
        </div>
    )
}

export default Cart
