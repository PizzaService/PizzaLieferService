var expanded = false;
var cartCnt = 0;

function setAttributeAtId(pId, pAtrribute, pValue) {
    getElement(pId).setAttribute(pAtrribute, pValue);
}

//-------------------------------------section Popup---------------------------------------------------------------------------------

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
    btnAddToCart.setAttribute("onclick", "addToCart(" + pId + "); togglePopup();");
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

//-------------------------------------section Startseite---------------------------------------------------------------------------------

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
    img.setAttribute("onclick", "loadPopup(" + pId +  ", \"" + pName + "\", \"" + pImgPath + "\", " + pPrice + ", \"" + pDesciption + "\")");
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
    addToCart.setAttribute("onclick", "addToCart(" + pId + ")");
    addToCart.innerHTML = "zum Warenkorb hinzuf&uuml;gen";
    pizza.appendChild(addToCart);

    appendToMainframe(pizza);
}

//-------------------------------------section Warenkorb---------------------------------------------------------------------------------

function setCartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Warenkorb";
    headingContainer.appendChild(title);

    var btnDeleteAll = newButton();
    btnDeleteAll.setAttribute("onclick", "clearCart()");
    btnDeleteAll.innerHTML = "Warenkorb leeren";
    headingContainer.appendChild(btnDeleteAll);
}

function loadCart() {
    setCartTitle();
    clearMainframe();

    for (var i = 0; i < cart.length; i++) {
        addPizzaToCart(cart[i].pArtNr, i);
        setIngredients(i, cart[i].iArtNr);
    }
    
    var btnBook = newButton();
    btnBook.setAttribute("class", "submit");
    btnBook.setAttribute("onclick", "loadBill()");
    btnBook.id = "checkout";
    btnBook.innerHTML = "Zur Kasse";
    appendToMainframe(btnBook);

    if (cartCnt == 0) {
        hideGoOnButton();
    }
    
}

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
            selectBox.setAttribute("onclick", "showCheckboxes(this, " + pId + ")");

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
            btnDelete.setAttribute('onclick', "deleteFromCart(" + pId + ")");
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

function showCheckboxes(pSelect, pId) {
    var checkboxes = getElement("checkboxes_" + pId);
    var currentStyle = checkboxes.currentStyle ? checkboxes.currentStyle.display : getComputedStyle(checkboxes, null).display;

    if (currentStyle == "none") {
        checkboxes.style.display = "block";
    } else {
        checkboxes.style.display = "none";
    }
}

function loadCartCount(pCartCnt) {
    cartCnt = pCartCnt;
    getElement("btnCartCount").innerHTML = cartCnt;
}

function incCartCount() {
    cartGlow();
    getElement("btnCartCount").innerHTML = ++cartCnt;
}

function decCartCount() {
    cartGlow();
    if (--cartCnt != 0) {
        getElement("btnCartCount").innerHTML = cartCnt;
    } else {
        getElement("btnCartCount").innerHTML = 0;
        if (cartCnt == 0) {
            hideGoOnButton();
        }
    }
}

function clearCartCount() {
    cartGlow();
    cartCnt = 0;
    getElement("btnCartCount").innerHTML = 0;
    if (cartCnt == 0) {
        hideGoOnButton();
    }
}

function cartGlow() {
    var btn = document.querySelector('.header-button-cart-count')
    btn.classList.toggle('glow');
    setTimeout(function () { btn.classList.toggle('glow'); }, 300);
}

function hideGoOnButton() {
    document.getElementById('checkout').style.display = "none";
}
//-------------------------------------section Rechnung---------------------------------------------------------------------------------

function setBillTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Rechung";
    headingContainer.appendChild(title);
}

