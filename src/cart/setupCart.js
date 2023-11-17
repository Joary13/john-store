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

export const addToCart = (id) => {
  console.log(id);
  openCart();
};
