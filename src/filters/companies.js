import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (shop) => {
  const company = getElement('.compagnies');
  let companyList = new Set(shop.map((el) => el.company));
  companyList = ['all', ...Array.from(companyList).sort()];
  company.innerHTML = companyList
    .map((comp) => `<button class="company-btn">${comp}</button>`)
    .join('');
  company.addEventListener('click', (e) => {
    const companyTarget = e.target;
    if (companyTarget.classList.contains('company-btn')) {
      const companyName = companyTarget.textContent;
      if (companyName === 'all') {
        return display(shop, getElement('.products-container'),true);
      }
      const products = shop.filter((art) => art.company === companyName);
      display(products, getElement('.products-container'),true);
    }
  });
};

export default setupCompanies;
