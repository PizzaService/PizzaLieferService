function setStartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Warenauswahl";
    headingContainer.appendChild(title);
}

function loadStart() {
    setStartTitle();
    clearMainframe();
    for (var i = 0; i < products.length; i++) {
        addPizzaToStart(products[i].artNr, products[i].name, products[i].image, products[i].price, products[i].description);
    }
}

function addPizzaToStart(pId, pName, pImgPath, pPrice, pDesciption) {
    var pizza = newFigure();
    pizza.setAttribute("id", pId);
    pizza.setAttribute("class", "productStart");

    var img = newImg();
    img.setAttribute("src", pImgPath);
    img.setAttribute("onclick", "loadPopup(" + pId + ", \"" + pName + "\", \"" + pImgPath + "\", " + pPrice + ", \"" + pDesciption + "\")");
    pizza.appendChild(img);

    var name = newP();
    name.setAttribute("class", "productName");
    name.innerHTML = pName;
    pizza.appendChild(name);

    var price = newP();
    price.setAttribute("class", "productPrice");
    price.innerHTML = pPrice.toFixed(2) + " &#8364;";
    pizza.appendChild(price);

    var addToCart = newButton();
    addToCart.setAttribute("type", "button");
    addToCart.setAttribute("onclick", "wareZumWarenkorbHinzufuegen(" + pId + ")");
    addToCart.innerHTML = "zum Warenkorb hinzuf&uuml;gen";
    pizza.appendChild(addToCart);

    appendToMainframe(pizza);
}

//-----------------------------------------------------------popup-----------------------------------------------

function loadPopup(pId, pName, pImgPath, pPrice, pDesicription) {
    clearPopup();

    var img = newImg();
    img.setAttribute("src", pImgPath);
    appendToPopup(img);

    var title = newP();
    title.setAttribute("class", "title");
    title.innerHTML = pName;
    appendToPopup(title);

    var descriptionNameTag = newP();
    descriptionNameTag.innerHTML = "Zutaten:";
    appendToPopup(descriptionNameTag);

    var description = newP();
    description.innerHTML = pDesicription;
    appendToPopup(description);

    var bottomContainer = newDiv();
    bottomContainer.setAttribute("class", "bottomContainer");

    var priceNameTag = newP();
    priceNameTag.innerHTML = "Preis:";
    bottomContainer.appendChild(priceNameTag);

    var price = newP();
    price.setAttribute("class", "popupPrice");
    price.innerHTML = pPrice.toFixed(2) + " &#8364;";
    bottomContainer.appendChild(price);

    var btnAddToCart = newButton();
    btnAddToCart.setAttribute("onclick", "wareZumWarenkorbHinzufuegen(" + pId + "); togglePopup();");
    btnAddToCart.innerHTML = "zum Warenkorb hinzuf&uuml;gen";
    bottomContainer.appendChild(btnAddToCart);
    appendToPopup(bottomContainer);

    togglePopup();
}

function togglePopup() {
    var popup = getElement("popup");
    var currentStyle = popup.currentStyle ? popup.currentStyle.display : getComputedStyle(popup, null).display;

    if (currentStyle == "none") {
        popup.style.display = "table";
    } else {
        popup.style.display = "none";
    }
}

function setPopupNotToProbagate() {
    getElement("popupInner").onclick = function (e) {
        event = e || window.event;
        event.cancelBubble = true;
        if (event.stopPropagation)
            event.stopPropagation();
    }
}