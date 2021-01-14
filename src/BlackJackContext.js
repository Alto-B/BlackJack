import {useState, useContext, useRef, createContext} from 'react';


const DeckContext = createContext();
const PlayerHandContext = createContext(); 
const DealerHandContext = createContext(); 
const GetPosContext = createContext();


export const useGetPosContext = () =>{
    return useContext(GetPosContext);
}

export const usePlayerHandContext = () =>{
    return useContext(PlayerHandContext);
}

export const useDealerHandContext = () =>{
    return useContext(DealerHandContext);
}

export const useDeckContext = () =>{
    return useContext(DeckContext);
}

export const BlackJackProvider = (props) => {


    const[deck, setDeck] = useState([]);  
    const[playerHand, setPlayerHand] = useState([]); 
    const[dealerHand, setDealerHand] = useState([]); 
    const[pos, setPos] = useState(0); 

    const posRef = useRef(0); 
    posRef.current = pos; 


    return (
        <DeckContext.Provider value={[deck, setDeck]}>
            <PlayerHandContext.Provider value={[playerHand, setPlayerHand]}> 
                <DealerHandContext.Provider value={[dealerHand,setDealerHand]}> 
                    <GetPosContext.Provider value={[pos, setPos]}>
                        {props.children}
                    </GetPosContext.Provider>
                </DealerHandContext.Provider>
            </PlayerHandContext.Provider>
        </DeckContext.Provider>
    );
};





