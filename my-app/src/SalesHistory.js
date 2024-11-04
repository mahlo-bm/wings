import React from 'react';

const SalesHistory = ({ salesHistory }) => {
    return (
        <div>
            <h2>Sales History</h2>
            <ul>
                {salesHistory.map((sale, index) => (
                    <li key={index}>
                        {sale.timeSold}: {sale.quantitySold} of {sale.productName} sold for ${sale.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalesHistory;