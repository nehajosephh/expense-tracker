document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transactionForm');
    const transactionsTable = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    const balanceDiv = document.getElementById('balance');

    // Fetch and display transactions
    const fetchTransactions = async () => {
        try {
            const response = await fetch('/transactions');
            const transactions = await response.json();
            transactionsTable.innerHTML = '';
            transactions.forEach(transaction => {
                const row = transactionsTable.insertRow();
                row.insertCell(0).textContent = transaction.description;
                row.insertCell(1).textContent = transaction.amount;
                row.insertCell(2).textContent = transaction.type;
                row.insertCell(3).textContent = transaction.category;
                row.insertCell(4).textContent = transaction.date;
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // Fetch and display balance
    const fetchBalance = async () => {
        try {
            const response = await fetch('/transactions/balance');
            const balance = await response.json();
            balanceDiv.textContent = `Income: $${balance.income.toFixed(2)}, Expenses: $${balance.expenses.toFixed(2)}, Balance: $${balance.balance.toFixed(2)}`;
        } catch (error) {
            console.error('Error calculating balance:', error);
            balanceDiv.textContent = 'Error calculating balance';
        }
    };

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description, amount, type, category, date })
            });
            if (response.ok) {
                await fetchTransactions();
                await fetchBalance();
                form.reset();
            } else {
                console.error('Error adding transaction:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });

    // Initial fetch
    fetchTransactions();
    fetchBalance();
});
