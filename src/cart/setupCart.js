// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items
const cartItemCountDown = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((cartItem) => {
    cartItem.id === id;
  });
  if (!item) {
    let product = findProduct(id);
    // add item to the cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to the DOM
    addToCartDOM(product);
  } else {
    // update value
  }
  // add one to the item count
  displayCartItemCount();
  // display cart total
  displayCartTotal();
  // set cart in local Storage
  setStorageItem('cart', cart);
  // more stuff coming up
  openCart();
};

function displayCartItemCount() {
  const cartItemCount = cart.reduce((acc, curr) => {
    return curr.amount + acc;
  }, 0);
  cartItemCountDown.textContent = cartItemCount;
}

function displayCartTotal() {
  const cartTotal = cart.reduce((acc, curr) => {
    return curr.price * curr.amount + acc;
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(cartTotal)}`;
}

const init = () => {
  console.log(cart);
};

init();
