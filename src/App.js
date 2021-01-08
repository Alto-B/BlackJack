import './App.css';
import Button from './Componets/Buttons'; 
import Board from './Componets/Board';
import {BlackJackProvider} from './BlackJackContext';
import React from 'react';

function App() {

  return (
    <BlackJackProvider>
      <div className="App">
        <Board/>
        <div className="Moves">
        <Button name="HIT"/>
        <Button name="STAND"/>
        <Button name="RESET"/>
        </div>
      </div>
    </BlackJackProvider>
  );
}

export default App;
