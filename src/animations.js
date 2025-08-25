  import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
  // To allow for the camera to move around the scene
  import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
  import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
  import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/MTLLoader.js";
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


  // modelo 3d
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.thunder__3d');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 4); // afastado para garantir visibilidade

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    let object;

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/src/');
    mtlLoader.load('thunder.mtl', (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('/src/');
        objLoader.load(
            'thunder.obj',
            (obj) => {
                object = obj;

                // ESCALA antes de centralizar
                const box = new THREE.Box3().setFromObject(object);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scaleFactor = 5 / maxDim;
                object.scale.set(scaleFactor, scaleFactor, scaleFactor);

                // CENTRALIZAR após escalar
                const boxScaled = new THREE.Box3().setFromObject(object);
                const center = boxScaled.getCenter(new THREE.Vector3());
                object.position.sub(center);

                // material de teste (remove se quiser usar MTL)
                object.traverse((child) => {
                    if (child.isMesh) child.material = child.material || new THREE.MeshNormalMaterial();
                });

                scene.add(object);
            },
            (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% carregado'),
            (error) => console.error('Erro ao carregar OBJ:', error)
        );
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; 

    controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;

    function animate() {
        requestAnimationFrame(animate);
        if (object) object.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

