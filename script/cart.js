import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
const priceText = document.querySelector('.product-cart-price');
const shipping = document.querySelector('.delivery-cost-price');
const totalPrice = document.querySelector('.total-cost-price');

window.onload = () => {
    http.get(productsURL).then(() => {
        ui.showCartProducts();

        calculateTotalPrice()
    })
}





const calculateTotalPrice = () => {
    let table = document.getElementById('table');
    // all table rows
    let tableRow = table.querySelectorAll(".cart-row");
    let total = 0;

    for (let i = 0; i < tableRow.length; i++) {
        // price of single product
        let productPrice = tableRow[i].querySelector('.cart-product-price').innerHTML;
        console.log(productPrice);
        // get the value from the input,getElementById throws error
        let productQt = tableRow[i].querySelector('input[type=number]').value;
        console.log(productQt);

        total += Number(productPrice) * Number(productQt);
        priceText.innerHTML = `$${parseFloat(total).toFixed(2)}`
    }
    if (total < 200) {
        shipping.innerHTML = "$30";
        shipping.setAttribute('data-value', 30);
        totalPrice.innerHTML = `
        $ ${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;
    } else if (total > 201 && total < 1000) {
        shipping.innerHTML = "$15"
        shipping.setAttribute('data-value', 15);
        totalPrice.innerHTML = `
        $ ${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;
    } else {
        shipping.innerHTML = "$0";
        shipping.setAttribute('data-value', 0);
        totalPrice.innerHTML = `
        $ ${parseFloat(total + Number(shipping.getAttribute('data-value'))).toFixed(2)}
        `;
    }
}