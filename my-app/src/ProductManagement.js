import React, { useEffect, useState } from 'react';

const ProductManagement = ({ handleNewSale }) => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [quantityToSell, setQuantityToSell] = useState(''); 
    const [sellingIndex, setSellingIndex] = useState(null); 

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            name: productName,
            price: parseFloat(productPrice),
            description: productDescription,
            quantity: parseInt(productQuantity),
        };

        if (editingIndex !== null) {
            const updatedProducts = products.map((product, index) => 
                index === editingIndex ? newProduct : product
            );
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            setEditingIndex(null);
        } else {
            setProducts(prev => {
                const updatedProducts = [...prev, newProduct];
                localStorage.setItem('products', JSON.stringify(updatedProducts));
                return updatedProducts;
            });
        }

        
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductQuantity('');
    };

    const handleEditProduct = (index) => {
        const product = products[index];
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductQuantity(product.quantity);
        setEditingIndex(index);
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleSellProduct = (index) => {
        setSellingIndex(index); 
        setQuantityToSell(''); 
    };

    const confirmSellProduct = () => {
        const product = products[sellingIndex];
        const quantity = parseInt(quantityToSell);

        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        if (quantity > product.quantity) {
            alert('Not enough stock available!');
            return;
        }

        product.quantity -= quantity; 
        handleNewSale(product); 

        
        const soldProduct = { name: product.name, price: product.price * quantity };
        const storedSoldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];
        localStorage.setItem('soldProducts', JSON.stringify([...storedSoldProducts, soldProduct]));

        const updatedProducts = [...products];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        setSellingIndex(null); 
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={handleAddProduct}>
                <input 
                    type="text" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                    placeholder="Product Name" 
                    required 
                />
                <input 
                    type="number" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    placeholder="Product Price" 
                    required 
                />
                <input 
                    type="text" 
                    value={productDescription} 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    placeholder="Product Description" 
                    required 
                />
                <input 
                    type="number" 
                    value={productQuantity} 
                    onChange={(e) => setProductQuantity(e.target.value)} 
                    placeholder="Product Quantity" 
                    required 
                />
                <button type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
            </form>
            <h3>Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleEditProduct(index)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                                <button onClick={() => handleSellProduct(index)}>Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional rendering for quantity input when selling a product */}
            {sellingIndex !== null && (
                <div>
                    <h4>Enter Quantity to Sell:</h4>
                    <input 
                        type="number" 
                        value={quantityToSell} 
                        onChange={(e) => setQuantityToSell(e.target.value)} 
                        placeholder="Quantity" 
                        required 
                    />
                    <button onClick={confirmSellProduct}>Confirm Sale</button>
                    <button onClick={() => setSellingIndex(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;