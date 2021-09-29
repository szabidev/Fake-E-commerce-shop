import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";

window.onload = () => {
    let searchParamString = window.location.search; //this gives us the query param (ex. "?id=1")
    // console.log(searchParamString)
    const searchParam = new URLSearchParams(searchParamString);
    // console.log(searchParam)
    const id = searchParam.get("id"); //getting the id-nr out of the string
    // console.log(id);

    http.get(productsURL + "/" + id).then((product) => {
        ui.showSingleProductDetail(product);
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(typeof cart);
        console.log(product);

        if (cart === null) {
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        document.querySelector('.details-add-to-cart-btn').addEventListener('click', () => {
            // ui for success message

            if (cart) {
                cart = JSON.parse(localStorage.getItem("cart"));
                localStorage.setItem("cart", JSON.stringify(cart));
                cart.push(product);
            };
        });
    });
};