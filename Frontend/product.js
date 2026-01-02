// ------------------ Back Arrow ------------------
document.addEventListener("DOMContentLoaded", () => {
  const backArrow = document.getElementById("backArrow");
  if (backArrow) {
    backArrow.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

// ------------------ Product Fetch ------------------
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:3000/products/${id}`)
  .then(res => {
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  })
  .then(product => {
console.log(product);
    document.getElementById("productDetails").innerHTML = `
      <div class="product-detail-card">
        <img src="${product.imageUrl}" style="width:300px" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description || ""}</p>
        <h3>₹${product.price}</h3>
        <p>Material: ${product.material || ""}</p>
        <p>Sizes: ${(product.sizes || []).join(", ")}</p>
        <button id="addToCartBtn">Add to Cart</button>
      </div>
    `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(p => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    });

  })
  .catch(err => {
    document.getElementById("productDetails").innerHTML = `<p>${err.message}</p>`;
  });
