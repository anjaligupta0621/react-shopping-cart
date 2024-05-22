import React, { Component } from 'react';
import { getCart, getInventory, addToCart, deleteFromCart, checkout, updateCart } from '../APIs/apis'
import Inventory from './Inventory';
import ShoppingCart from './ShoppingCart';

export default class Container extends Component {

    state = {
        inventory: [],
        cart: [],
    }

    async componentDidMount() {
        const inventory = await getInventory();
        this.setState({ inventory: inventory.map((item) => {
            return {...item, quantity: 0}
        })});
        console.log(inventory);

        const cart = await getCart();
        this.setState({cart: cart});
    }

    handleUpdateAmount = (type, id) => {
        if (type === "-") {
            this.setState({ inventory: this.state.inventory.map((item) => {
                if (item.id === id) {
                    if (item.quantity > 0) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })})
        } else if (type === "+") {
            this.setState({ inventory: this.state.inventory.map((item) => {
                if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                } else {
                    return item
                }
            })})
        }
    }

   handleCheckout = () => {
        checkout().then((res) => {
            this.setState({cart: []});
            console.log("checkout done");
        }).catch((err) => {
            console.log("Couldn't checkout due to error: ", err);
        }); 
    }

    handleAddToCart = (newItem) => {
        if (newItem.quantity === 0) {
            return;
        }
        getCart().then((data) => {
            const foundItem = data.find((item) => item.id === newItem.id);
            if (!foundItem) {
                addToCart(newItem).then((data1) => {
                  console.log("Item not found in cart, new item added: ", data1);
                  this.setState({cart: [...this.state.cart, newItem]})
                })
            } else {
                updateCart(newItem.id, (newItem.quantity + foundItem.quantity)).then((data2) => {
                    console.log("Item found in cart, item to update: ", data2);
                    this.setState({cart: 
                        this.state.cart.map((item) => {
                            if (item.id === foundItem.id) {
                                return {
                                    ...item, 
                                    quantity: item.quantity + newItem.quantity
                                }
                            } else {
                                return item
                            }
                        })
                })
                })
            }
        }).catch((err) => {
            console.log("Couldn't add due to error: ", err);
        })
    }

    handleDeleteFromCart = (id) => {
        deleteFromCart(id).then((data) => {
            console.log("deleted");
            this.setState({cart: this.state.cart.filter((item) => item.id !== id)});
        }).catch((err) => {
            console.log("Couldn't delete due to error: ", err);
        })
    }

  render() {
    return (
        <div className="app-container">
            <Inventory 
                inventory={this.state.inventory} 
                handleUpdateAmount={this.handleUpdateAmount} 
                handleAddToCart={this.handleAddToCart}
            />
            <ShoppingCart 
                cart={this.state.cart} 
                handleCheckout={this.handleCheckout} 
                handleDeleteFromCart={this.handleDeleteFromCart}
            />
        </div>
    )
  }
}
