document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-cart-message");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartShipping = document.getElementById("cart-shipping");
    const cartTax = document.getElementById("cart-tax");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    const SHIPPING_FEE = 5.0;
    const TAX_RATE = 0.08; // 8%

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            emptyMessage.style.display = "block";
            updateSummary(0);
            cartCount.textContent = "0";
            return;
        }

        emptyMessage.style.display = "none";

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
          </div>
          <div class="item-actions">
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
            cartItemsContainer.appendChild(itemDiv);
        });

        updateSummary(subtotal);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateSummary(subtotal) {
        const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + shipping;

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartShipping.textContent = `$${shipping.toFixed(2)}`;
        cartTax.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    function updateSummary(subtotal) {
        const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + shipping;

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartShipping.textContent = `$${shipping.toFixed(2)}`;
        cartTax.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    renderCart();
});
