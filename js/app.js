const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", ()=> {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

const fetchData = async () =>{
    try{
      const res = await fetch("storage/data/museum.json")
      if (!res.ok){
        throw new error('Nope');
      }
      return res.json()
    } catch (error){
      console.error(error);
    }
  }

  const cards = await fetchData();

  const crearTarjeta = (picture, name, about) => {
    const card = document.createElement("div"); // Cambio a 'div' para seguir tu estructura de 'div.card'
    card.setAttribute("class", "card");

    // Creación de la parte frontal (front)
    const frontFace = document.createElement("div");
    frontFace.setAttribute("class", "face front");

    const img = document.createElement("img");
    img.src = picture;
    img.alt = name;

    const titleFront = document.createElement("h3");
    titleFront.innerText = name;

    frontFace.appendChild(img);
    frontFace.appendChild(titleFront);

    // Creación de la parte trasera (back)
    const backFace = document.createElement("div");
    backFace.setAttribute("class", "face back");

    const titleBack = document.createElement("h3");
    titleBack.innerText = name;

    const description = document.createElement("p");
    description.innerText = about;

    const linkContainer = document.createElement("div");
    linkContainer.setAttribute("class", "link");

    const detailsLink = document.createElement("a");
    detailsLink.href = "#"; // Ajusta el enlace según sea necesario
    detailsLink.innerText = "Details";

    linkContainer.appendChild(detailsLink);
    backFace.appendChild(titleBack);
    backFace.appendChild(description);
    backFace.appendChild(linkContainer);

    // Añadir las dos caras a la tarjeta
    card.appendChild(frontFace);
    card.appendChild(backFace);

    return card;
};

const container = document.querySelector("#galery")

cards.forEach(card => {
    let elementCreado = crearTarjeta(card.picture, card.name, card.about);
    container.appendChild(elementCreado)
});