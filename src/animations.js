//evento de troca de imagem de fundo:
document.addEventListener("DOMContentLoaded", ()  => {

    const images = [
    '../assets/images/Foto-grupo-1.jpeg',
    '../assets/images/foto-grupo-2.jpeg',
    '../assets/images/foto-grupo-3.png',
    '../assets/images/foto-grupo-4.png'
    ];

    let index = 0;
    const bg = document.querySelector('.bg-slider');
    // const bg = document.body;

    function changeBackground() {
    index = (index + 1) % images.length;
    console.log('Trocando para:', images[index]);
    bg.style.backgroundImage = `url(${images[index]})`;
    }

    bg.style.backgroundImage = `url(${images[index]})`;

    setInterval(changeBackground, 5000); // troca a cada 5s

})


//evento do menu hamburguer:
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

//evento do slider:
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll("img");
  const bullets = document.querySelectorAll(".slider-nav span");
  let count = 0;

  // autoplay
  setInterval(() => {
    const width = slider.clientWidth;
    slider.scrollTo({ left: width * count, behavior: "smooth" });

    bullets.forEach(b => b.classList.remove("active"));
    bullets[count].classList.add("active");

    count++;
    if (count >= slides.length) count = 0;
  }, 3500);

  // clique nos bullets
  bullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => {
      slider.scrollTo({ left: slider.clientWidth * i, behavior: "smooth" });
      bullets.forEach(b => b.classList.remove("active"));
      bullet.classList.add("active");
      count = i + 1; // continua autoplay
    });
  });
});
