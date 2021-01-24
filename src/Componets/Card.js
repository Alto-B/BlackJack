import React from 'react';

const Card = ({value, suit}) => {

    const cardSuit = () => {
        switch(suit){
            case 'H':
                return "card card--heart";
            case 'D':
                return "card card--diamond";
            case 'S':
                return "card card--spades"; 
            case 'C':
                return "card card--clubs"; 
            default:
                return "card ";
        }
    }

    return (
        <div className={cardSuit()} >
            <h1>{value}</h1>
        </div>
    );
};

export default Card;