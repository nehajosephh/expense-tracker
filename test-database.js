const db = require('../models/database');

// Test creating a transaction
db.createTransaction('Lunch', 15.5, 'expense', 'Food', '2024-09-12')
    .then(result => {
        console.log('Transaction created:', result);
        
        // Test getting transactions
        return db.getTransactions();
    })
    .then(transactions => {
        console.log('Transactions:', transactions);
        
        // Test calculating balance
        return db.calculateBalance();
    })
    .then(balance => {
        console.log('Balance:', balance);
        
        // Test updating a transaction (replace with actual ID from the result above)
        const transactionId = 1; // Use an ID from the previous results
        return db.updateTransaction(transactionId, 'Lunch', 20.0, 'expense', 'Food', '2024-09-12');
    })
    .then(updateResult => {
        console.log('Transaction updated:', updateResult);
        
        // Test deleting a transaction (replace with actual ID from the result above)
        const transactionId = 1; // Use an ID from the previous results
        return db.deleteTransaction(transactionId);
    })
    .then(deleteResult => {
        console.log('Transaction deleted:', deleteResult);
    })
    .catch(err => {
        console.error('Error:', err);
    });
