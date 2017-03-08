function addPizza(id, name, imgPath, price)
{
	document.getElementById("container").innerHTML +="<br /><div id=\""+id+"\"><p>"+name+"</p><br /><img width=\"200px\" height=\"200px\" src=\""+imgPath+"\" /><br /><p>preis: "+price+"</p><br /><button>Pizza hinzuf&uuml;gen</button></div>";
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

function showCart(products)
{
    document.getElementById("container").innerHTML = "";
	for(var i = 0; i < products.length; i++)
	{
		addPizza(i, products[i].name, products[i].image, products[i].price);
	}
}

function start(products)
{
	document.getElementById("container").innerHTML = "";
	for(var i = 0; i < products.length; i++)
	{
		addPizza(i, products[i].name, products[i].image, products[i].price);
	}
}

var products;
var cart;
var startPath = document.getElementsByTagName("script")[0].src;
var cartPath = document.getElementsByTagName("script")[0].src;
startPath = startPath.slice(0,-10) + "json/products.json";
cartPath = cartPath.slice(0,-10) + "json/cart.json";
loadJSON(startPath, function(data){products = data}, function(xhr){console.log(xhr)});
loadJSON(cartPath, function(data){cart = data}, function(xhr){console.log(xhr)});

window.onload = function () { 
	document.getElementById("title").innerHTML = "hahahahahaha";
	document.getElementById("image").src = "images/salami.png";
	start(products);
	document.getElementById("showCart").addEventListener("click", function() {
    showCart(cart);
});
	document.getElementById("start").addEventListener("click", function() {
    start(products);
});
	
}