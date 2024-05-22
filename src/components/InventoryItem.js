import React, { Component } from 'react'

export default class InventoryItem extends Component {
    render() {
        const { item, handleUpdateAmount, handleAddToCart } = this.props;
        return (
          <li className="inventory-item">
            {item.content}
            <button className='inventory__decrease-quantity' onClick={() => handleUpdateAmount("-", item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleUpdateAmount("+", item.id)}>+</button>
            <button className='inventory__add-to-cart' onClick={handleAddToCart}>Add to cart</button>
          </li>
        );
      }
}
