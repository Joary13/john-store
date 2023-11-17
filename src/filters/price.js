import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceValue = getElement('.price-value');
  const priceLine = getElement('.price-filter');
  // setup filter
  const priceTab = store.map((product) => product.price);
  let maxPrice = Math.max(...priceTab);
  maxPrice = Math.ceil(maxPrice / 100);
  priceLine.max = maxPrice;
  priceLine.value = maxPrice;
  priceLine.min = 0;
  priceValue.textContent = `Value : $${maxPrice}`;

  priceLine.addEventListener('input', () => {
    const maxAmount = parseInt(priceLine.value);
    priceValue.textContent = `Value : $${maxAmount}`;
    const products = store.filter(
      (product) => product.price / 100 <= maxAmount
    );
    if (products.length < 1) {
      getElement('.products-container').innerHTML =
        '<h3 class="filter-error">sorry, no products matched your search</h3>';
      return;
    }
    display(products, getElement('.products-container'));
  });
};

export default setupPrice;
