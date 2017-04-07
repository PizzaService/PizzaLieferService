var expanded = false;
var cartCnt = 0;

function setAttributeAtId(pId, pAtrribute, pValue) {
    getElement(pId).setAttribute(pAtrribute, pValue);
}

function setAttributeAtId(pId, pAtrribute, pValue) {
    getElement(pId).setAttribute(pAtrribute, pValue);
}

//-------------------------------------section Startseite---------------------------------------------------------------------------------

function setStartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Warenauswahl";
    headingContainer.appendChild(title);
}

function addPizzaToStart(pId, pName, pImgPath, pPrice) {
    var pizza = newFigure();
    pizza.setAttribute("id", pId);
    pizza.setAttribute("class", "productStart");

    var img = newImg();
    img.setAttribute("src", pImgPath);
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
    btnBook.innerHTML = "Weiter";
    appendToMainframe(btnBook);
}

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
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function loadCartCount(pCartCnt) {
    cartCnt = pCartCnt;
    getElement("btnCartCount").innerHTML = cartCnt;
}

function incCartCount() {
    getElement("btnCartCount").innerHTML = ++cartCnt;
}

function decCartCount() {
    if (--cartCnt != 0) {
        getElement("btnCartCount").innerHTML = cartCnt;
    } else {
        getElement("btnCartCount").innerHTML = 0;
    }
}

function clearCartCount() {
    cartCnt = 0;
    getElement("btnCartCount").innerHTML = 0;
}

//-------------------------------------section Rechnung---------------------------------------------------------------------------------

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

    var btnSubmit = newButton();
    btnSubmit.setAttribute("class", "submit");
    btnSubmit.innerHTML = "Buchen";
    appendToMainframe(btnSubmit);
}

function setBillTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Rechung";
    headingContainer.appendChild(title);
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