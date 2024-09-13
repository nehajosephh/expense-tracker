document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transactionForm');
    const transactionsTable = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    const balanceDiv = document.getElementById('balance');
    const messageContainer = document.getElementById('messageContainer');

    // Display message
    const displayMessage = (message, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageContainer.innerHTML = ''; // Clear previous messages
        messageContainer.appendChild(messageDiv);
    };

    // Fetch and display transactions
    const fetchTransactions = async () => {
        try {
            const response = await fetch('/transactions');
            const transactions = await response.json();
            transactionsTable.innerHTML = ''; // Clear previous content
            transactions.forEach(transaction => {
                const row = transactionsTable.insertRow();
                row.insertCell().textContent = transaction.description;
                row.insertCell().textContent = transaction.amount;
                row.insertCell().textContent = transaction.type;
                row.insertCell().textContent = transaction.category;
                row.insertCell().textContent = transaction.date;
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
            balanceDiv.textContent = `Income: ${balance.income} | Expenses: ${balance.expenses} | Balance: ${balance.balance}`;
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = {
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value
        };

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                displayMessage('Transaction added successfully!', 'success');
                fetchTransactions();
                fetchBalance();
                form.reset();
            } else {
                const error = await response.json();
                displayMessage(error.message || 'Error adding transaction', 'error');
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            displayMessage('Error adding transaction', 'error');
        }
    });

    // Initial load
    fetchTransactions();
    fetchBalance();
});
