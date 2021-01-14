import React from 'react';

const Buttons = ({name, playerHand, setPlayerHand, getNextCard, dealerPlays}) => {

    const btnHit = () => {
        if(name.localeCompare("HIT") === 0){
            setPlayerHand([...playerHand, getNextCard()]);
        }else if (name.localeCompare("STAND") === 0){
            dealerPlays();
        }
    }

    return (
        <div className="btn" onClick={btnHit}>
            <h3>{name}</h3>
        </div>
    );
};

export default Buttons;