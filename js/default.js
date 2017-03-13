var cart = [];
var products = [];
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

function addPizzaToCart(artNr, amount)
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
			div.id = products[i].artNr;
			div.innerHTML = products[i].name;

			var priceText = document.createTextNode("; Preis: " + products[i].price);
			div.appendChild(priceText);

			var amountText = document.createTextNode("; Anzahl: " + amount);
			div.appendChild(amountText);
			
			var btn = document.createElement("button");
			btn.setAttribute('onclick',"deleteFromCart(" + products[i].artNr + ")");
			btn.innerHTML = '&#10006';
			div.appendChild(btn);
			/////////////////////////////////////////////////checkbox kacke
			var extraDiv = document.createElement("div");
			extraDiv.className = "multiselect";
				var selectDiv = document.createElement("div");
				selectDiv.className = "selectBox";
					var selector = document.createElement("SELECT");
					var option = document.createElement("option");
					option.text = "extras";
					selector.add(option);
					var overDiv = document.createElement("div");
					overDiv.className = "overSelect";
				selectDiv.setAttribute('onclick', "showCheckboxes()");
				selectDiv.appendChild(selector);
				selectDiv.appendChild(overDiv);
				
				var checkboxes = document.createElement("div");
				checkboxes.id = "checkboxes";
					var cheese = document.createElement("INPUT");
					cheese.setAttribute("type", "checkbox");
					cheese.id = "one";
					var label = document.createElement("label");
					label.value = "yo";
					label.htmlFor = "one";
					var schrooms = document.createElement("INPUT");
					schrooms.setAttribute("type", "checkbox");
				checkboxes.appendChild(cheese);
				checkboxes.appendChild(schrooms);
			extraDiv.appendChild(selectDiv);
			extraDiv.appendChild(checkboxes);
			div.appendChild(extraDiv);
			////////////////////////////////////////////////////////////////

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
        <input type="checkbox" id="three" />Third checkbox</label>
    </div>
  </div> */
}

function breakLine(div) {
	br = document.createElement("br");
	div.appendChild(br);
}

function showCheckboxes() {
	var checkboxes = document.getElementById("checkboxes");
	if (!expanded) {
		checkboxes.style.display = "block";
		expanded = true;
	} else {
		checkboxes.style.display = "none";
		expanded = false;
	}
}

function addToCart(artNr) 
{
    if (cart[artNr])
        cart[artNr]++;
    else
        cart[artNr] = 1;
    cartCnt++;
    updateCartCount();
}

function deleteFromCart(artNr) {
    if (--cart[artNr] == 0)
        cart[artNr] = null;
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

function clearCartCount() {
    document.getElementById("btnCart").innerHTML = document.getElementById("btnCart").innerHTML.slice(0,9);
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

function loadCart()
{
    document.getElementById("container").innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        if(cart[i])
        {
            addPizzaToCart(i, cart[i]);
        }
    }
    document.getElementById("container").innerHTML += "<button onclick=\"clearCart()\">Warenkorb leeren</button>"
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
    var startPath = document.getElementsByTagName("script")[0].src;
    var cartPath = document.getElementsByTagName("script")[0].src;
    startPath = startPath.slice(0, -10) + "json/products.json";
    cartPath = cartPath.slice(0, -10) + "json/cart.json";

    loadJSON(startPath, function (data) { products = data; loadMain(); }, function (xhr) { console.log(xhr) });
    
    if (localStorage.getItem("CartPizzaService"))
    {
        cart = JSON.parse(localStorage.getItem("CartPizzaService"));
        for (var i = 0; i < cart.length; i++)
        {
            if (cart[i])
                cartCnt += cart[i];
        }
        updateCartCount();
    }
}

window.onbeforeunload = function () {
    if (cart.length != 0)
    {
        window.localStorage.setItem("CartPizzaService", JSON.stringify(cart));
    }
}
