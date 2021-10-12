import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
const detailsContainer = document.querySelector('.details-container');

window.onload = () => {
    let searchParamString = window.location.search; //Getting the query param ("?id=1")
    const searchParam = new URLSearchParams(searchParamString);
    const id = searchParam.get("id"); //Getting the id-nr out of the string
    ui.onLoadCounter();
    http.get(productsURL + "/" + id).then((product) => {
        ui.showSingleProductDetail(product);
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
        };

        document.querySelector('.details-add-to-cart-btn').addEventListener('click', () => {
            const itemQt = document.getElementById('details-input').value;
            if (cart) {
                cart = JSON.parse(localStorage.getItem("cart"));
                // for (let i = 0; i < cart.length; i++) {
                //     if () {
                //         cart.push(product);
                //         console.log('if')
                //     } else if (cart[i].id == product.id) {
                //         console.log('else')
                //         cart[i].qt = Number(cart.qt) + Number(itemQt);
                //     }
                // }
                product.qt = Number(itemQt);
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
            };
            ui.showSuccessMessage(`${product.name} added to cart`, detailsContainer);
            ui.cartCounter();
        });
    });
};