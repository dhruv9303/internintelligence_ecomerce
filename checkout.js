document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    const card = document.getElementById("card").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    // Simple validation
    if (!name || !email || !address || !city || !zip || !card || !expiry || !cvv) {
        alert("Please fill in all fields!");
        return;
    }

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Display cart items on checkout page
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    let total = 0;

    checkoutItems.innerHTML = ''; // Clear the previous content

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        checkoutItems.innerHTML += `<li>${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}</li>`;
    });

    checkoutTotal.innerText = `$${total.toFixed(2)}`;

    // Simulate order placement
    alert("Order placed successfully! 🎉");

    // Clear the cart after successful order
    localStorage.removeItem("cart");

    // Redirect to a success page (you can create `orderPlaced.html`)
    window.location.href = "orderPlaced.html";
});
