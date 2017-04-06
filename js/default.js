var cart = [];
var products = [];
var ingredients = [];
var cartCnt = 0;
var expanded = false;

function addPizzaToStart(pId, pName, pImgPath, pPrice)
{
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

function addPizzaToCart(pArtNr, pId)
{
    for (var i = 0; i < products.length; i++)
    {
 		if (products[i].artNr == pArtNr)
 		{
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

            productSum += products[i].price
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

    pBill.appendChild(pizza);

    return productSum;
}

function showCheckboxes(pSelect, pId) {
	var checkboxes = document.getElementById("checkboxes_" + pId);
	if (!expanded) {
	    checkboxes.style.display = "block";
		expanded = true;
	} else {
	    checkboxes.style.display = "none";
		expanded = false;
	}
}

function toggleIngredient(pIdInCart, pIngArtNr) {
    var checkbox = getElement("checkbox_" + pIdInCart + "_" + pIngArtNr);
    if (checkbox.checked) {
        cart[pIdInCart].iArtNr.push(pIngArtNr);
    }
    else {
        for (var i = 0; i < cart[pIdInCart].iArtNr.length; i++) {
            if (cart[pIdInCart].iArtNr[i] == pIngArtNr)
                cart[pIdInCart].iArtNr.splice(i, 1);
        }
    }
}

function setIngredients(idInCart, pIngToSet) {
    for (var i = 0; i < pIngToSet.length; i++) {
        var checkbox = getElement("checkbox_" + idInCart + "_" + pIngToSet[i]);
        checkbox.setAttribute("checked", true);
    }
}

function addToCart(artNr) {
    cart.push({"pArtNr" : artNr, "iArtNr" : []});
    cartCnt++;
    updateCartCount();
}

function deleteFromCart(index) {
    cart.splice(index,1);
    loadCart();
    cartCnt--;
    updateCartCount();
}

function clearCart() {
    cart = [];
    loadCart();
    cartCnt = 0;
    updateCartCount();
}

function updateCartCount() {
    if(cartCnt != 0) {
        getElement("btnCartCount").innerHTML = cartCnt;
    } else {
        getElement("btnCartCount").innerHTML = 0;
    }
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function()
    {
		if(xhr.readyState == 4)
			if (xhr.status == 200 || xhr.status == 0) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
			    if (error)
			        error(xhr);
			}
    };
    xhr.send(null);
}

function loadBill() {
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
    billSumNameTag.innerHTML = "Gesamt Preis:"
}

function loadCart()
{
    setCartTitle();
    clearMainframe();

    for (var i = 0; i < cart.length; i++) {
        addPizzaToCart(cart[i].pArtNr, i);
        setIngredients(i, cart[i].iArtNr);
    }
    getElement("main-container").innerHTML += "<button onclick=\"loadBill()\">Zur Kasse</button><button onclick=\"clearCart()\">Warenkorb leeren</button>"
}

function loadMain()
{
    setStartTitle();
    clearMainframe();
	for(var i = 0; i < products.length; i++)
	{
		addPizzaToStart(products[i].artNr, products[i].name, products[i].image, products[i].price);
	}
}

window.onload = function () {
    var rootPath = document.getElementsByTagName("script")[0].src.slice(0, -14);
    var productsPath = rootPath + "json/products.json";
    var ingredientsPath = rootPath + "json/ingredients.json";

    loadJSON(productsPath, function (data) { products = data; loadMain(); }, function (xhr) { console.log(xhr) });
    loadJSON(ingredientsPath, function (data) { ingredients = data; }, function (xhr) { console.log(xhr) });

    if (localStorage.getItem("CartPizzaService")) {
        cart = JSON.parse(localStorage.getItem("CartPizzaService"));
        cartCnt = cart.length;
        updateCartCount();
    }
}

window.onbeforeunload = function () {
    if (cart.length != 0) {
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));
    } else {
        window.localStorage.clear();
    }

}
