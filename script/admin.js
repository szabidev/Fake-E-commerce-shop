import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
const addProductBtn = document.querySelector('.new-product-btn');
const imgInput = document.getElementById('image');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const categoryInput = document.getElementById('category');
const typeInput = document.getElementById('type');

window.onload = () => {
    http.get(productsURL).then(products => {
        ui.showAllAdminProducts(products);
    });
};