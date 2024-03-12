document.addEventListener('DOMContentLoaded', function () {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        loadUserData(nombreUsuario); 
    }
    loadContacts(); 
});

function loadUserData(nombreUsuario) {
    const userData = JSON.parse(localStorage.getItem(nombreUsuario));
    if (userData) {
        document.getElementById('saldo').textContent = '$ ' + userData.balance;
    }
}

function addContact() {
    const contactName = document.getElementById('contactName').value;

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (!contacts.some(contact => contact.name === contactName)) {
        contacts.push({ name: contactName, balance: 0 });
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert(`Nuevo contacto añadido: ${contactName}`);
    } else {
        alert(`El contacto ya existe: ${contactName}`); 
    }

    loadContacts(); 
}

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactListElement = document.getElementById('contactList');
    const contactSelectElement = document.getElementById('contactSelect');

    contactListElement.innerHTML = '';
    contactSelectElement.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - Cantidad depositada: ${contact.balance}`;
        contactListElement.appendChild(li);

        const option = document.createElement('option');
        option.value = contact.name;
        option.textContent = contact.name;
        contactSelectElement.appendChild(option);
    });
}

function depositMoney() {
    const selectedContactName = document.getElementById('contactSelect').value;
    const transferAmount = parseFloat(document.getElementById('depositAmount').value);
    const nombreUsuario = localStorage.getItem('nombreUsuario');


    if (!nombreUsuario) {
        alert("Usuario no definido.");
        return;
    }

    let userData = JSON.parse(localStorage.getItem(nombreUsuario)) || { balance: 0 };
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactIndex = contacts.findIndex(contact => contact.name === selectedContactName);


    saveTransaction(`Transferencia a ${selectedContactName}`, transferAmount);

    if (contactIndex !== -1 && transferAmount > 0) {
        if (userData.balance >= transferAmount) {
            contacts[contactIndex].balance += transferAmount;
            userData.balance -= transferAmount; 

            localStorage.setItem(nombreUsuario, JSON.stringify(userData));
            localStorage.setItem('contacts', JSON.stringify(contacts));

            loadUserData(nombreUsuario);
            loadContacts(); 

            alert(`Transferencia realizada con éxito.\nNuevo saldo: $${userData.balance}`);
        } else {
            alert("Saldo insuficiente.");
        }
    } else {
        alert("Por favor, selecciona un contacto y una cantidad válida para transferir.");
    }

//Guardar transiciones en transactions.html 
}
function saveTransaction(type, amount) {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    var transaction = {
        id: Date.now(),
        type: type,
        amount: amount,
        date: new Date().toLocaleString()
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}