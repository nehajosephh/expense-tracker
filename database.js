const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = '.database.db';

// Check if the database file exists
if (!fs.existsSync(path)) {
    const db = new sqlite3.Database(path);

    db.serialize(() => {
        // Create the transactions table
        db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            amount REAL,
            type TEXT,
            category TEXT,
            date TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Database file created and table setup.');
            }
        });
    });

    db.close();
} else {
    console.log('Database file already exists.');
}

module.exports = {
    createTransaction: (description, amount, type, category, date) => {
        const db = new sqlite3.Database(path);
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO transactions (description, amount, type, category, date) VALUES (?, ?, ?, ?, ?)`,
                [description, amount, type, category, date],
                function(err) {
                    db.close();
                    if (err) {
                        console.error('Error inserting transaction:', err.message);
                        return reject(err);
                    }
                    resolve({ id: this.lastID, description, amount, type, category, date });
                }
            );
        });
    },

    getTransactions: () => {
        const db = new sqlite3.Database(path);
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM transactions`, [], (err, rows) => {
                db.close();
                if (err) {
                    console.error('Error fetching transactions:', err.message);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },

    updateTransaction: (id, description, amount, type, category, date) => {
        const db = new sqlite3.Database(path);
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE transactions SET description = ?, amount = ?, type = ?, category = ?, date = ? WHERE id = ?`,
                [description, amount, type, category, date, id],
                function(err) {
                    db.close();
                    if (err) {
                        console.error('Error updating transaction:', err.message);
                        return reject(err);
                    }
                    resolve({ affectedRows: this.changes });
                }
            );
        });
    },

    deleteTransaction: (id) => {
        const db = new sqlite3.Database(path);
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
                db.close();
                if (err) {
                    console.error('Error deleting transaction:', err.message);
                    return reject(err);
                }
                resolve({ affectedRows: this.changes });
            });
        });
    },

    calculateBalance: () => {
        const db = new sqlite3.Database(path);
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT type, SUM(amount) as total FROM transactions GROUP BY type`,
                [],
                (err, rows) => {
                    db.close();
                    if (err) {
                        console.error('Error calculating balance:', err.message);
                        return reject(err);
                    }
                    const income = rows.find(row => row.type === 'income')?.total || 0;
                    const expenses = rows.find(row => row.type === 'expense')?.total || 0;
                    resolve({
                        income,
                        expenses,
                        balance: income - expenses
                    });
                }
            );
        });
    }
};
