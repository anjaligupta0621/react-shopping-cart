const URL = "http://localhost:3000";

export const getCart = () => {
    return fetch(`${URL}/cart`)
      .then((res) => res.json());
  };

export const getInventory = () => {
    return fetch(`${URL}/inventory`)
      .then((res) => res.json());
  };

export const addToCart = (inventoryItem) => {
    return fetch(`${URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inventoryItem)
    }).then((res) => res.json());
  };

export const updateCart = (id, newAmount) => {
    const cartItem = {
      id: id,
      quantity: newAmount
    }
    return fetch(`${URL}/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItem)
    }).then((res) => res.json());
  };

export const deleteFromCart = (id) => {
    return fetch(`${URL}/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  };

export const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
  };