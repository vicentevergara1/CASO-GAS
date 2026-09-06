function toggleMobileMenu(button) {
  const menu = document.getElementById("mobile-menu");
  const isHidden = menu.classList.toggle("hidden");
  button.setAttribute("aria-expanded", String(!isHidden));
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.querySelector(".mobile-toggle");
  menu.classList.add("hidden");
  toggle?.setAttribute("aria-expanded", "false");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
});
