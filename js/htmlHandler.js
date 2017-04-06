function getElement(id) {
    return document.getElementById(id);
}

function newLabel() {
    return document.createElement("label");
}

function newDiv() {
    return document.createElement("div");
}

function newFigure() {
    return document.createElement("figure");
}

function newImg() {
    return document.createElement("img");
}

function newFigcaption() {
    return document.createElement("figcaption");
}

function newP() {
    return document.createElement("p");
}

function newButton() {
    return document.createElement("button");
}

function newSelect() {
    return document.createElement("select");
}

function newOption() {
    return document.createElement("option");
}

function newInput() {
    return document.createElement("input");
}

function newH1() {
    return document.createElement("h1");
}

function appendToMainframe(pElement) {
    document.getElementById("main-container").appendChild(pElement);
}

function clearMainframe() {
    document.getElementById("main-container").innerHTML = "";
}

function setStartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";
    
    var title = newH1();
    title.innerHTML = "Warenauswahl";
    headingContainer.appendChild(title);
}

function setCartTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Warenkorb";
    headingContainer.appendChild(title);

    var btnDeleteAll = newButton();
    btnDeleteAll.setAttribute("onclick", "clearCart()");
    btnDeleteAll.innerHTML = "Warenkorb leeren";
    headingContainer.appendChild(btnDeleteAll);
}

function setBillTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Rechung";
    headingContainer.appendChild(title);
}
