const express = require('express');
const router = express.Router();
const breakEvenController = require('../controllers/breakEvenController');

router.post('/', breakEvenController.calculateBreakEven);

module.exports = router;

// GET /api/finance/break-even
router.get('/break-even', async (req, res) => {
    try {
        // 1. Get total Fixed Costs (e.g., Feature 7: Rent, Utilities)
        const [expenses] = await db.query("SELECT SUM(amount) as totalFixed FROM expenses WHERE category != 'Inventory'");
        const fixedCosts = expenses[0].totalFixed || 0;

        // 2. Get average Margin (Selling Price - Cost Price)
        const [products] = await db.query("SELECT AVG(selling_price - cost_price) as avgMargin FROM products");
        const marginPerUnit = products[0].avgMargin || 1; 

        // 3. Break-even formula: Fixed Costs / Margin Per Unit
        const breakEvenUnits = Math.ceil(fixedCosts / marginPerUnit);

        res.json({
            fixedCosts: fixedCosts,
            unitsNeeded: breakEvenUnits,
            status: "Analysis Complete"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});