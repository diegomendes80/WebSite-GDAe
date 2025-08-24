//animação dos cards-info
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".info__container",
    { 
      opacity: 0, 
      y: 80, 
      scale: 0.95 
    }, 
    { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration: 1.2, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".info__container",
        start: "top bottom",   // quando começa a entrar
        end: "top center",     // quando atinge o centro
        toggleActions: "play none none reverse"
      }
    }
  );
});


//animaçãoo titulo-thunder
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

  gsap.from(".thunder__title", {
    scrollTrigger: {
      trigger: ".thunder",
      start: "top 80%", // ativa quando 80% da tela atinge o título
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 80,
    rotateX: 90,
    filter: "blur(8px)",
    stagger: 0.07,
    duration: 1.2,
    ease: "power4.out"
  });
})
