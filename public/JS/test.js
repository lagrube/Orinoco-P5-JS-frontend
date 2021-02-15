// Supprime élément du panier grace au boutton "supprimer"
const deleteCart = (removeElt, container, productId) => {
    removeElt.addEventListener("click", async () => {
      const panier = JSON.parse(localStorage.getItem("panier"));
      delete panier[productId];
      localStorage.setItem("panier", JSON.stringify(panier));
      // Supprime item du localStorage 
      if (panier === null) localStorage.clear();
      container.remove(); // Supprime item du DOM 
      location.reload(true); // Actualise la page dynamiquement
    });
};

// Supprimer élément du panier grace au boutton "supprimer"
const deleteCart = (removeElt, container, productId) => {
    removeElt.addEventListener("click", async () => {
      const panier = JSON.parse(localStorage.getItem("panier"));
      if (panier === null) return;
      if (panier[productId] === undefined) return;
      else {
        delete panier[productId];
      }
      // Supprime item du localStorage
      localStorage.setItem("panier", JSON.stringify(panier));
      container.remove(); // Supprime item du DOM 
      location.reload(true); // Actualise la page dynamiquement
    });
  };