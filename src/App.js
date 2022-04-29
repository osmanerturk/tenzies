import React from "react";
import "./style.css";
import Die from "./Die";
import {nanoid} from "nanoid"

function App() {

  const [dice ,setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  function generate () {
    return{
    value: Math.floor(Math.random()*7), 
    isHeld: false,
    id:nanoid()
    }
    
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

function newGame(){
  setTenzies(false)
  setDice(allNewDice())
}

  function allNewDice(){
    const newArray =[]
    for(let i =0 ; i<=9 ;i++) {
      newArray.push(generate())
    }
    return newArray
  }

  function rolBut () {
    setDice(dice.map(die => die.isHeld ? die : generate() ))
  }

  function holdDice(id){
      setDice(dice.map(die=> die.id===id ? {...die, isHeld : !die.isHeld} : die))
  }


  const diceElements =
    dice.map(num => <Die value={num.value} id={num.id} isHeld={num.isHeld} holdDice={()=>holdDice(num.id)} />)
  
  return <main>
  <h1 className="title">Tenzies</h1>
  <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
  <div className="dice-container">
      {diceElements}
  </div>
  <button 
      className="roll-dice" 
      onClick={!tenzies ? rolBut : newGame}
  >
      {tenzies ? "New Game" : "Roll"}
  </button>
</main>
}

export default App;
