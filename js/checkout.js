let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


function displayOrder() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) return;


    let total = 0;

    container.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        container.innerHTML += `

            <div class="checkout-item">

                <img src="${item.image}">

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Qty: ${item.quantity}
                    </p>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    document.getElementById(
        "checkoutSubtotal"
    ).innerText =
        "₹" + total;


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        "₹" + total;

}


function placeOrder() {

    const name =
        document.getElementById(
            "name"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const pin =
        document.getElementById(
            "pin"
        ).value.trim();


    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pin
    ) {

        alert(
            "Please fill all details."
        );

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Enter a valid 10 digit phone number."
        );

        return;

    }


    if (!/^[0-9]{6}$/.test(pin)) {

        alert(
            "Enter a valid 6 digit PIN."
        );

        return;

    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const orderId =
        "SV" +
        Math.floor(
            10000000 +
            Math.random() * 90000000
        );


    const order = {

        orderId: orderId,

        name: name,

        email: email,

        phone: phone,

        address: address,

        city: city,

        pin: pin,

        payment: payment,

        items: cart,

        date: new Date().toLocaleString()

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem("cart");


    document.getElementById(
        "orderId"
    ).innerText = orderId;


    document.getElementById(
        "orderSuccess"
    ).style.display = "flex";

}


function continueShopping() {

    window.location.href =
        "shop.html";

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayOrder();

    }
);
