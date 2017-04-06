var cart = [];
var products = [];
var ingredients = [];
var cartCnt = 0;
var expanded = false;

function addPizza(pId, pName, pImgPath, pPrice)
{
    var pizza = newFigure();
    pizza.setAttribute("id", pId);
    pizza.setAttribute("class", "productStart");

	var img = newImg();
	img.setAttribute("src", pImgPath);
	pizza.appendChild(img);

	var name = newFigcaption();
	name.innerHTML = pName;
	pizza.appendChild(name);

	var price = newP();
	price.setAttribute("class", "productPrice");
	price.innerHTML = pPrice.toFixed(2) + " €";
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
 		    selectBox.setAttribute("onclick", "showCheckboxes(" + pId + ")");

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
 		    pizza.appendChild(checkboxes);

 		    var btnDelete = newButton();
 		    btnDelete.setAttribute("type", "button");
 		    btnDelete.setAttribute('onclick', "deleteFromCart(" + pId + ")");
 		    btnDelete.innerHTML = "&#10006;";
 		    pizza.appendChild(btnDelete);

 		    var price = newP();
 		    price.setAttribute("class", "cartPrice");
 		    price.innerHTML = products[i].price.toFixed(2) + " €";
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
        checkbox.setAttribute("id", "check_" + pIdInCart + "_" + ingredients[i].artNr);
        checkbox.setAttribute("onchange", "changeIngredient(" + checkbox.id + ")");
        label.appendChild(checkbox);
        label.innerHTML += ingredients[i].name;

        var labelPrice = newLabel();
        labelPrice.setAttribute("class", "ingredientPrice");
        labelPrice.innerHTML = "+" + ingredients[i].price.toFixed(2) + " €";
        label.appendChild(labelPrice);
        pCheckboxes.appendChild(label);
    }
}

function showCheckboxes(pId) {
	var checkboxes = document.getElementById("checkboxes_" + pId);
	if (!expanded) {
		checkboxes.style.display = "block";
		expanded = true;
	} else {
		checkboxes.style.display = "none";
		expanded = false;
	}
}

function changeIngredient(pCheckboxId) {
    var checkbox = document.getElementById(pCheckboxId)
    if (checkbox.checked) {
        cart[idInCart].iArtNr.push(ingArtNr);
    }
    else {
        for (var i = 0; i < cart[idInCart].iArtNr.length; i++) {
            if (cart[idInCart].iArtNr[i] == ingArtNr)
                cart[idInCart].iArtNr.splice(i, 1);
        }
    }
}

function setIngredients(idInCart, ingrToSet){
    for (var i = 0; i < ingrToSet.length; i++) {
        var checkbox = document.getElementById("check_" + idInCart + "_" + ingrToSet[i]);
        checkbox.setAttribute("checked", true);
    }
}

function addToCart(artNr) {
    cart.push({"pArtNr" : artNr, "iArtNr" : []});
    cartCnt++;
    updateCartCount();
}

function addToBill(pArtNr, iArtNr, idInCart) {
    var productSum = 0.0;
    var htmlString = "";

    for(var i = 0; i< products.length; i++){
        if(products[i].artNr == pArtNr){
            htmlString += "<div id=\"bill " + idInCart + "\">" + products[i].name + "; Extra-Zutaten: ";
            productSum += products[i].price
            break;
        }
    }

    for(var i = 0; i< iArtNr.length; i++){
        for(var j = 0; j<ingredients.length; j++){
            if(ingredients[j].artNr == iArtNr[i]){
                htmlString += ingredients[j].name + ", ";
                productSum += ingredients[j].price;
                break;
            }
        }
    }
    htmlString = htmlString.substring(0, htmlString.length - 2);

    htmlString += " ............. Gesamt Preis: " + productSum + "€</div>";
    document.getElementById("main-container").innerHTML += htmlString;

    return productSum;
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
        document.getElementById("btnCartCount").innerHTML = cartCnt;
    } else {
        document.getElementById("btnCartCount").innerHTML = 0;
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
    document.getElementById("main-container").innerHTML = "<h1>Rechnung</h1>";
    var sum = 0.0;
    for (var i = 0; i < cart.length; i++)
        sum += addToBill(cart[i].pArtNr, cart[i].iArtNr, i);
    
    document.getElementById("main-container").innerHTML += "<h2>Total Price: " + sum + "€</h2>";
}

function loadCart()
{
    document.getElementById("main-container").innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        addPizzaToCart(cart[i].pArtNr, i);
        setIngredients(i, cart[i].iArtNr);
    }
    document.getElementById("main-container").innerHTML += "<button onclick=\"loadBill()\">Zur Kasse</button><button onclick=\"clearCart()\">Warenkorb leeren</button>"
}

function loadMain()
{
    document.getElementById("main-container").innerHTML = "";
	for(var i = 0; i < products.length; i++)
	{
		addPizza(products[i].artNr, products[i].name, products[i].image, products[i].price);
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
