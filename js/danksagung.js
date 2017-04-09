function setThxFormTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Vielen Dank f&uumlr ihre Bestellung!";
    headingContainer.appendChild(title);
}

function loadThxForm() {
    setThxFormTitle();
    clearMainframe();

    var thxDiv = newDiv();
    thxDiv.setAttribute("class", "bill customerForm");

    var description = newLabel();
    description.innerHTML = "Wir halten Sie auf dem Laufenden.";
    thxDiv.appendChild(description);

    appendToMainframe(thxDiv);
}
