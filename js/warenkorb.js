//beinhaltet alle Methoden für den Warenkorb

//lädt in den heding-container den Titel des Warenkorbs
function setCartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Warenkorb";
    headingContainer.appendChild(title);

    var btnDeleteAll = newButton();
    btnDeleteAll.setAttribute("onclick", "warenkorbVerwerfen()");
    btnDeleteAll.innerHTML = "Warenkorb leeren";
    headingContainer.appendChild(btnDeleteAll);
}

//lädt die Warenkorb-Seite in den main-container
function loadCart() {
    setCartTitle();
    clearMainframe();

    for (var i = 0; i < cart.length; i++) {
        addPizzaToCart(cart[i].pArtNr, i);
        setIngredients(i, cart[i].iArtNr);
    }

    var btnBook = newButton();
    btnBook.setAttribute("class", "submit");
    btnBook.setAttribute("onclick", "warenkorbAuschecken()");
    btnBook.id = "checkout";
    btnBook.innerHTML = "Zur Kasse";
    appendToMainframe(btnBook);

    if (cartCnt == 0) {
        hideButtonToBill();
        var emptyText = newP();
        emptyText.innerHTML = "Sie haben keine Waren im Warenkorb."
    }

}

//fügt dem main-container die pizza hinzu
function addPizzaToCart(pArtNr, pId) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].artNr == pArtNr) {
            var pizza = newDiv();
            pizza.setAttribute("class", "productCart");

            var img = newImg();
            img.setAttribute("src", products[i].image);
            pizza.appendChild(img);

            var name = newP();
            name.innerHTML = products[i].name;
            pizza.appendChild(name);

            var multiselect = newDiv();
            multiselect.setAttribute("class", "multiselect");

            var selectBox = newDiv();
            selectBox.setAttribute("class", "selectBox");
            selectBox.setAttribute("onclick", "zuzatenZurWareHinzufuegenEntfernen(this, " + pId + ")");

            var select = newSelect();

            var option = newOption();
            option.innerHTML = "Extrazutaten";
            select.appendChild(option);
            selectBox.appendChild(select);

            var overselect = newDiv();
            overselect.setAttribute("class", "overSelect");
            selectBox.appendChild(overselect);
            multiselect.appendChild(selectBox);

            var checkboxes = newDiv();
            checkboxes.setAttribute("id", "checkboxes_" + pId);
            checkboxes.setAttribute("class", "checkboxes");
            checkboxes.style.display = "none";
            checkboxes.style.backgroundColor = "white";
            checkboxes.style.border = "1px #dadada solid";
            checkboxes.style.position = "relative";
            checkboxes.style.zIndex = "1000";
            buildIngredientCheckboxes(checkboxes, pId);
            multiselect.appendChild(checkboxes);
            pizza.appendChild(multiselect);

            var btnDelete = newButton();
            btnDelete.setAttribute("type", "button");
            btnDelete.setAttribute('onclick', "wareAusWarenkorbEntfernen(" + pId + ")");
            btnDelete.innerHTML = "&#10006;";
            pizza.appendChild(btnDelete);

            var price = newP();
            price.setAttribute("class", "cartPrice");
            price.innerHTML = products[i].price.toFixed(2) + " &#8364;";
            pizza.appendChild(price);

            var priceNameTag = newP();
            priceNameTag.setAttribute("class", "cartPriceNameTag");
            priceNameTag.innerHTML = "Gundpreis:";
            pizza.appendChild(priceNameTag);

            appendToMainframe(pizza);
        }
    }
}

