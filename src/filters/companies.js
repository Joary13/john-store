import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (shop) => {
  const compagny = getElement('.compagnies');
  let compagnyList = new Set(shop.map((el) => el.company));
  compagnyList = ['all', ...Array.from(compagnyList).sort()];
  compagny.innerHTML = compagnyList
    .map((comp) => `<button class="company-btn">${comp}</button>`)
    .join('');
};

export default setupCompanies;
