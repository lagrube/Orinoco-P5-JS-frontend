// Methode pour avoir un espace apres 3 chiffres
numberWithSpace = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Quantitées du panier
let panierQuantity = document.getElementById("panier_quantity");
let panierQuantityValue = 0;

// Items du localstorage
const displayPanier = async () => {
    const cartItems = JSON.parse(localStorage.getItem("panier"));
    if (cartItems === null) return;
    if (Object.keys(cartItems).length > 0) {
        for(let i = 0; i < Object.keys(cartItems).length; i++) {
        const itemId = Object.keys(cartItems)[i];
        const camQuantity = cartItems[itemId].quantity;
    
        panierQuantityValue += camQuantity;
        panierQuantity.textContent = panierQuantityValue;
        }
    } 
};
displayPanier();

// URL de l'api
const url = "http://localhost:3000/api/cameras";

// Recuperer l'URL
const card = document.getElementById('card');
let cameras;

const fetchPhotos = async() => {
    cameras = await fetch(url)
    .then(res => res.json());
    console.log(cameras);
};

// Insertion des elements dans le HTML
const showPhotos = async() => {
    await fetchPhotos();

    card.innerHTML = (
        cameras
            .map(camera => (

                `
                    <div class="card-item">
                        <img class="card-img" src="${camera.imageUrl}" alt="Appareil photo"/>
                        <h3 class="card-name">${camera.name}</h3>
                        <div class="card-info">
                            <p class="card-price">${numberWithSpace(camera.price/100)}€</p>
                            <button class="card-button"><a href="./produit.html?id=${camera._id}">Voir le produit</a></button>
                        </div>
                    </div>
                `
                    
            )).join('')
        );
};

showPhotos();

