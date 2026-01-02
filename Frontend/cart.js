// ------------------ Display Cart ------------------
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const div = document.getElementById("cart");
div.innerHTML = "";

if (cart.length === 0) {
  div.innerHTML = "<p>Cart is empty</p>";
} else {
  cart.forEach((p, index) => {
    div.innerHTML += `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" style="width:100px">
        <p>${p.name}</p>
        <p>₹${p.price}</p>
        <p>Quantity: ${p.quantity}</p>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
}

// ------------------ Remove from Cart ------------------
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);  // Remove the item at that index
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();       // Refresh the page
}

// ------------------ Back Button ------------------
function goBack() {
  window.location.href = "index.html";
}
