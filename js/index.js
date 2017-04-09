function alleWarenAnzeigen() {
    loadStart();
}

function wareZumWarenkorbHinzufuegen(pId) {
    addToCart(pId);
}

function warenkorbAnzeigen() {
    loadCart();
}

function wareAusWarenkorbEntfernen(pIndex) {
    deleteFromCart(pIndex);
}

function warenkorbVerwerfen() {
    clearCart();
    alleWarenAnzeigen();
}

function zuzatenZurWareHinzufuegenEntfernen(pSelect, pId) {
    showCheckboxes(pSelect, pId);
}

function warenkorbAuschecken() {
    loadBill();
}

function benutzerdatenAbfragen() {
    loadCustomerDataSheet();
}


function bestellungSenden() {
    book();
}
