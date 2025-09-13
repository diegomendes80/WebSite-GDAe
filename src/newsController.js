const form = document.getElementById("criar-noticia-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imagemURL = document.getElementById("imagem").value; // URL da imagem
  const titulo = document.getElementById("titulo").value;
  const resumo = document.getElementById("resumo").value;
  const conteudo = document.getElementById("conteudo").value;
  const fonte = document.getElementById("fonte").value;
  const data = document.getElementById("data").value;
  const autor = document.getElementById("autor").value;

  // Monta o objeto da notícia
  const novaNoticia = {
    id: "card" + Date.now(),
    title: titulo,
    image: imagemURL,
    alt: titulo,
    description: resumo,
    content: conteudo,
    fonte: fonte,
    date: data,
    author: autor
  };

  console.log(novaNoticia); // Aqui você vê os valores no console
});
