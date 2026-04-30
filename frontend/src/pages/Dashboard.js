import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [breakEven, setBreakEven] = useState({ fixedCosts: 0, unitsNeeded: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Feature 2: Fetch Inventory
                const resProducts = await axios.get('http://localhost:5000/api/products');
                setProducts(resProducts.data);

                // Feature 15: Fetch Break-even Analysis
                const resBE = await axios.get('http://localhost:5000/api/finance/break-even');
                setBreakEven(resBE.data);
            } catch (err) {
                console.error("Data fetch failed", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Feature 15 Card */}
            <div className="card">
                <h3>Feature 15: Break-even Analysis</h3>
                <div style={{ padding: '10px' }}>
                    <p>Fixed Operating Costs: <strong>৳{breakEven.fixedCosts}</strong></p>
                    <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #00d2ff' }}>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Units to sell for zero loss:</span>
                        <h2 style={{ margin: '5px 0', color: '#1a1a2e' }}>{breakEven.unitsNeeded} Units</h2>
                    </div>
                </div>
            </div>

            {/* Feature 2 Table */}
            <div className="card">
                <h3>Product Inventory</h3>
                <table>
                    <thead>
                        <tr><th>Name</th><th>Stock</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.stock_quantity}</td>
                                <td>৳{p.selling_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;