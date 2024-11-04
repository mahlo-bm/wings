import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);

        const storedSoldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];
        setSoldProducts(storedSoldProducts);

        
        const revenue = storedSoldProducts.reduce((acc, product) => acc + product.price, 0);
        setTotalRevenue(revenue);
    }, []);

    return (
        <div>
            <h1>Welcome to the Inventory Dashboard!</h1>
            <h3>Available Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3>Sold Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldProducts.length > 0 ? (
                        soldProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No sold products.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3>Total Revenue: ${totalRevenue.toFixed(2)}</h3>
        </div>
    );
};

export default Dashboard;