function loadBill() {
    setBillTitle();
    clearMainframe();

    var bill = newDiv();
    bill.setAttribute("class", "bill");

    var sum = 0.0;
    for (var i = 0; i < cart.length; i++)
        sum += addPizzaToBill(cart[i].pArtNr, cart[i].iArtNr, i, bill);

    var billSum = newH1();
    billSum.setAttribute("class", "billSum");
    billSum.innerHTML = sum.toFixed(2) + " &#8364;";
    bill.appendChild(billSum);

    var billSumNameTag = newH1();
    billSumNameTag.innerHTML = "Gesamt Preis:";
    bill.appendChild(billSumNameTag);
    appendToMainframe(bill);

    var btnBack = newButton();
    btnBack.setAttribute("class", "back");
    btnBack.setAttribute("onclick", "loadCart()");
    btnBack.innerHTML = "Zur&uuml;ck";
    appendToMainframe(btnBack);

    var btnCheckOut = newButton();
    btnCheckOut.setAttribute("class", "submit");
    btnCheckOut.setAttribute('onclick', "openCustomerDataSheet()");
    btnCheckOut.innerHTML = "Weiter";
    appendToMainframe(btnCheckOut);
}

function addPizzaToBill(pArtNr, iArtNr, idInCart, pBill) {
    var productSum = 0.0;
    var ingredientsString = "";

    var pizza = newDiv();
    pizza.setAttribute("class", "productBill");

    for (var i = 0; i < products.length; i++) {
        if (products[i].artNr == pArtNr) {
            var name = newP();
            name.setAttribute("class", "billProductName");
            name.innerHTML = products[i].name;
            pizza.appendChild(name);

            productSum += products[i].price;
            break;
        }
    }

    for (var i = 0; i < iArtNr.length; i++) {
        for (var j = 0; j < ingredients.length; j++) {
            if (ingredients[j].artNr == iArtNr[i]) {
                ingredientsString += ingredients[j].name + ", ";
                productSum += ingredients[j].price;
                break;
            }
        }
    }

    if (ingredientsString != "") {
        var ingredientsNameTag = newP();
        ingredientsNameTag.setAttribute("class", "billIngredientsNameTag");
        ingredientsNameTag.innerHTML = "Extra Zutaten:";
        pizza.appendChild(ingredientsNameTag);

        var ingredientsText = newP();
        ingredientsText.setAttribute("class", "billIngredients");
        ingredientsText.innerHTML = ingredientsString.substring(0, ingredientsString.length - 2);
        pizza.appendChild(ingredientsText);
    }

    var sum = newP();
    sum.setAttribute("class", "billProductSum");
    sum.innerHTML = productSum.toFixed(2) + " &#8364;";
    pizza.appendChild(sum);

    var sumTagName = newP();
    sumTagName.setAttribute("class", "billProductSumNameTag");
    sumTagName.innerHTML = "Preis:";
    pizza.appendChild(sumTagName);

    pBill.appendChild(pizza);
    return productSum;
}

function openCustomerDataSheet() {
    var dataSheet = newDiv();
    var nameInput = newInput();
    var nameLabel = newLabel();
    var streetInput = newInput();
    var streetLabel = newLabel();
    var plzOrtInput = newInput();
    var plzOrtLabel = newLabel();
    var mailInput = newInput();
    var mailLabel = newLabel();
    var handyInput = newInput();
    var handyLabel = newLabel();
    var terrorOrgInput = newInput();
    var terrorOrgLabel = newLabel();
    nameInput.type = "text";
    nameLabel.innerHTML = "Name, Vorname";
    streetInput.type = "text";
    streetLabel.innerHTML = "Stra" + "&szlig;" + "e, Hausnummer";
    plzOrtInput.type = "text";
    plzOrtLabel.innerHTML = "PLZ, Ort";
    mailInput.type = "text";
    mailLabel.innerHTML = "Email-Adresse";
    handyInput.type = "type";
    handyLabel.innerHTML = "Handynummer";
    terrorOrgInput.type = "text";
    terrorOrgLabel.innerHTML = "Terroristische Organisation";
    dataSheet.appendChild(nameLabel);
    dataSheet.appendChild(nameInput);
    dataSheet.appendChild(streetLabel);
    dataSheet.appendChild(streetInput);
    dataSheet.appendChild(plzOrtLabel);
    dataSheet.appendChild(plzOrtInput);
    dataSheet.appendChild(mailLabel);
    dataSheet.appendChild(mailInput);
    dataSheet.appendChild(handyLabel);
    dataSheet.appendChild(handyInput);
    dataSheet.appendChild(terrorOrgLabel);
    dataSheet.appendChild(terrorOrgInput);
    appendToMainframe(dataSheet);
    appendToMainframe(dataSheet);
}
