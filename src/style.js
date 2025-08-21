document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("checkbox");
  const menu = document.querySelector(".header__menu");
  const logo = document.querySelector(".header__logo");

  function sync() {
    if (checkbox.checked) {
      menu.classList.add("ativo");
      logo.classList.add("hidden");
    } else {
      menu.classList.remove("ativo");
      logo.classList.remove("hidden");
    }
  }

  checkbox.addEventListener("change", sync);

  // Reset quando for > 768px (evita ficar escondido no desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      checkbox.checked = false;
      menu.classList.remove("ativo");
      logo.classList.remove("hidden");
    }
  });


  sync();
});
