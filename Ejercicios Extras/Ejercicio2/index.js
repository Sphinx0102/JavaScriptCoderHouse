let cart = [];

const addToCart = (item) => {
  let itemExists = false;
  cart.forEach((cartItem) => {
    if (cartItem.name === item.name) {
      cartItem.quantity++;
      itemExists = true;
    }
  });
  if (!itemExists) {
    item.quantity = 1;
    cart.push(item);
  }
  updateCart();
};

const removeFromCart = (item) => {
  cart.forEach((cartItem, index) => {
    if (cartItem.name === item.name) {
      cart.splice(index, 1);
    }
  });
  updateCart();
};

const updateCart = () => {
  let cartContainer = document.getElementById("cart");
  let total = 0;
  cartContainer.innerHTML = "";
  cart.forEach((cartItem) => {
    let itemLine = document.createElement("p");
    itemLine.innerHTML = `${cartItem.name} x ${cartItem.quantity} = $${cartItem.price *
      cartItem.quantity}`;
    cartContainer.appendChild(itemLine);
    total += cartItem.price * cartItem.quantity;
  });
  let totalLine = document.createElement("p");
  totalLine.innerHTML = `Total: $${total}`;
  cartContainer.appendChild(totalLine);
};