import React, {useState, useEffect, useContext, createContext} from 'react';

export const BlackJackContext = createContext();

const PlayerHandContext = createContext(); 
const DealerHandContext = createContext(); 

export const usePlayerHandContext = () =>{
    return useContext(PlayerHandContext);
}

export const useDealerHandContext = () =>{
    return useContext(DealerHandContext);
}

export const BlackJackProvider = (props) => {


    const[deck, setDeck] = useState(initDeck);  
    const[playerHand, setPlayerHand] = useState([]); 
    const[dealerHand, setDealerHand] = useState([]); 

    var pos = 0; 

    const initGame = () => {
        shuffle();
        setDealerHand(initHand());
        setPlayerHand(initHand());
    }

    useEffect(() => {
        initGame(); 
    }, []);

    console.log(deck);
    console.log(dealerHand);
    console.log(playerHand); 

    const initHand = () => {
        var newHand = []; 
    
        for (var i = 0; i < 2; i++){
            newHand.push(getNextCard()); 
        }
        //console.log(newHand);
        return newHand;
    }

    const getNextCard = () => {
        console.log(deck[pos]);
        return deck[pos++];
    }

    const shuffle = () => { 
        
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < deck.length; j++){
                let newPos = Math.floor(Math.random() * 52);
    
                if(newPos < 0 || newPos > 51){
                    console.log("something happened"); 
                    break;
                }
    
                var temp = deck[i];
                deck[i] = deck[newPos];
                deck[newPos] = temp;  
    
            }
        }

    }


    return (
        <BlackJackContext.Provider value={[deck, setDeck]}>
            <PlayerHandContext.Provider value={[playerHand, setPlayerHand]}> 
                <DealerHandContext.Provider value={[dealerHand,setDealerHand]}> 
                    {props.children}
                </DealerHandContext.Provider>
            </PlayerHandContext.Provider>
        </BlackJackContext.Provider>
    );
};


const initDeck = () => {
    var deck = []; 
    var i; 

    for(i = 1; i <= 13; i++){
        deck.push({value: i , suit: 'H'});
    }

    for(i = 1; i <= 13; i++){
        deck.push({value: i , suit: 'S'});
    }

    for(i = 1; i <= 13; i++){
        deck.push({value: i , suit: 'C'});
    }

    for(i = 1; i <= 13; i++){
        deck.push({value: i , suit: 'D'});
    }

    return deck; 
};



