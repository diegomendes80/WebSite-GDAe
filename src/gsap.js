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


//animação dos cards-posts:
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Seleciona todos os cards
    document.querySelectorAll(".cards__card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",   // começa quando o card chega a 85% da tela
          toggleActions: "play none none reverse"
        }
      });
    });

    // Hover interativo
    document.querySelectorAll(".cards__card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          scale: 1.05,
          rotate: 1,
          duration: 0.4,
          ease: "power3.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "power3.inOut"
        });
      });
    });

    // Entrada suave dos títulos dentro de cada card
    document.querySelectorAll(".card-title").forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%"
        }
      });
    });
  });

//animação do home-sub img
document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".home-sub__image-sub img", {
    duration: 1.2,
    scale: 0.8,
    opacity: 0,
    ease: "power3.out"
  });

  gsap.to(".home-sub__image-sub img", {
    y: -15,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.from(".home-sub__info-sub", {
        x: -150,
      opacity: 0,
      scale: 0.9,       // começa um pouco menor
      duration: 1.5,
      ease: "power3.out"
  });
    

});

//animação cards-atividades
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".card-atividade",
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
        trigger: ".main-sub__atividades-sub",
        start: "top bottom",   // quando começa a entrar
        end: "top center",     // quando atinge o centro
        toggleActions: "play none none reverse"
      }
    }
  );



})

//animação cards-membros
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".membro-card",
    {
      opacity: 0,
      y: 60,
      rotateY: -15,
      scale: 0.9,
      transformOrigin: "center center",
    },
    {
      scrollTrigger: {
        trigger: ".membros-sub__cards",
        start: "top 80%", // anima quando os cards entram
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.8,
      ease: "power3.out",
      stagger: {
        each: 0.2,
        from: "center", // começa do meio
      },
      onComplete: () => {
        // efeito sutil contínuo (hover-like)
        gsap.to(".membro-card", {
          y: -5,
          rotateY: 2,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.15,
            from: "edges", // vai das bordas para o centro
          },
        });
      },
    }
  );
});

//animação do foguete:

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".foguete", {
    y: "80vh",
    ease: "power2.out", // curva suave
    scrollTrigger: {
      trigger: ".main-historia",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5, // dá um "delay" na resposta → mais fluido
    }
  });
});

