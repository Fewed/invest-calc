const isProdMode = PROD_MODE;

const baseURL = isProdMode
  ? "https://mern-web-shop.herokuapp.com"
  : "http://localhost:3000";

const restURL = isProdMode
  ? "https://madembed.ru/#/products"
  : "http://localhost:8080/#/products";

export { baseURL, restURL };
