// URL de l'api
const url = "http://localhost:3000/api/cameras";

// Recuperer l'URL
const card = document.getElementById('card');
let photos;

const fetchPhotos = async() => {
    photos = await fetch(url)
    .then(res => res.json());
    console.log(photos);
}

// Insertion des elements dans le HTML
const showPhotos = async() => {
    await fetchPhotos();

    card.innerHTML = (
        photos
            .map(photo => (

                `
                    <div class="card-item">
                        <img class="card-img" src="${photo.imageUrl}" alt="Appareil photo"/>
                        <h3 class="card-name">${photo.name}</h3>
                        <div class="card-info">
                            <p class="card-price">${photo.price/100}€</p>
                            <button class="card-button"><a href="./produit.html?id=${photo._id}">Voir le produit</a></button>
                        </div>
                    </div>
                `
                    
            )).join('')
        );
};

showPhotos();

