import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, element, filters) => {
  element.innerHTML = products
    .map(({ id, name, price, image }) => {
      return `<article class="product">
               <div class="product-container">
                 <img src="${image}" class="product-img img" alt="${name}" />
                 <div class="product-icons">
                   <a href="product.html?id=${id}" class="product-icon">
                     <i class="fas fa-search"></i>
                   </a>
                   <button class="product-cart-btn product-icon" data-id="${id}">
                     <i class="fas fa-shopping-cart"></i>
                   </button>
                  </div>
                </div>
               <footer>
                <p class="product-name">${name}</p>
                <h4 class="product-price">${formatPrice(price)}</h4>
               </footer>
              </article> 
  `;
    })
    .join('');

  if (filters) return;

  element.addEventListener('click', (e) => {
    const target = e.target;
    const el = target.closest('.product-cart-btn');
    if (el) addToCart(el?.dataset.id);
  });
};

export default display;
