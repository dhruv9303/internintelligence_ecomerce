const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

// Select all "Buy Now" buttons
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

        localStorage.setItem("cart", JSON.stringify(cart));

        // If "Buy Now" button was clicked, go to checkout immediately
        if (event.target.classList.contains("buy-now")) {
            window.location.href = "checkout.html";
        } else {
            alert(`${productName} added to cart!`);
        }
    });
});


        // Store product details in localStorage
        localStorage.setItem("selectedProduct", productName);
        localStorage.setItem("selectedPrice", productPrice);

        // Redirect to checkout page
        window.location.href = "checkout.html";
    });
});
