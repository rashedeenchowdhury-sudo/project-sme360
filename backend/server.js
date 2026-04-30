const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DIRECT XAMPP CONNECTION
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default is empty. If you set one, put it here.
    database: 'sme_db' // YOUR DATABASE NAME
});

// Feature 2: Get Inventory
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Feature 15 & 22: Finance Logic
app.get('/api/finance/break-even', async (req, res) => {
    try {
        const [expenses] = await db.query("SELECT SUM(amount) as totalFixed FROM expenses");
        const [products] = await db.query("SELECT AVG(selling_price - cost_price) as avgMargin FROM products");
        const fixedCosts = parseFloat(expenses[0].totalFixed) || 0;
        const margin = parseFloat(products[0].avgMargin) || 1;
        const unitsNeeded = Math.ceil(fixedCosts / margin);
        res.json({ fixedCosts, unitsNeeded });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(5000, () => console.log(`🚀 Server on 5000 | DB: sme_db`));