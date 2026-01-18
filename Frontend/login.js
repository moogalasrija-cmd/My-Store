document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // ❌ error cases
    if (!res.ok) {
      alert(data.message); // 🔥 ONE LINE HANDLES ALL ERRORS
      return;
    }

    // ✅ success
    alert("Login successful");
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});
