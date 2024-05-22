import React, { Component } from 'react'

export default class CartItem extends Component {
    render() {
        const { item, handleDeleteFromCart } = this.props;
        return (
          <li className="inventory-item">
            {item.content} x {item.quantity} 
            <button className='cart__delete' onClick={handleDeleteFromCart}>delete</button>
          </li>
        );
      }
}
