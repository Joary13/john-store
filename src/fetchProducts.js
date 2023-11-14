import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    if (!response.ok) throw new Error("pb avec l'URL");
    return response.json();
  } catch (err) {
    console.error(`voici la raison de l'erreur: ${err}`);
  }
};

export default fetchProducts;
