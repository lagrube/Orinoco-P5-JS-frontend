// Quantitées du panier
let panierQuantity = document.getElementById("panier_quantity");
let panierQuantityValue = 0;

// Items du localstorage
const displayPanier = async () => {
    const cartItems = JSON.parse(localStorage.getItem("panier"));
    if (Object.keys(cartItems).length > 0) {
        for(let i = 0; i < Object.keys(cartItems).length; i++) {
        const itemId = Object.keys(cartItems)[i];
        const camQuantity = cartItems[itemId].quantity;
    
        panierQuantityValue += camQuantity;
        panierQuantity.textContent = panierQuantityValue;
        }
    } else {
        return
    }
};
displayPanier;