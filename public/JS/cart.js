// Methode pour avoir un espace apres 3 chiffres
numberWithSpace = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const cart = document.querySelector("#cart"); // Récupère la section du panier
const cartTotal = document.getElementById("cart-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};
// Stock le prix total
let totalPrice = 0;

// Quantitées du panier
let panierQuantity = document.getElementById("panier_quantity");
let panierQuantityValue = 0;

// Récupère élément dans localStorage
const getItem = async (itemId) => {
  const response = await fetch(
    "http://localhost:3000/api/cameras/" + itemId
  );
  return await response.json();
};

// Affiche le/les produit(s) du panier.
const displayCart = async () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (cartItems === null) return;
  if (Object.keys(cartItems).length > 0) {
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
      console.log(itemId);
      const product = await getItem(itemId); // Récupère les informations du produit
      const camId = product._id; // Stocke l'id du produit
      const camImg = product.imageUrl; // Stocke l'image du produit
      const camName = product.name; // Stocke le nom du produit
      const lenseChosen = cartItems[itemId].lense; // Stocke la lentille du produit
      const camPrice = product.price / 100; // Stocke le prix du produit
      const camQuantity = cartItems[itemId].quantity; // Stocke la quantité du produit
      cartInformation.products.push(camId); // Envoie l'id du produit au tableau products de cartInformation
      renderCart(camName, camPrice, camImg, camQuantity, lenseChosen); // Fourni l'affichage du/des produits du panier

      // Quantitées des produits présent au panier
      panierQuantityValue += camQuantity;
      panierQuantity.textContent = panierQuantityValue

      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const iconLeft = document.querySelectorAll(".fa-arrow-circle-left")[i];
      const iconRight = document.querySelectorAll(".fa-arrow-circle-right")[i];
      iconLeft.style.fontSize = "16px";
      iconRight.style.fontSize = "16px";
      deleteCart(remove, article, itemId);
      decrementItem(iconLeft, article, itemId); // appel de la fonction décrémentation avec la flèche de gauche
      incrementItem(iconRight, itemId); // appel de la fonction incrémentation avec la flèche de droite
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};

// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity, productLense) => {
  // Affiche article(s) du panier
  const article = document.createElement("article");
  article.innerHTML = `
    <img class="product-image" src="${imgUrl}" alt="${productName}"/>
    <div class="product-information>
        <p class="product-title">Marque : ${productName}</p>
        <p class="product-lense">Lentille : ${productLense}</p>
        <p class="price">Prix : ${numberWithSpace(productPrice)}€</p>
    </div>
    <p class="quantity"><i class="fas fa-arrow-circle-left">${productQuantity}</i><i class="fas fa-arrow-circle-right"></i></p>
    <button class="remove ">Supprimer</button>`;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; // Implémente prix
  cartTotal.textContent = `Total : ${numberWithSpace(totalPrice)}€`; // Affiche le prix total
};

// Supprime élément du panier grace au boutton "supprimer"
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", async () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // Supprime item du localStorage 
    container.remove(); // Supprime item du DOM 
    location.reload(true); // Actualise la page dynamiquement
  });
};

// décrémente et enlève un produit au panier avec la flèche de gauche
const decrementItem = (iconLeft, container, productId) => {
  iconLeft.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
      // Supprime item du localStorage
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    container.remove(); 
    location.reload(true);
  });
};

// incremente et rajoute un produit au panier avec la flèche de droite
const incrementItem = (iconRight, productId) => {
  iconRight.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload(true);
  });
};

displayCart();

// Caractères spéciaux 
const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (value) => (value.length >= 2 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (value) => (value.match(regexEmail) ? true : false); // Vérifie que la valeur donnée soit bien dans le format email

// renvoie true si toutes les conditions sont vérifiées
const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); 

// Récupère les éléments du formulaire
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById("btn");

const firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
const addressErrorMessage = document.getElementById("addressErrorMessage");
const cityErrorMessage = document.getElementById("cityErrorMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstName.value)) {
    firstNameErrorMessage.textContent = "";

    if (isValidInput(lastName.value)) {
      lastNameErrorMessage.textContent = "";

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

        if (isValidInput(city.value)) {
          cityErrorMessage.textContent = "";

          if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";

            return (cartInformation.contact = {
              // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              email: email.value
            });
          } else {
            emailErrorMessage.textContent =
              "Merci de renseigner votre adresse mail !";
            email.focus();
            return false;
          }
        } else {
          cityErrorMessage.textContent = "Merci de renseigner votre ville !";
          city.focus();
          return false;
        }
      } else {
        addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
        address.focus();
        return false;
      }
    } else {
      lastNameErrorMessage.textContent = " Merci de renseigner votre nom !";
      lastName.focus();
      return false;
    }
  } else {
    firstNameErrorMessage.textContent = "Merci de renseigner votre prénom !";
    firstName.focus();
    return false;
  }
};
// Envoie données à l'api
const postData = async () => {
  const response = await fetch("http://localhost:3000/api/cameras/order", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cartInformation),
  });
  return await response.json();
};

// Bouton valider
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const validForm = formValidate(); // Valide le formulaire
  if (validForm !== false) {
    // Envoie données au serveur
    const response = await postData();
    // Redirection vers page de confirmation
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; 
    // Vider le panier
    localStorage.removeItem("panier");
  }
});

if (!localStorage.getItem("panier")) {
  // vérifie que la localstorage est vide, si il est vide on cache le formulaire et on insère le texte
  cart.textContent = "Votre panier est vide.";
  form.classList.add("invisible");
}