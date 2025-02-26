let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

// Function to add item to cart
document.querySelectorAll('.add-to-cart, .buy-now').forEach(button => {
    button.addEventListener("click", (event) => {
        const productName = button.getAttribute("data-product");
        const productPrice = parseFloat(button.getAttribute("data-price"));

        // Check if item is already in cart
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // If "Buy Now" is clicked, go to checkout immediately
        if (event.target.classList.contains("buy-now")) {
            window.location.href = "checkout.html";
        } else {
            alert(`${productName} added to cart!`);
        }

        // Update cart count
        updateCartCount();
    });
});

// Function to display cart items in cart.html
function displayCart() {
    const cartTable = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    if (!cartTable || !cartTotal) return; // Prevent errors if not on cart page

    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    cartTotal.innerText = total;
}

// Function to change item quantity in cart
function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Redirect to checkout
document.getElementById("checkout-btn")?.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
});

// Display cart items on page load (only in cart.html)
if (document.getElementById("cart-items")) {
    displayCart();
}

// Update cart count on page load
updateCartCount();
