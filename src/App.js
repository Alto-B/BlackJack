import './App.css';
import Button from './Componets/Buttons'; 
import Board from './Componets/Board';
import ReactDOM from 'react-dom';
import React, {useEffect, useState, useRef} from 'react';

function App() {

  const[deck, setDeck] = useState(initDeck);  
  const pos = useRef(0); 
  const[gameState, setGameState] = useState(true);
  const[result, setResult] = useState("");

  const[playerHand, setPlayerHand] = useState([]); 
  const[playerScore, setPlayerScore] = useState(0);

  const[dealerHand, setDealerHand] = useState([]); 
  const[dealerScore, setDealerScore] = useState(0);


  useEffect(() => {
    shuffle(deck);

    const initHand = () => {
      var newHand = []; 
    
      for (var i = 0; i < 2; i++){
          newHand.push(getNextCard()); 
      }
  
      return newHand;
    };

    setDealerHand(initHand);
    setPlayerHand(initHand);
  }, [deck]);

  useEffect(() => {
    //console.log("calc player hand");
    
    setPlayerScore(calcHandScore(playerHand));
    //console.log(playerScore);
    if(playerScore === 21){
      win();
    } 
    else if (playerScore > 21){
      bust(); 
    }
  }, [playerHand, playerScore]);

  useEffect(() => {
    console.log("calc dealer hand");
    setDealerScore(calcHandScore(dealerHand));
    console.log(dealerScore);

    if(dealerScore === 21){
      lose();
    } 
    else if (dealerScore > 21){
      win(); 
    }

  }, [dealerHand, dealerScore]);

  
const calcHandScore = (currentHand) => {
  //console.log(currentHand);

  let total = 0; 

  let aces = currentHand.filter((card) => {
    return card.value === 'A'; 
  });

  currentHand.forEach(card => {
    if(card.value!== 'A'){

      if(card.value >= 'J' || card.value >= 'Q' || card.value >= 'K'){
        total += 10; 
      }else{
        total += card.value;
      }
    }
  });

  for(let i = 0; i < aces.length; i++){
    if((total + 11) > 21){
      total += 1; 
    }else if((total + 11) === 21){
      if(aces.length > 1){
        total += 1; 
      }else {
        total += 11; 
      }
    }else {
      total += 11; 
    }
  }

  return total; 
};


const stand = () => {

 let currentDealerHand = dealerHand;
 let currentDealerScore = dealerScore;

 //console.log(currentDealerHand);

while(currentDealerScore < 17){
  currentDealerHand.push(getNextCard());
  console.log(currentDealerHand);

  currentDealerScore = calcHandScore(currentDealerHand);
  console.log(currentDealerScore);
}
console.log("dealer can't play no more cards");

setDealerHand(currentDealerHand);
setDealerScore(currentDealerScore);
checkWinner();
}


const getNextCard = () => {
  //console.log(deck[pos.current]);
  return deck[pos.current++];
};

const checkWinner = () => {
  console.log("checking winner");
  if(playerScore > dealerScore || dealerScore > 21){
    win();
  }else if( dealerScore > playerScore){
    lose();
  }else {
    tie();
  }
}

const win = () => {
  setResult("Winner");
}

const lose = () => {
  setResult("Loser");
}

const tie = () =>{
  setResult("Tie");
}

const bust = () => {
  setResult("Bust");
}

const resetGame = () => {
  setDeck(initDeck());
}


  return (
    <div className="App">
      <h1>Black Jack</h1>
      <h3>Result: {result}</h3>
      <Board playerHand={playerHand} dealerHand={dealerHand}/>
      <div className="button-options">
        <Button name="HIT" playerHand={playerHand} setPlayerHand={setPlayerHand} getNextCard={getNextCard}/>
        <Button name="STAND" playerHand={playerHand} dealerPlays={stand}/>
        <Button name="RESET" playerHand={playerHand} resetGame={resetGame}/>
      </div>
      </div> 
  );
}


const initDeck = () => {
  //console.log("Init random deck");
  var initdeck = []; 
  var i; 
  var ID = 0; 

  initdeck.push({value: 'A' , suit: 'H', id: ID += 1 });
  for(i = 2; i <= 10; i++){
      initdeck.push({value: i , suit: 'H', id: ID += 1 });
  }
  initdeck.push({value: 'J' , suit: 'H', id: ID += 1 });
  initdeck.push({value: 'Q' , suit: 'H', id: ID += 1 });
  initdeck.push({value: 'K' , suit: 'H', id: ID += 1 });
  

  initdeck.push({value: 'A' , suit: 'S', id: ID += 1 });
  for(i = 2; i <= 10; i++){
      initdeck.push({value: i , suit: 'S', id: ID += 1 });
  }
  initdeck.push({value: 'J' , suit: 'S', id: ID += 1 });
  initdeck.push({value: 'Q' , suit: 'S', id: ID += 1 });
  initdeck.push({value: 'K' , suit: 'S', id: ID += 1 });

  initdeck.push({value: 'A' , suit: 'C', id: ID += 1 });
  for(i = 2; i <= 10; i++){
      initdeck.push({value: i , suit: 'C', id: ID += 1 });
  }
  initdeck.push({value: 'J' , suit: 'C', id: ID += 1 });
  initdeck.push({value: 'Q' , suit: 'C', id: ID += 1 });
  initdeck.push({value: 'K' , suit: 'C', id: ID += 1 });

  initdeck.push({value: 'A' , suit: 'D', id: ID += 1 });
  for(i = 2; i <= 10; i++){
      initdeck.push({value: i , suit: 'D', id: ID += 1 });
  }
  initdeck.push({value: 'J' , suit: 'D', id: ID += 1 });
  initdeck.push({value: 'Q' , suit: 'D', id: ID += 1 });
  initdeck.push({value: 'K' , suit: 'D', id: ID += 1 });

  //console.log(initdeck);
  return initdeck;
};

const shuffle = (newDeck) => { 
    
  for (var i = 0; i < 4; i++){
      for (var j = 0; j < newDeck.length; j++){
          let newPos = Math.floor(Math.random() * 52);

          if(newPos < 0 || newPos > 51){
              console.log("something happened"); 
              break;
          }

          var temp = newDeck[i];
          newDeck[i] = newDeck[newPos];
          newDeck[newPos] = temp;  

      }
  }

}


export default App;
