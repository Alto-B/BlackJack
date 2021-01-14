import React from 'react';
import Card from './Card';

const Board = ({playerHand, dealerHand}) => {

    return (
        <div className="game-board">
            <div className="hand">
                {dealerHand.map((card) => (
                    <Card key={card.id} value={card.value} suit={card.suit}/>
                ))}
            </div>

            <div className="hand">
                {playerHand.map((card) => (
                    <Card key={card.id} value={card.value} suit={card.suit}/>
                ))}
            </div>
        </div>
    );
};

export default Board;