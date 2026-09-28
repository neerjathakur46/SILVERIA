const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(params.get("id"));


const product =
    products.find(
        p => p.id === productId
    );


const container =
    document.getElementById(
        "productDetails"
    );


if (product) {

    container.innerHTML = `

        <section class="product-detail">

            <div class="detail-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>


            <div class="detail-info">

                <p class="detail-category">
                    ${product.category}
                </p>

                <h1>
                    ${product.name}
                </h1>

                <div class="detail-rating">
                    ★ ${product.rating}
                </div>


                <div class="detail-price">

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


                <p class="description">

                    Beautifully crafted silver jewellery
                    designed to add elegance to your
                    everyday style.

                </p>


                <div class="product-actions">

                    <button
                        onclick="addProductToCart()">

                        ADD TO BAG

                    </button>

                    <button class="buy-now"
                            onclick="buyNow()">

                        BUY NOW

                    </button>

                </div>


                <div class="product-features">

                    <p>✓ Genuine Silver Jewellery</p>

                    <p>✓ Secure Packaging</p>

                    <p>✓ Easy Returns</p>

                    <p>✓ Free Shipping</p>

                </div>

            </div>

        </section>

    `;

}


function addProductToCart() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existing =
        cart.find(
            item => item.id === product.id
        );


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


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert("Added to your bag!");

}


function buyNow() {

    addProductToCart();

    window.location.href =
        "checkout.html";

}
