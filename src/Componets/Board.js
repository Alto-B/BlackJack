import React, {useContext} from 'react';
import Card from './Card';
import {usePlayerHandContext, useDealerHandContext} from '../BlackJackContext';

const Board = () => {

    const [playerHand, setPlayerHand] = usePlayerHandContext(); 
    const [dealerHand, setDealerHand] = useDealerHandContext();
    
    return (
        <div className="game-board">
            <div className="dealer-hand">
                {dealerHand.map((card) => (
                    <Card value={card.value} suit={card.suit}/>
                ))}
            </div>

            <div className="player-hand">

            </div>
        </div>
    );
};

export default Board;