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
    return cartItem.id === id;
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
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
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

const displayCartItemsDOM = () => {
  cart.forEach((item) => addToCartDOM(item));
};

function removeItem(id) {
  cart = cart.filter((elt) => elt.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((art) => {
    if (art.id === id) {
      newAmount = art.amount + 1;
      art = { ...art, amount: art.amount + 1 };
    }
    return art;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((art) => {
    if (art.id === id) {
      newAmount = art.amount - 1;
      art = { ...art, amount: newAmount };
    }
    return art;
  });
  return newAmount;
}

const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const elementId = element.dataset.id;
    const parentId = parent.dataset.id;

    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(elementId);
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount === 0) {
        removeItem(parentId);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
};
const init = () => {
  displayCartItemCount();
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
};

init();
