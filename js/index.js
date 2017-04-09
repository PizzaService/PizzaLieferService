var cart = [];
var products = [];
var ingredients = [];

//-------------------------------------section popup------------------------------------------------------------------------------------

function setPopupNotToProbagate() {
    getElement("popupInner").onclick = function (e) {
        event = e || window.event;
        event.cancelBubble = true;
        if (event.stopPropagation)
            event.stopPropagation();
    }
}

//-------------------------------------section Warenkorb--------------------------------------------------------------------------------

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

function setIngredients(pIdInCart, pIngToSet) {
    for (var i = 0; i < pIngToSet.length; i++) {
        var checkboxId = "checkbox_" + pIdInCart + "_" + pIngToSet[i];
        setAttributeAtId(checkboxId, "checked", true);
    }
}

function addToCart(pArtNr) {
    cart.push({ "pArtNr": pArtNr, "iArtNr": [] });
    incCartCount();
}

function deleteFromCart(pIndex) {
    cart.splice(pIndex,1);
    loadCart();
    decCartCount();
}

function clearCart() {
    cart = [];
    loadCart();
    clearCartCount();
}

//-------------------------------------section Rechnung-Kundendaten--------------------------------------------------------------------------------

function book() {
    var name = getElement("customerFormName").value;
    var firstName = getElement("customerFormFirstName").value;
    var street = getElement("customerFormStreet").value;
    var plz = getElement("customerFormPlz").value;
    var location = getElement("customerFormLocation").value;
    var email = getElement("customerFormEMail").value;
    var phoneNumber = getElement("customerFormCellPhone").value;

    if (name && firstName && street && plz && location && email && phoneNumber) {
        cart = [];
        clearCartCount();
        loadThxForm();
    } else {
        var incorrectInputText = newP();
        incorrectInputText.setAttribute("class", "incorrectInputText");
        incorrectInputText.innerHTML = "Es m&uuml;ssen alle Felder ausgef&uuml;llt werden um fortzufahren!";
        getElement("customerDataSheet").appendChild(incorrectInputText);
    }
}



//--------------------------------------------------------------------------------------------------------------------------------------------

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

window.onload = function () {
    var rootpath = "http://" + document.location.hostname;
    var productsPath = rootpath + "/js/json/products.json";
    var ingredientsPath = rootpath + "/js/json/ingredients.json";

    loadJSON(productsPath, function (data) { products = data; loadStart(); }, function (xhr) { console.log(xhr) });
    loadJSON(ingredientsPath, function (data) { ingredients = data; }, function (xhr) { console.log(xhr) });

    if (localStorage.getItem("CartPizzaService")) {
        cart = JSON.parse(localStorage.getItem("CartPizzaService"));
        loadCartCount(cart.length);
    }

    setPopupNotToProbagate();
}

window.onbeforeunload = function () {
    if (cart.length != 0) {
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));
    } else {
        window.localStorage.clear();
    }

}
