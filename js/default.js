function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
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
    xhr.open("GET", path, true);
    xhr.send(null);
}

window.onload = function () { 
	var products;
	loadJSON("file:///C:/products.json", function(data){products = data}, function(xhr){console.log(xhr)});
	alert("It's loaded!");
}