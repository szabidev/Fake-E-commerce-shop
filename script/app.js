import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
const filterBtn = document.querySelector('.filter-btn');
const sidebar = document.querySelector('.filter-sidebar');
// const cartCounter = document.querySelector('.cart-counter');
const container = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", listAllProducts);

function listAllProducts() {
    http.get(productsURL).then((products) => {

        ui.showAllProducts(products);
        ui.onLoadCounter();

        document.querySelector('.card-container').addEventListener('click', (e) => {

            if (e.target.classList.contains('add-to-cart-btn')) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                let id = e.target.getAttribute('id');
                for (let i = 0; i < products.length; i++) {
                    if (id == products[i].id) {
                        const itemQt = document.querySelectorAll('.quantity')[i].value;
                        if (cart === null) {
                            cart = [];
                            localStorage.setItem("cart", JSON.stringify(cart));
                        }
                        if (cart) {
                            cart = JSON.parse(localStorage.getItem('cart'));
                            products[i].qt = itemQt;
                            // if (cart.includes(products[i])) {
                            //     console.log(cart[products[i]]);
                            // }
                            cart.push(products[i]);
                            // console.log(cart.includes(products[i]));
                            localStorage.setItem("cart", JSON.stringify(cart));
                        }
                        ui.showSuccessMessage(`${products[i].name} added to cart`, container);
                        ui.cartCounter();
                    };
                };
            };
        });
    });
};


const toggleSidebar = () => {
    if (sidebar.classList.contains('hide')) {
        sidebar.classList.remove('hide');
        sidebar.classList.add('show');
    } else {
        sidebar.classList.remove('show');
        sidebar.classList.add('hide');
    }
}
filterBtn.addEventListener('click', toggleSidebar);
