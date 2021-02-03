// URL de l'api
const url = "http://localhost:3000/api/cameras/";

// Recuperer les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const card = document.getElementById("card");

// Afficher la caméra
const displayProduct = async () => {
  const data = await getOneCams(url, id);
  renderCams(data);
  customizeYourCamera(card, data.lenses);
  addToCart(card, data);
};

// Récupèrer une caméra
const getOneCams = async (url, id) => {
  const response = await fetch(url + id);
  return await response.json();
};

// Fournir l'affichage selon les données de la caméra
const renderCams = (camera) => {
  card.innerHTML = 

  `
    <id class="card-item">
        <img class="card-img" src="${camera.imageUrl}" alt="Appareil photo"/>
        <h3 class="card-name">${camera.name}</h3>
        <div class="card-info">
            <p class="card-price">${camera.price/100}€</p>
        </div>
    </id>
  `;
};

//Personnalisation de la caméra
const customizeYourCamera = (parent, lenses) => {
    // Création liste déroulante
    const label = document.createElement("label");
    const select = document.createElement("select");
  
    label.setAttribute("for", "card-lenses");
    label.textContent = "Zoom : ";
    select.id = "lenses-list";
  
    parent.appendChild(label).appendChild(select);

    // Crée une balise option pour chaque lentille
    lenses.forEach((productLense) => {
        const option = document.createElement("option");
        option.value = productLense;
        option.textContent = productLense;
        select.appendChild(option);
    });

     // Récupère la lentille choisie dans la console
  select.addEventListener("change", (e) => {
    lenseChosen = e.target.value;
  });
};

// Ajoute le produit au panier
const addToCart = (parentElt, productData) => {
    // Crée le bouton d'envoie du produit
    const btn = document.createElement("button");
    const div = document.createElement("div");
    btn.textContent = "Ajouter au panier";
    div.classList.add("add-to-cart");
    parentElt.appendChild(div).appendChild(btn);

    // Assigne valeur à envoyer à localStorage
    const camera = {
        id: productData._id,
        name: productData.name,
        price: productData.price,
        imageUrl: productData.imageUrl,
        quantity: 1,
    };

}

displayProduct();