document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);   // already registered etc
      return;
    }

    // ✅ SUCCESS POPUP
    alert("Registered successfully!");

    // ✅ REDIRECT TO LOGIN PAGE
    window.location.href = "login.html";

  } catch (err) {
    alert("Server error");
  }
});
