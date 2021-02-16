// Methode pour avoir un espace apres 3 chiffres
numberWithSpace = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Récupération des données utilisateur + produits
const orderInformation = window.location.search.substring(1).split("&");
console.log(orderInformation)
const orderId = orderInformation[0].replace("id=", "");
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");
document.querySelector(".user").textContent = userName + ",";
document.querySelector(".order-id").textContent = orderId + ",";
document.querySelector(".price").textContent = numberWithSpace(totalPrice)+"€" + ".";