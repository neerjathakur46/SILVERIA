let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= CART =================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// ================= CART COUNT =================

function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = count;
    }
}


// ================= DISPLAY PRODUCTS =================

function displayProducts(list, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <div class="no-products">
                <h2>No jewellery found</h2>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <span class="offer-tag">
                    ON OFFER
                </span>

                <button
                    class="wishlist">
                    ♡
                </button>

                <a href="product.html?id=${product.id}">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </a>

            </div>


            <div class="product-info">

                <div class="rating">
                    ★ ${product.rating}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>


                <div class="price-row">

                    <strong>
                        ₹${product.price}
                    </strong>

                    <del>
                        ₹${product.oldPrice}
                    </del>

                    <span>
                        ${product.discount}
                    </span>

                </div>


                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    ADD TO BAG

                </button>

            </div>

        </div>

        `;

    });

}


// ================= ADD TO CART =================

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }


    saveCart();

    alert("Product added to your bag!");

}


// ================= CART PAGE =================

function renderCartPage() {

    const container =
        document.getElementById("cartPageItems");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Add some beautiful jewellery
                    to your shopping bag.
                </p>

                <a href="shop.html">
                    SHOP NOW
                </a>

            </div>

        `;

        updateCartPageTotal();

        return;
    }


    container.innerHTML = "";


    cart.forEach(item => {

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>


            <button
                class="remove"
                onclick="removeFromCart(${item.id})">

                ×

            </button>

        </div>

        `;

    });


    updateCartPageTotal();

}


// ================= QUANTITY =================

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    renderCartPage();

}


// ================= REMOVE =================

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    renderCartPage();

}


// ================= TOTAL =================

function updateCartPageTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    const totalElement =
        document.getElementById("cartPageTotal");

    const grandTotal =
        document.getElementById("grandTotal");


    if (totalElement) {

        totalElement.innerText =
            "₹" + total;

    }


    if (grandTotal) {

        grandTotal.innerText =
            "₹" + total;

    }

}


// ================= CHECKOUT =================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    window.location.href =
        "checkout.html";

}


// ================= SEARCH =================

function searchProducts() {

    const input =
        document.getElementById("shopSearch") ||
        document.getElementById("searchInput");


    if (!input) return;


    const value =
        input.value.toLowerCase();


    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(value)

            ||

            product.category
                .toLowerCase()
                .includes(value)

        );


    displayProducts(
        filtered,
        "productGrid"
    );

    displayProducts(
        filtered.slice(0, 4),
        "homeProducts"
    );

}


// ================= FILTER =================

function filterProducts() {

    let filtered = [...products];


    const categories =
        [...document.querySelectorAll(
            '.filter-box input[type="checkbox"]:checked'
        )]
        .map(input => input.value);


    if (categories.length > 0) {

        filtered =
            filtered.filter(product =>
                categories.includes(
                    product.category
                )
            );

    }


    const price =
        document.querySelector(
            'input[name="price"]:checked'
        );


    if (price && price.value !== "all") {

        const maxPrice =
            Number(price.value);

        filtered =
            filtered.filter(
                product =>
                    product.price <= maxPrice
            );

    }


    displayProducts(
        filtered,
        "productGrid"
    );


    updateProductNumbers(filtered.length);

}


// ================= SORT =================

function sortProducts() {

    const select =
        document.getElementById(
            "sortProducts"
        );


    if (!select) return;


    let list = [...products];


    if (select.value === "low") {

        list.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (select.value === "high") {

        list.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (select.value === "rating") {

        list.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayProducts(
        list,
        "productGrid"
    );

}


// ================= CLEAR FILTER =================

function clearFilters() {

    document.querySelectorAll(
        '.filter-box input[type="checkbox"]'
    ).forEach(input => {

        input.checked = false;

    });


    const allPrice =
        document.querySelector(
            'input[value="all"]'
        );


    if (allPrice) {
        allPrice.checked = true;
    }


    displayProducts(
        products,
        "productGrid"
    );

}


// ================= PRODUCT COUNT =================

function updateProductNumbers(count) {

    const productCount =
        document.getElementById(
            "productCount"
        );

    const showing =
        document.getElementById(
            "showingCount"
        );


    if (productCount) {

        productCount.innerText =
            count;

    }


    if (showing) {

        showing.innerText =
            count;

    }

}


// ================= COOKIE =================

function closeCookie() {

    const cookie =
        document.getElementById(
            "cookieBanner"
        );

    if (cookie) {

        cookie.style.display =
            "none";

    }

}


// ================= PAGE LOAD =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        const homeProducts =
            document.getElementById(
                "homeProducts"
            );

        if (homeProducts) {

            displayProducts(
                products.slice(0, 4),
                "homeProducts"
            );

        }


        const productGrid =
            document.getElementById(
                "productGrid"
            );


        if (productGrid) {

            let list =
                [...products];


            const params =
                new URLSearchParams(
                    window.location.search
                );


            const category =
                params.get("category");


            if (category) {

                list =
                    products.filter(
                        product =>
                            product.category ===
                            category
                    );

            }


            displayProducts(
                list,
                "productGrid"
            );


            updateProductNumbers(
                list.length
            );

        }

    }
);