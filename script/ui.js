class UI {
    constructor() {
        this.container = document.querySelector('.container');
        this.cardContainer = document.querySelector('.card-container');
        this.detailsContainer = document.querySelector('.details-container');
        this.cartTBody = document.getElementById('cart-tbody');
        this.quantity = document.querySelector('.quantity');
        this.adminTBody = document.getElementById('admin-tbody');
        this.messageContainer = document.querySelector('.message-container');
        this.cartNumber = document.querySelector('.cart-counter');
        this.inputContainer = document.querySelectorAll('.new-product-form');
    }
    //- ShowAllProducts() on index.html
    showAllProducts(products) {
        let output = '';
        products.forEach((product) => {
            // check for stock quantity
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
                    <a href="#" onclick="return false" class="add-to-cart-btn" id="${product.id}">Add to Cart</a>
                </div>
            </div>
            `;
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
                    <a href="#" onclick="return false" class="add-to-cart-btn" id="${product.id}">Add to Cart</a>
                </div>
            </div>
            `;
            };
            this.cardContainer.innerHTML = output;
        });
    };
    //- ShowSingleProduct() - Show product on details.html
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
                <input type="number" name="product" id="details-input" value="1">
            </div>
            <div class="details-add-to-cart-btn">
                <a href="#" onclick="return false">
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
    };
    // showcartproducts() - Show products in cart.html
    showCartProducts() {
        let output = '';
        let cart = JSON.parse(localStorage.getItem('cart'));

        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                output += `
                    <tr class="cart-row">
                        <td class="cart-product-picture">
                            <img src="${cart[i].image}" class="" alt="${cart[i].name}">
                        </td>
                        <td class="cart-product-name">${cart[i].name}</td>
                        <td class="cart-product-price">${cart[i].price}</td>
                        <td class="cart-product-quantity">
                        <input type="number" class="cart-quantity" id="${cart[i].id}" value="${cart[i].qt}">
                        </td>
                        <td class="cart-product-delete">
                        <a href="#" class="delete-btn" id="${cart[i].id}">Delete</a>
                        </td>
                        </tr>
                        `;
            };
        };
        this.cartTBody.innerHTML = output;
    };
    // showAllAdminProducts() - Show products in admin.html
    showAllAdminProducts(products) {
        let output = '';
        products.forEach((product) => {
            output += `
                <tr>
                    <td class="admin-product-id">${product.id}</td>
                    <td class="admin-product-name">${product.name}</td>
                    <td class="admin-product-price">${product.price}</td>
                    <td class="admin-product-quantity">${product.stock} </td>
                    <td class="admin-product-edit"><a href="#" class="edit-btn" data-value="${product.id}">Edit</a></td>
                    <td class="admin-product-delete"><a href="" class="admin-delete-btn" id="${product.id}">Delete</a></td>
                </tr>
            `
        });
        this.adminTBody.innerHTML = output;
    };
    // Update cart icon according to local storage items qt
    cartCounter() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === null) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        let counter = 0;
        cart.forEach((item => {
            counter = Number(counter) + Number(item.qt);
        }));

        this.cartNumber.innerHTML = counter;
    };
    // On page load recalulate counter icon
    onLoadCounter() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === null) {
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
        };
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total = Number(total) + Number(cart[i].qt);
        }
        this.cartNumber.innerHTML = Number(total);
    };

    showSuccessMessage(message, el) {
        let element = document.createElement('div');
        element.classList.add('success-message');
        element.innerHTML = `
            <svg class="success_svg">
                <use xlink:href="#lnr-checkmark-circle"></use>
            </svg> ${message}
        `;
        el.appendChild(element);
        setTimeout(() => {
            element.remove()
        }, 1500);
    };

    showAdminMessage(message, i) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('input-error');
        messageElement.innerHTML = message;

        this.inputContainer[i].insertAdjacentElement('afterbegin', messageElement);
        setTimeout(() => {
            messageElement.remove();
        }, 1500)
    };

    clearFields() {
        document.getElementById('image').value = '';
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('category').value = '';
        document.getElementById('description').value = '';
    };
};

export const ui = new UI();