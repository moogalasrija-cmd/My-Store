// ------------------ Dropdown Menu JS ------------------
const logoY = document.getElementById("logoY");
const dropdown = document.getElementById("dropdownMenu");

logoY.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", e => {
  if (!logoY.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// ------------------ Logout ------------------
function logout() {
  alert("Logged out successfully!");
  localStorage.removeItem("cart");
}

// ------------------ Fetch Products ------------------
fetch("http://localhost:3000/products?time=" + Date.now())
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
      container.innerHTML += `
        <div class="product-card" onclick="openProduct(${p.id})">
          
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'"
          >

          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <p>Material: ${p.material}</p>
          <p>Sizes: ${p.sizes.join(", ")}</p>

          <button
            onclick="event.stopPropagation(); addToCart(${p.id})"
            style="
              background:#5a8bbeff;
              color:white;
              border:none;
              padding:10px 16px;
              border-radius:6px;
              cursor:pointer;
              font-weight:600;
            ">
            Add to Cart
          </button>
        </div>
      `;
    });
  })
  .catch(err => console.error("Failed to fetch products", err));

// ------------------ Cart Functions ------------------
function addToCart(id) {
  fetch(`http://localhost:3000/products/${id}`)
    .then(res => res.json())
    .then(product => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    })
    .catch(() => alert("Could not add to cart"));
}

// ------------------ Open Product Page ------------------
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// ------------------ Theme Toggle ------------------
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
function viewProduct(id){
    window.location.href = `product.html?id=${id}`; // ✅ correct
}

function logout() {
  // Remove user data
  localStorage.removeItem("user"); // or your key name

  // Redirect to login page
  if(!localStorage.getItem("user")){
  window.location.href = "login.html";
function login() {
    // after successful login
    localStorage.setItem("user", "true"); // or any user info
    window.location.href = "index.html";
}

}
}
