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
    getElement("main-container").appendChild(pElement);
}

function clearMainframe() {
    getElement("main-container").innerHTML = "";
}

function isChecked(id) {
    return getElement(id).checked;
}
