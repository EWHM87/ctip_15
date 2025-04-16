document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get user input
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  // Check if user exists in localStorage
  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    alert("Login successful!");
    localStorage.setItem("userLoggedIn", JSON.stringify(storedUser));  // Store user session
    window.location.href = "dashboard.html";  // Redirect to dashboard
  } else {
    alert("Invalid credentials. Please try again.");
  }
});
