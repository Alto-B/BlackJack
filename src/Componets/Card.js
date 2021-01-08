import React from 'react';

const Card = ({value, suit}) => {
    return (
        <div className="Card">
            <h2>{value}</h2>
            <h2>{suit}</h2>
        </div>
    );
};

export default Card;