//fügt der pizza die auswahl der extrazutaten hinzu
function buildIngredientCheckboxes(pCheckboxes, pIdInCart) {
    for (var i = 0; i < ingredients.length; i++) {
        var label = newLabel();
        label.setAttribute("for", "ckeck_" + pIdInCart + "_" + ingredients[i].artNr);

        var checkbox = newInput();
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "checkbox_" + pIdInCart + "_" + ingredients[i].artNr);
        checkbox.setAttribute("onchange", "toggleIngredient(" + pIdInCart + ", " + ingredients[i].artNr + ")");
        label.appendChild(checkbox);
        label.innerHTML += ingredients[i].name;

        var labelPrice = newLabel();
        labelPrice.setAttribute("class", "ingredientPrice");
        labelPrice.innerHTML = "+" + ingredients[i].price.toFixed(2) + " &#8364;";
        label.appendChild(labelPrice);
        pCheckboxes.appendChild(label);
    }
}

//ist zum ein/ausklappen der Extrazutaten zuständig
function showCheckboxes(pSelect, pId) {
    var checkboxes = getElement("checkboxes_" + pId);
    var currentStyle = checkboxes.currentStyle ? checkboxes.currentStyle.display : getComputedStyle(checkboxes, null).display;

    if (currentStyle == "none") {
        checkboxes.style.display = "block";
    } else {
        checkboxes.style.display = "none";
    }
}

//fügt einer Ware die Extra Zutat hinzu oder entfernt sie wenn sie bereits vorhanden ist
function toggleIngredient(pIdInCart, pIngArtNr) {
    var checkboxId = "checkbox_" + pIdInCart + "_" + pIngArtNr;
    if (isChecked(checkboxId)) {
        cart[pIdInCart].iArtNr.push(pIngArtNr);
    }
    else {
        for (var i = 0; i < cart[pIdInCart].iArtNr.length; i++) {
            if (cart[pIdInCart].iArtNr[i] == pIngArtNr)
                cart[pIdInCart].iArtNr.splice(i, 1);
        }
    }
}

//fügt jeder Ware aus dem Warenkorb die entsprechende extrazuztat hinzu (wir nach seitenreload aufgerufen)
function setIngredients(pIdInCart, pIngToSet) {
    for (var i = 0; i < pIngToSet.length; i++) {
        var checkboxId = "checkbox_" + pIdInCart + "_" + pIngToSet[i];
        setAttributeAtId(checkboxId, "checked", true);
    }
}

//fügt eine pizza dem Warenkorb hinzu
function addToCart(pArtNr) {
    cart.push({ "pArtNr": pArtNr, "iArtNr": [] });
    incCartCount();
}

//entfernt eine Pizza aus dem Warenkorb
function deleteFromCart(pIndex) {
    cart.splice(pIndex, 1);
    loadCart();
    decCartCount();
}

//leert den kompletten Warenkorb
function clearCart() {
    cart = [];
    clearCartCount();
}

//aktualiesiert die anzeige, welche für die anzahl der im Warenkorb befindlichen Elemente zuständig sind
function loadCartCount(pCartCnt) {
    cartCnt = pCartCnt;
    getElement("btnCartCount").innerHTML = cartCnt;
}

//inkrementiert den Warenkorbzähler
function incCartCount() {
    cartGlow();
    getElement("btnCartCount").innerHTML = ++cartCnt;
}

//dekrementiert den Warenkorbzähler
function decCartCount() {
    cartGlow();
    if (--cartCnt != 0) {
        getElement("btnCartCount").innerHTML = cartCnt;
    } else {
        getElement("btnCartCount").innerHTML = 0;
        hideButtonToBill();
    }
}

//setzt den Warenkorbzähler zurück
function clearCartCount() {
    cartGlow();
    cartCnt = 0;
    getElement("btnCartCount").innerHTML = 0;
    hideButtonToBill();
}

//fügt ein leuchten des Warenkorbzählers hinzu
function cartGlow() {
    var btn = document.querySelector('.header-button-cart-count')
    btn.classList.toggle('glow');
    setTimeout(function () { btn.classList.toggle('glow'); }, 300);
}

//versteckt den Button zur rechnung, wenn der Warenkorb leer ist oder zeigt ihn wieder an
function hideButtonToBill() {
    var buttonToBill = getElement('checkout');
    if (buttonToBill)
        buttonToBill.style.display = "none";
}
