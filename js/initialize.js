var cart = [];
var products = [];
var ingredients = [];
var cartCnt = 0;

//lädt die Json vom server
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4)
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

//lädt die Daten aus dem Json und falls im localstorage eine cartdatei ist wird diese ebenfalls geladen.
window.onload = function () {
    var rootpath = "http://" + document.location.hostname;
    var productsPath = rootpath + "/js/json/products.json";
    var ingredientsPath = rootpath + "/js/json/ingredients.json";

    loadJSON(productsPath, function (data) { products = data; alleWarenAnzeigen(); }, function (xhr) { console.log(xhr) });
    loadJSON(ingredientsPath, function (data) { ingredients = data; }, function (xhr) { console.log(xhr) });

    if (localStorage.getItem("CartPizzaService")) {
        cart = JSON.parse(localStorage.getItem("CartPizzaService"));
        loadCartCount(cart.length);
    }

    setPopupNotToProbagate();
}

//falls der Warenkorb nicht leer is wird er bei schließung oder reload der Seite in den localStorage geladen
window.onbeforeunload = function () {
    if (cart.length != 0) {
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));
    } else {
        window.localStorage.clear();
    }

}
