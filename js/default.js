var cart = [];
var products = [];
var ingredients = [];
var cartCnt = 0;
var expanded = false;

function addPizza(id, name, imgPath, price)
{
	/*document.getElementById("container").innerHTML +="<br /><div id=\""+id+"\"><p>"+name+"</p><br /><img width=\"200px\" height=\"200px\" src=\""+imgPath+"\" /><br /><p>preis: "+price+"</p><br /><button onclick=\"addToCart("+id+")\">Pizza hinzuf&uuml;gen</button></div>";*/
	var pizzaDiv = document.createElement("div");
	pizzaDiv.id = id;
	pizzaDiv.innerHTML = name;

	breakLine(pizzaDiv);

	var elem = document.createElement("img");
	elem.setAttribute("height", "200");
	elem.setAttribute("width", "200");
	elem.src = imgPath;
	pizzaDiv.appendChild(elem);

	breakLine(pizzaDiv);

	var priceText = document.createTextNode("Preis: " + price);
	pizzaDiv.appendChild(priceText);

	breakLine(pizzaDiv);
	breakLine(pizzaDiv);

	var btn = document.createElement("button");
	btn.setAttribute('onclick',"addToCart(" + id + ")");
	btn.innerHTML = "Pizza hinzuf&uuml;gen";
	pizzaDiv.appendChild(btn);

	breakLine(pizzaDiv);
	breakLine(pizzaDiv);
	breakLine(pizzaDiv);
	breakLine(pizzaDiv);
	
	document.getElementById("container").appendChild(pizzaDiv);
}

function addPizzaToCart(artNr, id)
{
    for (var i = 0; i < products.length; i++)
    {
        /*if (products[i].artNr == artNr)
        {
            document.getElementById("container").innerHTML += "<div id=\"" + products[i].artNr + "\">" + products[i].name + ";\t Preis: " + products[i].price + ";\t Anzahl: " + amount + "<button onclick=\"deleteFromCart(" + products[i].artNr + ")\">&#10006;</button></div>";
            return;
        }
		*/if (products[i].artNr == artNr)
		{
			var div = document.createElement("div");
			div.id = id;
			div.innerHTML = products[i].name;

			var priceText = document.createTextNode("; Preis: " + products[i].price);
			div.appendChild(priceText);
			
			/////////////////////////////////////////////////checkbox kacke
			var extraDiv = document.createElement("div");
			extraDiv.className = "multiselect";
				var selectDiv = document.createElement("div");
				selectDiv.className = "selectBox";
					var selector = document.createElement("select");
					    var option = document.createElement("option");
					    option.text = "extras";
					selector.add(option);
					var overDiv = document.createElement("div");
					overDiv.className = "overSelect";
				selectDiv.setAttribute('onclick', "showCheckboxes("+id+")");
				selectDiv.appendChild(selector);
				selectDiv.appendChild(overDiv);
				
				var checkboxes = document.createElement("div");
				checkboxes.id = "checkboxes " + id;
				checkboxes.style.display = "none";
				buildIngredientCheckboxes(checkboxes, id);
			extraDiv.appendChild(selectDiv);
			extraDiv.appendChild(checkboxes);
			div.appendChild(extraDiv);
		    ////////////////////////////////////////////////////////////////

			var btn = document.createElement("button");
			btn.setAttribute('onclick', "deleteFromCart(" + id + ")");
			btn.innerHTML = '&#10006';
			div.appendChild(btn);

			document.getElementById("container").appendChild(div);
			//http://www.dyn-web.com/tutorials/forms/checkbox/group.php checkbox handling
			return;
		}    
    }
/*div class="multiselect">
    <div class="selectBox" onclick="showCheckboxes()">
      <select>
        <option>Select an option</option>
      </select>
      <div class="overSelect"></div>
    </div>
    <div id="checkboxes">
      <label for="one">
        <input type="checkbox" id="one" />First checkbox</label>
      <label for="two">
        <input type="checkbox" id="two" />Second checkbox</label>
      <label for="three">
        <input type="checkbox" id="three" onchange="toggleIngredient(id)"/>Third checkbox</label>
    </div>
  </div> */
}

function buildIngredientCheckboxes(div, idInCart) {
    for(var i = 0; i< ingredients.length; i++){
        var label = document.createElement("label");
        label.htmlFor = "ckeck " + ingredients[i].artNr;
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = "check " + idInCart + " " + ingredients[i].artNr;
            checkbox.setAttribute("onchange", "changeIngredient(" + ingredients[i].artNr + ", " + idInCart + ")");
            label.appendChild(checkbox);
        label.innerHTML += ingredients[i].name + " " + ingredients[i].price + "€";
        div.appendChild(label);
    }
}

function breakLine(div) {
	br = document.createElement("br");
	div.appendChild(br);
}

function showCheckboxes(id) {
	var checkboxes = document.getElementById("checkboxes " + id);
	if (!expanded) {
		checkboxes.style.display = "block";
		expanded = true;
	} else {
		checkboxes.style.display = "none";
		expanded = false;
	}
}

function changeIngredient(ingArtNr, idInCart) {
    var checkbox = document.getElementById("check " + idInCart + " " + ingArtNr)
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
        var checkbox = document.getElementById("check " + idInCart + " " + ingrToSet[i]);
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
        document.getElementById("btnCart").innerHTML = "Warenkorb " + cartCnt;
    } else {
        document.getElementById("btnCart").innerHTML = "Warenkorb";
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

function loadCheck() {
    document.getElementById("container").innerHTML = "";

}

function loadCart()
{
    document.getElementById("container").innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        addPizzaToCart(cart[i].pArtNr, i);
        setIngredients(i, cart[i].iArtNr);
    }
    document.getElementById("container").innerHTML += "<button onclick=\"loadCheck()\">Zur Kasse</button><button onclick=\"clearCart()\">Warenkorb leeren</button>"
}

function loadMain()
{
	document.getElementById("container").innerHTML = "";
	for(var i = 0; i < products.length; i++)
	{
		addPizza(products[i].artNr, products[i].name, products[i].image, products[i].price);
	}
}

window.onload = function () {
    var rootPath = document.getElementsByTagName("script")[0].src.slice(0, -10);
    var productsPath = rootPath + "json/products.json";
    var ingredientsPath = rootPath + "json/ingredients.json";

    loadJSON(productsPath, function (data) { products = data; loadMain(); }, function (xhr) { console.log(xhr) });
    loadJSON(ingredientsPath, function (data) { ingredients = data; }, function (xhr) { console.log(xhr) });
    
    if (localStorage.getItem("CartPizzaService"))
    {
        cart = JSON.parse(localStorage.getItem("CartPizzaService"));
        cartCnt = cart.length;
        updateCartCount();
    }
}

window.onbeforeunload = function () {
    if (cart.length != 0)
    {
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));
    }
    /*if(Object.keys(cart).length !== 0)
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));*/
}
