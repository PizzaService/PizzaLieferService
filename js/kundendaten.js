// setzen des Titels für die Danksagungsseite
function setCustomerDataSheetTitle() {
    var headingContainer = getElement("heading-container");
    headingContainer.innerHTML = "";

    var title = newH1();
    title.innerHTML = "Buchungsdaten";
    headingContainer.appendChild(title);
}
// hier wird das Form erstellt, in das der Kunde seine Daten eintragen kann, bzw. sollte
// man kann die Daten bestätigen(button), oder zurück gehen
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
// lädt beschreibung und eingabefeld in die Tabelle. zeilenweise
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
// wird aufgerufen, wenn man seine Daten im Form bestätiogt hat(über button)
// holt sich die userData und schreibt diese in ein Array, welches in der post-Funktion anwendung findet
// Felder des Forms müssen befüllt sein. Wird hier überprüft
function book() {
    var name = getElement("customerFormName").value;
    var firstName = getElement("customerFormFirstName").value;
    var street = getElement("customerFormStreet").value;
    var plz = getElement("customerFormPlz").value;
    var location = getElement("customerFormLocation").value;
    var email = getElement("customerFormEMail").value;
    var phoneNumber = getElement("customerFormCellPhone").value;

    var form = [name, firstName, street, plz, location, email, phoneNumber];
    
    if (name && firstName && street && plz && location && email && phoneNumber) {
        clearCartCount();
        loadThxForm();
        window.setTimeout(post, 5000);
        post(form);
    } else {
        var incorrectInputText = newP();
        incorrectInputText.setAttribute("class", "incorrectInputText");
        incorrectInputText.innerHTML = "Es m&uuml;ssen alle Felder ausgef&uuml;llt werden um fortzufahren!";
        getElement("customerDataSheet").appendChild(incorrectInputText);
    }
}
// erstellen eines Forms & anschließendes Befüllen. Wird anschlißend über die POST-Methpode an den Server weitergeleitet.
// beinhaltet die Daten des Kunden und seine Bestellung
function post(userData) {
function post(userData) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");

    var fieldNames = ["Nachname", "Vorname", "Strasse", "Postleitzahl", "Ort", "Email", "Handynummer"];


    for (var i = 0; i < 7; i++) {
        var field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", fieldNames[i]);
        field.setAttribute("value", userData[i]);
        form.appendChild(field);
    }
    var jo = document.createElement("input");
    jo.setAttribute("name", "ArtNr");
    jo.setAttribute("value", cart[0].pArtNr);
    form.appendChild(jo);

    cart = [];
    document.body.appendChild(form);
    form.submit();
}
