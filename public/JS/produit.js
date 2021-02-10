// URL de l'api
const url = "http://localhost:3000/api/cameras/";

// Recuperer les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const card = document.getElementById("card");

// Afficher la caméra
const displayCamera = async () => {
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
    <div class="card-item">
        <img class="card-img" src="${camera.imageUrl}" alt="Appareil photo"/>
        <h3 class="card-name">${camera.name}</h3>
        <div class="card-info">
            <p class="card-price">${camera.price/100}€</p>
        </div>
    </div>
  `;
};

//Personnalisation de la caméra
const customizeYourCamera = (parent, lenses) => {
  // Création liste déroulante
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "card-lenses");
  label.textContent = "Lentille : ";
  select.id = "lenses-list";
  select.required = true;
 
  parent.appendChild(label).appendChild(select);

  const choixOption = document.createElement("option");
  choixOption.textContent = "Choisissez une valeur";
  choixOption.disabled = "disabled";
  choixOption.selected = "selected";
  select.appendChild(choixOption);

  // Création d'une balise option pour chaque lentille
  lenses.forEach((cameraLense) => {
    const option = document.createElement("option");
    option.value = cameraLense;
    option.textContent = cameraLense;
    select.appendChild(option);
  });
}

// Ajoute le produit au panier
const addToCart = (parentElt, cameraData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div).appendChild(btn);

  const alert = document.createElement("div");
  alert.classList.add("alert");
  parentElt.appendChild(alert);

  
  let selectLense;
  
  // Envoie valeur à localStorage après un click
  btn.addEventListener("click", () => {
    // Récupère la lentille choisie dans la console
    selectLense = document.getElementById('lenses-list').value;

    // Assigne valeur à envoyer à localStorage
    const camera = {
      id: cameraData._id,
      name: cameraData.name,
      price: cameraData.price,
      imageUrl: cameraData.imageUrl,
      lense: selectLense,
      quantity: 1
    }; 
    
    // récupérer panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    if (selectLense != "Choisissez une valeur"){
    alert.textContent = "Votre produit à été ajouté au panier";
      // ajouter le produit au panier
      if (panier[camera.id] !== undefined && panier[camera.id].lense === selectLense) {
        panier[camera.id].quantity += 1;
      } else {
        panier[camera.id] = camera;
      }
    }
    // update panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
  });
};
 
displayCamera();