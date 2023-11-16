import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const searchInput = getElement('.search-input');
  form.addEventListener('keyup', (e) => {
    e.preventDefault();
    const search = searchInput.value.trim();
    const products = store.filter((product) => {
      if (product.name.startsWith(search.toLowerCase())) return product;
    });
    if (products.length < 1) {
      getElement('.products-container').innerHTML =
        '<h3 class="filter-error">sorry, no products matched your search</h3>';
      return;
    }
    display(products, getElement('.products-container'));
  });
};

export default setupSearch;
