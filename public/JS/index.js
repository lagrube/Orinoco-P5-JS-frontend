// URL de l'api
const url = "http://localhost:3000/api/cameras";

// Recuperer l'URL
const card = document.getElementById('card');
let cameras;

const fetchPhotos = async() => {
    cameras = await fetch(url)
    .then(res => res.json());
    console.log(cameras);
}

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
                            <p class="card-price">${camera.price/100}€</p>
                            <button class="card-button"><a href="./produit.html?id=${camera._id}">Voir le produit</a></button>
                        </div>
                    </div>
                `
                    
            )).join('')
        );
};

showPhotos();

