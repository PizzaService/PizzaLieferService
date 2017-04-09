function setCustomerDataSheetTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Buchungsdaten";
    headingContainer.appendChild(title);
}

function loadCustomerDataSheet() {
    setCustomerDataSheetTitle();
    clearMainframe();

    var customerDataSheet = newDiv();
    customerDataSheet.setAttribute("class", "bill customerForm");
    customerDataSheet.setAttribute("id", "customerDataSheet")

    var description = newP();
    description.innerHTML = "Bitte f&uuml;llen Sie alle nachfolgenden Eingabefelder korrekt und vollst&auml;ndig aus."
    customerDataSheet.appendChild(description);

    var table = newTable();
    addRowToCustomerDataSheet(table, "Name", "customerFormName");
    addRowToCustomerDataSheet(table, "Vorname", "customerFormFirstName");
    addRowToCustomerDataSheet(table, "Stra&beta;e & Hausnummer", "customerFormStreet");
    addRowToCustomerDataSheet(table, "PLZ", "customerFormPlz");
    addRowToCustomerDataSheet(table, "Ort", "customerFormLocation");
    addRowToCustomerDataSheet(table, "Email-Adresse", "customerFormEMail");
    addRowToCustomerDataSheet(table, "Handynummer", "customerFormCellPhone");
    customerDataSheet.appendChild(table);
    appendToMainframe(customerDataSheet);

    var btnBack = newButton();
    btnBack.setAttribute("class", "back");
    btnBack.setAttribute("onclick", "warenkorbAuschecken()");
    btnBack.innerHTML = "Zur&uuml;ck";
    appendToMainframe(btnBack);

    var btnCheckOut = newButton();
    btnCheckOut.setAttribute("class", "submit");
    btnCheckOut.setAttribute("onclick", "bestellungSenden()");
    btnCheckOut.innerHTML = "Buchen";
    appendToMainframe(btnCheckOut);
}

function addRowToCustomerDataSheet(pTable, pName, pId) {
    var tr = newTr();

    var tdName = newTd();
    var label = newLabel();
    label.innerHTML = pName;
    tdName.appendChild(label);
    tr.appendChild(tdName);

    var tdInput = newTd();
    var input = newInput();
    input.setAttribute("id", pId);
    input.setAttribute("type", "text");
    tdInput.appendChild(input);
    tr.appendChild(tdInput);

    pTable.appendChild(tr);
}

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