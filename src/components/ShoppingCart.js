import React, { Component } from 'react'
import CartItem from './CartItem';

export default class ShoppingCart extends Component {
  render() {
    const { cart, handleCheckout, handleDeleteFromCart } = this.props;
    return (
        <div className='cart-container'>
            <h1>Shopping Cart</h1>
            <div>
                <ul>
                    {cart.map((item) => {
                        return <CartItem 
                            key={item.id} 
                            item={item}
                            handleDeleteFromCart={() => handleDeleteFromCart(item.id)}
                    />;
                    })}
                </ul>
            </div>
            <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
        </div>
    )
  }
}
