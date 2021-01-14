import './App.css';
import Button from './Componets/Buttons'; 
import Board from './Componets/Board';
import React, {useEffect, useState, useRef} from 'react';

function App() {

  const[deck, setDeck] = useState(initDeck);  
  const pos = useRef(0); 
  const[gameState, setGameState] = useState(true);

  const[playerHand, setPlayerHand] = useState([]); 
  const[playerScore, setPlayerScore] = useState(0);

  const[dealerHand, setDealerHand] = useState([]); 
  const[dealerScore, setDealerScore] = useState(0);

  useEffect(() => {
    shuffle(deck);
    setDealerHand(initHand);
    setPlayerHand(initHand);
  }, []);

  useEffect(() => {
    //console.log("something happened to player hand");
    calcHandScore(playerHand, setPlayerScore);

    if(playerScore === 21)win(); 
    else if (playerScore > 21) bust(); 

  }, [playerHand]);

  useEffect(() => {
    calcHandScore(dealerHand, setDealerScore);
  }, [dealerHand]);
  
  // console.log(deck);
  // console.log(dealerHand);
  // console.log(playerHand);

  const initHand = () => {
    //console.log("initHand");
    var newHand = []; 
  
    for (var i = 0; i < 2; i++){
        newHand.push(getNextCard()); 
    }
    console.log(newHand);
    return newHand;
  };
  
  const getNextCard = () => {
    //console.log("pushed");
    // var temp = deck[pos]; 
    // console.log(temp);
    // console.log(pos);
    console.log(deck[pos.current]);
    return deck[pos.current++];
  };

  
const calcHandScore = (currentHand, setScore) => {
  console.log(currentHand);

  let total = 0; 

  let aces = currentHand.filter((card) => {
    return card.value === 1; 
  });

  // console.log(aces);

  currentHand.forEach(card => {
    if(card.value!== 1){

      if(card.value >= 11){
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

  // console.log(total);

  setScore(total);
};

const dealerPlays = () => {

  while(true){
    if(dealerScore >= 17) break;
    setDealerHand([...dealerHand, getNextCard()])
  }

  checkWinner();
}

const checkWinner = () => {

}

const win = () => {

}

const bust = () => {

}


  return (
    <div className="App">
      <h1>Black Jack</h1>
      <h1>Score {playerScore}</h1>
      <Board playerHand={playerHand} dealerHand={dealerHand}/>
      <div className="Moves">
        <Button name="HIT" playerHand={playerHand} setPlayerHand={setPlayerHand} getNextCard={getNextCard}/>
        <Button name="STAND" playerHand={playerHand} dealerPlays={dealerPlays}/>
        <Button name="RESET" playerHand={playerHand} />
      </div>
      </div> 
  );
}


const initDeck = () => {
  //console.log("Init random deck");
  var initdeck = []; 
  var i; 
  var ID = 0; 

  for(i = 1; i <= 13; i++){
      initdeck.push({value: i , suit: 'H', id: ID += 1 });
  }

  for(i = 1; i <= 13; i++){
      initdeck.push({value: i , suit: 'S', id: ID += 1 });
  }

  for(i = 1; i <= 13; i++){
      initdeck.push({value: i , suit: 'C', id: ID += 1 });
  }

  for(i = 1; i <= 13; i++){
      initdeck.push({value: i , suit: 'D', id: ID += 1 });
  }

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
