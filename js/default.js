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
var products;
loadJSON("file:///D:/Studium/PizzaService/Programm/js/json/products.json", function(data){products = data}, function(xhr){console.log(xhr)});

window.onload = function () { 
	
	alert("It's loaded!");
}