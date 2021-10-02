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
const validSvg = document.querySelectorAll('.valid_input_svg');

window.onload = () => {
    http.get(productsURL).then(products => {
        ui.showAllAdminProducts(products);

    });
};


function validateInput() {
    if (imgInput.value == '') {
        // error-banner - tooltip
        imgInput.classList.add('input-invalid');
    } else {
        imgInput.classList.remove('input-invalid');
        imgInput.classList.add('input-valid');
        validSvg[0].style.display = "block";
    }
}