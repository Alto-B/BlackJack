import React from 'react';

const Buttons = ({name, playerHand, setPlayerHand, getNextCard, dealerPlays, resetGame, clickable}) => {

    const btnHit = () => {
        if(name.localeCompare("HIT") === 0){
            setPlayerHand([...playerHand, getNextCard()]);
        }else if (name.localeCompare("STAND") === 0){
            dealerPlays();
        }else if (name.localeCompare("RESET") === 0){
            resetGame();
        }
    }

    return (
        <div className="btn--holder">
            <button className="btn" onClick={btnHit} disabled={clickable}>{name}</button>
        </div>
    );
};

export default Buttons;