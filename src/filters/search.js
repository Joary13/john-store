import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const searchInput = getElement('.search-input');
  form.addEventListener('keyup', (e) => {
    e.preventDefault();
    const search = searchInput.value;
    const products = store.filter((product) => {
      if (product.name.startsWith(search)) return product;
    });
    display(products, getElement('.products-container'));
  });
};

export default setupSearch;
