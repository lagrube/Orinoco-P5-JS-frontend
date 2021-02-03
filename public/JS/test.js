// Fourni l'affichage selon les données du produit
card.innerHTML = (
    camera
        .map(photoId => (

            `
                <id class="card-item">
                    <img class="card-img" src="${photoId.imageUrl}" alt="Appareil photo"/>
                    <h3 class="card-name">${photoId.name}</h3>
                    <div class="card-info">
                        <p class="card-price">${photoId.price/100}€</p>
                        <p class="card-zoom">${photoId.lense}</p>
                    </div>
                </id>
            `
                
        )).join('')
    );