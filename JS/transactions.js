document.addEventListener('DOMContentLoaded', function () {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionHistoryElement = document.getElementById('transactionHistory');

    if (transactions.length === 0) {
        transactionHistoryElement.innerHTML = '<p>No hay transacciones para mostrar.</p>';
        return;
    }

    let transactionsHtml = '';
    transactions.forEach((transaction, index) => {
        transactionsHtml += `
            <div class="transaction">
                <p><strong>Transacción #${index + 1}</strong></p>
                <p>Tipo: ${transaction.type}</p>
                <p>Cantidad: $${transaction.amount}</p>
                <p>Fecha: ${transaction.date}</p>
            </div>
        `;
    });

    transactionHistoryElement.innerHTML = transactionsHtml;
});