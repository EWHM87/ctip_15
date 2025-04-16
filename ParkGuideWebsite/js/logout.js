document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("userLoggedIn"); // Clear user session
  alert("Logged out successfully!");
  window.location.href = "index.html";  // Redirect to home page
});
