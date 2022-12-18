import React from 'react';
import './App.css';
import Swal from 'sweetalert2'
import { useState } from 'react'

function App() {
  function cardDeck(): string[] {
    const deckCard: string[] = [];
    const elementCards = ['Club', 'Diamond', 'Heart', 'Spade'];
    const valueCards = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    for (let i = 0; i < elementCards.length; i++) {
      for (let j = 0; j < valueCards.length; j++) {
        deckCard.push(`${elementCards[i]}-${valueCards[j]}`);
      }
    }
    return deckCard;
  }

  function getPoint(cardDeck:string) {
    let value = cardDeck.split('-')[1]
    if (value === 'Ace') { return 1 }
    else if (value === 'King' || value === 'Queen' || value === 'Jack' || value === '10') { return 0 }
    else { return parseInt(value) }
}

function score(drawCards: string[]) {
    if (!(Array.isArray(drawCards) && drawCards.length === 4)) { return null}
    // first two for player
    let playerPoint = getPoint(drawCards[0]) + getPoint(drawCards[1])
    // another two for dealer card
    let dealerPoint = getPoint(drawCards[2]) + getPoint(drawCards[3])

    //score
    if (playerPoint > dealerPoint) {
        return 'win'
    } else if (playerPoint === dealerPoint) {
        return 'tie'
    }
    return 'lose'
}

function shuffleCard(array:string[]) {
  for (let i = array.length - 1; i > 0; i--) {
      // Generate random number  
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array;
}

 const [card1,setCard1] = useState<string>('Card 1')
 const [card2,setCard2] = useState<string>('Card 2')
 const [card3,setCard3] = useState<string>('Card 1')
 const [card4,setCard4] = useState<string>('Card 2')

let deck:string[] = [];
const startGame = () => {
    // shuffle
    if (deck.length < 4) { deck = cardDeck() }
    deck = shuffleCard(deck)
    // draw card
    let drawCards = deck.slice(0, 4)
    console.log(drawCards)
   deck = drawCards
    setCard1(deck[0])
    setCard2(deck[1])
    setCard3(deck[2])
    setCard4(deck[3])
    console.log(`Dealer : ${drawCards[0]}, ${drawCards[1]}`)
    console.log(`Your : ${drawCards[2]}, ${drawCards[3]}`)
    // scoring 

    let result = score(drawCards)
    console.log('result',result)

    if (result === 'win') {
      Swal.fire(`You Win !`);
    } else if (result === 'tie') {
      Swal.fire(`Tie !`);
    } else if (result === 'lose') {
      Swal.fire(`You Lose !`);
    }
}
    


  return (
    <div className="App">
      <header className="App-header">
       <p>POK-DENG !</p> 

      <div className='playground'>

        {/* dealer  */}
        <div className='block-player'>
        Dealer
          <div className='player-container'>
          
            {/* card 1 */}
              <div className='cards' >
                <p id='d-card1'>{card1}</p>
              </div>
            {/* card 2 */}
              <div className='cards' >
                <p id='d-card2'>{card2}</p>
              </div>
          </div>
        </div>

        

        {/* player  */}
          <div className='block-player'>
          Player
          <div className='player-container'>
          {/* player */}
          
            {/* card 1 */}
              <div className='cards'>
                <p id='p-card1'>{card3}</p>
              </div>
            {/* card 2 */}
              <div className='cards'>
                <p id='p-card2'>{card4}</p>
              </div>

            </div>
          </div>


      </div>
      
      <button
          type="button"
          className="App-button"
          onClick={startGame}>
          Start
        </button>
      </header>
    </div>
  );
}

export default App;
