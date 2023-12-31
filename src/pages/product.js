// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  try {
    const urlID = window.location.search;
    const response = await fetch(`${singleProductUrl}${urlID}`);
    loading.style.display = 'none';
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      // grab data
      const {
        id,
        fields: { company, description, name, price, image, colors },
      } = data;
      productID = id;
      const img = image[0].thumbnails.large.url;
      // set values
      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `home/ ${name}`;
      imgDOM.src = img;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
      descDOM.textContent = description;
      cartBtn.dataset.id = id;
    } else {
      centerDOM.innerHTML = `
     <div>
     <h3 class="error">sorry, something went wrong</h3>
     <a href="index.html" class="btn">back home</a>
     </div>
     `;
      throw new Error(
        `problem with the URL: ${(response.status, response.statusText)}`
      );
    }
  } catch (err) {
    console.error(err.message);
  }
});

cartBtn.addEventListener('click', () => {
  addToCart(productID);
});
