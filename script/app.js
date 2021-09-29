import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";

document.addEventListener("DOMContentLoaded", listAllProducts);

function listAllProducts() {
    http.get(productsURL).then((products) => {
        ui.showAllProducts(products);
        document.querySelector('.card-container').addEventListener('click', (e) => {

            if (e.target.classList.contains('add-to-cart-btn')) {
                let cart = JSON.parse(localStorage.getItem("cart"));

                if (cart === null) {
                    cart = [];
                    localStorage.setItem("cart", JSON.stringify(cart));
                    console.log(cart);
                }
                if (cart) {
                    cart = JSON.parse(localStorage.getItem('cart'));
                    console.log(cart);
                    cart.push(products);
                    console.log(cart);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    console.log(cart);
                }
            }
        });

    })
};
