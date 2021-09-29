class UI {
    constructor() {
        this.cardContainer = document.querySelector('.card-container');
        this.detailsContainer = document.querySelector('.details-container');
        this.cartTBody = document.getElementById('cart-tbody');
        this.quantity = document.querySelector('.quantity');
        this.adminTBody = document.getElementById('admin-tbody');
        this.messageContainer = document.querySelector('.message-container');
    }
    //- ShowAllProducts() 
    showAllProducts(products) {
        let output = '';
        products.forEach((product) => {
            if (Number(product.stock) == 0) {
                output += `
                <div class="card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="stock-container">
                        <svg class="error_svg">
                            <use xlink:href="#lnr-cross-circle"></use>
                        </svg>
                        <p class="product-stock-error">Out of stock</p>
                    </div>
                    <div class="product-numbers">
                        <p class="product-price"><sup class="dollar">$</sup> ${product.price}</p>
                        <div class="quantity-container">
                            <label for="quantity">QTY</label>
                            <!-- get the value from the stock category and update max attribute -->
                            <input type="number" name="quantity" class="quantity" value="1" min="0" max="${product.stock}" >
                        </div>
                    </div>
                    <a href="details.html?id=${product.id}" target="_blank" class="details-btn" ">Details</a>
                    <a href="#" class="add-to-cart-btn" id="${product.id}">Add to Cart</a>
                </div>
            </div>
            `
            } else {
                output += `
                <div class="card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="stock-container">
                        <svg class="stock_svg svg_icon">
                            <use xlink:href="#lnr-checkmark-circle"></use>
                        </svg>
                        <p class="product-stock">Can be ordered</p>
                    </div>
                    <div class="product-numbers">
                        <p class="product-price"> <sup class="dollar">$</sup> ${product.price}</p>
                        <div class="quantity-container">
                            <label for="quantity">QTY</label>
                            <!-- get the value from the stock category and update max attribute -->
                            <input type="number" name="quantity" class="quantity" value="1" min="0" max="${product.stock}" >
                        </div>
                    </div>
                    <a href="details.html?id=${product.id}" target="_blank" class="details-btn" >Details</a>
                    <a href="#" class="add-to-cart-btn" id="${product.id}">Add to Cart</a>
                </div>
            </div>
            `
            }
            this.cardContainer.innerHTML = output;
        });
    }
    //- ShowSingleProduct() - Get request to details.html where onload list a single items details
    showSingleProductDetail(product) {
        let output = `
            <div class="details-image-container">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="details-text-container">
            <div class="details-product-title">
                <h4>${product.name}</h4>
            </div>
            <div class="details-product-detail">
                <p class="details-text">${product.description}</p>
            </div>
            <div class="details-form-control">
                <label for="product" class="details-label">Buy Now !!!</label>
                <input type="number" name="product"  value="1">
            </div>
            <div class="details-add-to-cart-btn">
                <a href="#">
                    <svg class="details_add_to_cart_svg">
                        <use xlink:href="#lnr-plus-circle"></use>
                    </svg>
                    Add To Cart
                </a>
            </div>
        </div>
        <p class="stock-counter-text">
            In Stock: <span id="stock-count">${product.stock}</span>
        </p>
        <p class="details-price"> <sup class="dollar">$</sup> ${product.price} </p>
        `;
        this.detailsContainer.innerHTML = output;
    }

    showCartProducts() {
        let output = '';
        let cart = JSON.parse(localStorage.getItem('cart'));

        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                output += `
                    <tr>
                        <td class="cart-product-picture">
                            <img src="${cart[i].image}" class="" alt="${cart[i].name}">
                        </td>
                        <td class="cart-product-name">${cart[i].name}</td>
                        <td class="cart-product-price">${cart[i].price}</td>
                        <td class="cart-product-quantity">
                            <input type="number" id="cart-quantity" value="${this.quantity.value}">
                        </td>
                        <td class="cart-product-delete">
                        <a href="#" class="delete-btn" id="${cart[i].id}">Delete</a>
                        </td>
                    </tr>
                `
            }
        }
        this.cartTBody.innerHTML = output;
    }

    showAllAdminProducts(products) {
        let output = '';
        products.forEach((product) => {
            output += `
                <tr>
                    <td class="admin-product-name">${product.name}</td>
                    <td class="admin-product-price">${product.price}</td>
                    <td class="admin-product-quantity">${product.stock}</td>
                    <td class="admin-product-edit"><a href="#" class="edit-btn" id="${product.id}">Edit</a></td>
                    <td class="admin-product-delete"><a href="#" class="admin-delete-btn" id="${product.id}">Delete</a></td>
                </tr>
            `
        });
        this.adminTBody.innerHTML = output;

    }

    // showMessage(message, className) {
    //     this.messageContainer.classList.add(className);
    //     // inputMessage.innerHTML = `${message}`;
    //     // inputMessage.style.visibility = 'visible';
    //     if (className.classList.contains('success-message')) {
    //         this.messageContainer.innerHTML = `
    //             <svg class="error_message_svg">
    //         <use xlink:href="#lnr-checkmark-circle"></use>
    //     </svg>
    //     <p class="success-header">
    //         <span class="success-title">Koriko Strainer</span>
    //         added to cart
    //     </p>
    //         `
    //     }
    //     // setTimeout function to remove the message after 3 seconds
    //     setTimeout(() => {
    //         inputMessage.className = '';
    //         inputMessage.style.visibility = 'hidden';
    //     }, 3000);
    // }

    clearFields() {
        document.getElementById('image').value = '';
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('category').value = '';
        // document.getElementById('category').value = '';
        document.getElementById('description').value = '';
    }



    // - FilterProduct() - Based on the sidebar show the products on index.html, checkbox input add eventlistener
    // - AddProductToCart() - add product to cart from details.html / later add button on index.html to products and add to cart
    // - ShowAllAdminProducts() - on admin.html fetch all the products and list them, add edit and delete button with event listeners
    // - AddProduct - add product to the json file
    // - EditProduct() - the product.value will go to the input field on admin.html and can be edited
    // - DeleteProduct() - event listener on button to delete product from the json file
    // - ClearFields() - clear input fields after editing or adding a product
    // - ShowSuccessMessage() - div with success message, disappearring with set timeout
    // - ShowErrorMessage() - div with error message, disappearring with set timeout
    // - AddtoCartBanner() 
};


export const ui = new UI();