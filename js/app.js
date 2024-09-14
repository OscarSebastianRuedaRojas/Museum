document.addEventListener("DOMContentLoaded", async () => {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");
    const container = document.querySelector("#galery");

    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });

    const fetchData = async () => {
        try {
            const res = await fetch("storage/data/museum.json");
            if (!res.ok) {
                throw new Error('Error al cargar los datos');
            }
            return res.json();
        } catch (error) {
            console.error(error);
        }
    };

    const cards = await fetchData();

    const crearTarjeta = (picture, name, about) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const frontFace = document.createElement("div");
        frontFace.setAttribute("class", "face front");

        const img = document.createElement("img");
        img.src = picture;
        img.alt = name;

        const titleFront = document.createElement("h3");
        titleFront.innerText = name;

        frontFace.appendChild(img);
        frontFace.appendChild(titleFront);

        const backFace = document.createElement("div");
        backFace.setAttribute("class", "face back");

        const titleBack = document.createElement("h3");
        titleBack.innerText = name;

        const description = document.createElement("p");
        description.innerText = about;

        const linkContainer = document.createElement("div");
        linkContainer.setAttribute("class", "link");

        const detailsLink = document.createElement("a");
        detailsLink.href = "#";
        detailsLink.innerText = "Details";

        linkContainer.appendChild(detailsLink);
        backFace.appendChild(titleBack);
        backFace.appendChild(description);
        backFace.appendChild(linkContainer);

        card.appendChild(frontFace);
        card.appendChild(backFace);

        return card;
    };

    if (cards && Array.isArray(cards)) {
        cards.forEach(card => {
            let elementCreado = crearTarjeta(card.picture, card.name, card.about);
            container.appendChild(elementCreado);
        });
    } else {
        console.error('No se han recibido datos válidos');
    }
});
