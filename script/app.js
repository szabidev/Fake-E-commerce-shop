import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";

document.addEventListener("DOMContentLoaded", listAllProducts);

function listAllProducts() {
    http.get(productsURL).then((products) => ui.showAllProducts(products));
};