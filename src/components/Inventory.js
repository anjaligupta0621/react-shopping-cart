import React, { Component } from 'react'
import InventoryItem from './InventoryItem';

export default class Inventory extends Component {
  render() {

    const { inventory, handleUpdateAmount, handleAddToCart } = this.props;
    return (
        <div className="inventory-container">
            <h1>Inventory</h1>
            <div>
                <ul>
                    {inventory.map((item) => {
                    return <InventoryItem 
                        key={item.id} 
                        item={item}
                        handleUpdateAmount={handleUpdateAmount} 
                        handleAddToCart={() => handleAddToCart(item)}
                    />;
                    })}
                </ul>
            </div>
      </div>
    )
  }
}
