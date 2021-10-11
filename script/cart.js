import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
const priceText = document.querySelector('.product-cart-price');
const shipping = document.querySelector('.delivery-cost-price');
const totalPrice = document.querySelector('.total-cost-price');
const table = document.getElementById('table');

window.onload = () => {
    http.get(productsURL).then(() => {
        ui.showCartProducts();
        calculateTotalPrice();

        table.addEventListener('change', updateQuantity);
        table.addEventListener('click', deleteItem);
    });
};


function calculateTotalPrice() {
    let table = document.getElementById('table');
    // all table rows
    let tableRow = table.querySelectorAll(".cart-row");
    let total = 0;

    for (let i = 0; i < tableRow.length; i++) {
        // price of single product
        let productPrice = tableRow[i].querySelector('.cart-product-price').innerHTML;
        // get the value from the input,getElementById throws error
        let productQt = tableRow[i].querySelector('input[type=number]').value;
        total += Number(productPrice) * Number(productQt);
        priceText.innerHTML = `$${parseFloat(total).toFixed(2)}`;
    };

    if (total < 200 && total > 0) {
        shipping.innerHTML = "$30";
        shipping.setAttribute('data-value', 30);
        totalPrice.innerHTML = `$${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;

    } else if (total > 201 && total < 1000) {
        shipping.innerHTML = "$15";
        shipping.setAttribute('data-value', 15);
        totalPrice.innerHTML = `$${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;

    } else {
        priceText.innerHTML = "$0.00";
        shipping.innerHTML = "$0.00";
        shipping.setAttribute('data-value', 0);
        totalPrice.innerHTML = `$${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;
    };
};

function updateQuantity(e) {
    if (e.target.classList.contains('cart-quantity')) {
        let input = e.target;
        //input validation: quantity must be a number between 1 and max.stock
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        };
        //send the changed quantity of a product from the input field to local storage
        let idInput = e.target.getAttribute("id");
        let cart = JSON.parse(localStorage.getItem("cart"));

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === idInput) {
                cart[i].qt = Number(input.value);
                localStorage.setItem("cart", JSON.stringify(cart));
            };
        };
        calculateTotalPrice();
    };
};

function deleteItem(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.preventDefault();
        // remove from the DOM
        e.target.parentElement.parentElement.remove();
        let btnId = e.target.getAttribute('id');
        let cart = JSON.parse(localStorage.getItem('cart'));
        // loop through the local storage if id's match delete the item
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === btnId) {
                // delete one element with i index
                cart.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                // recalculate price
                calculateTotalPrice();
                // exit the loop
                return;
            };
        };
    };
};