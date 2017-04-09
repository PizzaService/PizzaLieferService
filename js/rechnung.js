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
    btnBack.setAttribute("onclick", "warenkorbAnzeigen()");
    btnBack.innerHTML = "Zur&uuml;ck";
    appendToMainframe(btnBack);

    var btnNext = newButton();
    btnNext.setAttribute("class", "submit");
    btnNext.setAttribute('onclick', "benutzerdatenAbfragen()");
    btnNext.innerHTML = "Weiter";
    appendToMainframe(btnNext);
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