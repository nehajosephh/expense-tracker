const express = require('express');
const router = express.Router();
const db = require('../database');

// Middleware for input validation
const validateTransaction = (req, res, next) => {
    const { description, amount, type, category, date } = req.body;
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing description' });
    }
    if (isNaN(amount) || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing amount' });
    }
    if (!type || (type !== 'income' && type !== 'expense')) {
        return res.status(400).json({ message: 'Invalid or missing type' });
    }
    if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing category' });
    }
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Invalid or missing date' });
    }
    next();
};

// Create a transaction (POST)
router.post('/', validateTransaction, async (req, res) => {
    const { description, amount, type, category, date } = req.body;
    try {
        const result = await db.createTransaction(description, amount, type, category, date);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
});

// Read all transactions (GET)
router.get('/', async (req, res) => {
    try {
        const transactions = await db.getTransactions();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
});

// Update a transaction (PUT)
router.put('/:id', validateTransaction, async (req, res) => {
    const { id } = req.params;
    const { description, amount, type, category, date } = req.body;
    try {
        const result = await db.updateTransaction(id, description, amount, type, category, date);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating transaction:', error.message);
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
});

// Delete a transaction (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.deleteTransaction(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        console.error('Error deleting transaction:', error.message);
        res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
});

// Calculate balance (GET)
router.get('/balance', async (req, res) => {
    try {
        const balance = await db.calculateBalance();
        res.json(balance);
    } catch (error) {
        console.error('Error calculating balance:', error.message);
        res.status(500).json({ message: 'Error calculating balance', error: error.message });
    }
});

module.exports = router;
