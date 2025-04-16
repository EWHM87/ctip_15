document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get user input
  const name = document.getElementById("admin-name").value;  // Modify for Admin/Visitor/Park Guide
  const email = document.getElementById("admin-email").value;
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  const confirmPassword = document.getElementById("admin-confirm-password").value;

  // Basic validation
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Store user details in localStorage (you can also store it in a database)
  const user = { name, email, username, password };
  localStorage.setItem(email, JSON.stringify(user)); // Using email as the key for uniqueness

  alert("Registration successful! Please log in.");
  window.location.href = `login-${role}.html`;  // Redirect to the respective login page (modify for roles)
});
