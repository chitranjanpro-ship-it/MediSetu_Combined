document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const role = document.getElementById("role").value;

      switch (role) {
        case "customer":
          window.location.href = "customer.html";
          break;
        case "doctor":
          window.location.href = "doctor.html";
          break;
        case "vendor":
          window.location.href = "vendor.html";
          break;
        case "delivery":
          window.location.href = "delivery.html";
          break;
        case "logistics":
          window.location.href = "logistics.html";
          break;
        default:
          alert("Please select a role!");
      }
    });
  }
});
