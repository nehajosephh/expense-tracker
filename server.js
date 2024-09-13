const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// In-memory transactions storage
let transactions = [];

// Routes
app.get('/transactions', (req, res) => {
    res.json(transactions);
});

app.post('/transactions', (req, res) => {
    const transaction = req.body;
    transactions.push(transaction);
    res.status(201).json(transaction);
});

app.get('/transactions/balance', (req, res) => {
    const balance = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc.income += transaction.amount;
        } else if (transaction.type === 'expense') {
            acc.expenses += transaction.amount;
        }
        acc.balance = acc.income - acc.expenses;
        return acc;
    }, { income: 0, expenses: 0, balance: 0 });

    res.json(balance);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
