import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { handleShoppingCart } from "../../actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartProduct from "../../components/CartProduct";

import './ShoppingCart.scss'

const ShoppingCart = () => {
    const { openShoppingCart, shoppingCart, subtotal, products } = useSelector(state => state)

    const dispatch = useDispatch()

    function getItemInfo(item) {
        let info = {}
        products.map(prod => {
            prod.sizes.filter(obj => {
                if (obj.sku === item){
                    info = prod
                }
            })
        })
        return info
    }

    function handleClosing() {
        dispatch(handleShoppingCart(false))
    }

    const skus = Object.keys(shoppingCart).map(item => {
        const productDetails = getItemInfo(item)

        return {
            sku: item,
            size: item.split("_").slice(-1)[0],
            quantity: shoppingCart[item],
            ...productDetails
        }
    })


    return (
        <div className={`sidebar ${openShoppingCart ? "sidebar--is-open" : ""}`}>
            <div className={`sidebar__topbar ${openShoppingCart ? "sidebar__topbar--is-open" : ""}`}>
                <header className="sidebar__topbar__header">
                    <button className='sidebar__topbar__icon' onClick={() => handleClosing()}>
                        <FontAwesomeIcon icon={faArrowLeft} key="arrow-left"/>
                    </button>
                    <div className="sidebar__topbar__text">
                        Carrinho de compras
                    </div>
                </header>
            </div>
            <div className="sidebar__body">
                {
                    skus && 
                    skus.map(item => {
                        if (item.quantity > 0){
                            return <CartProduct key={item.name+item.size} product={item}/>
                        }
                    })
                }
            </div>
            <div className={`sidebar__subtotal ${openShoppingCart ? "sidebar__subtotal--is-open" : ""}`}>
                {subtotal && <div className="sidebar__subtotal__info">
                    <span>Subtotal:</span><span>R$ {subtotal}</span>
                </div>}
            </div>
        </div>
    )
}

export default ShoppingCart