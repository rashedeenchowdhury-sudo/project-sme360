import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [breakEven, setBreakEven] = useState({ fixedCosts: 0, unitsNeeded: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resProd = await axios.get('http://localhost:5000/api/products');
                const resBE = await axios.get('http://localhost:5000/api/finance/break-even');
                setProducts(resProd.data);
                setBreakEven(resBE.data);
            } catch (err) { console.error("Database connection failed", err); }
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: '40px', backgroundColor: '#1a1a2e', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
            <h1 style={{ textAlign: 'center', color: '#00d2ff', marginBottom: '40px' }}>SME360 COMMAND CENTER</h1>
            
            {/* FEATURE 15 & 22: Break-even & Decision Support */}
            <div style={{ background: '#16213e', padding: '30px', borderRadius: '15px', marginBottom: '30px', borderLeft: '8px solid #00d2ff', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <h2 style={{ marginTop: 0 }}>Feature 15 & 22: Financial DSS</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '1.2rem' }}>Total Fixed Costs: <strong>৳{breakEven.fixedCosts}</strong></p>
                        <p style={{ color: '#00d2ff', fontSize: '1.5rem' }}>Break-even Target: <strong>{breakEven.unitsNeeded} Units</strong></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ padding: '10px 20px', borderRadius: '20px', background: '#00d2ff', color: '#1a1a2e', fontWeight: 'bold' }}>DSS STATUS: ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* FEATURE 2: Inventory Tracking */}
            <div style={{ background: '#16213e', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <h2>Feature 2: Inventory Management</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ color: '#00d2ff', borderBottom: '2px solid #00d2ff', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Product Name</th>
                            <th style={{ padding: '15px' }}>Stock Quantity</th>
                            <th style={{ padding: '15px' }}>Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #2e3a59' }}>
                                <td style={{ padding: '15px' }}>{p.name}</td>
                                <td style={{ padding: '15px' }}>{p.stock_quantity} Units</td>
                                <td style={{ padding: '15px' }}>৳{p.selling_price}</td>
                            </tr>
                        )) : <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No Inventory Data Found in MySQL</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;