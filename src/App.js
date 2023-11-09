import { useState, useEffect } from 'react';
import './App.css';
import img1 from './images/1.jpg'
import img2 from './images/2.jpg' 
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'
import vopros from './images/vopros.png'




const initialArrayCards = [
  {
    id:1, 
    img: img1
  }, {
    id:2, 
    img: img2
  }, {
    id:3, 
    img: img3
  }, {
    id:4, 
    img: img4
  }, {
    id:5, 
    img: img5
  }, {
    id: 6,
    img: img6
  }

]


const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]


export const App = () => {

const [arrayCards, setArayCards] = useState([])
const [openedCards, setOpenedCards] = useState([])
const [matched, setMadched] = useState([])
const [moves, setMoves] = useState(0)



const shuffle = (array) => {
  let currenrIndex = array.length,
      temporaryValue,
      randomIndex

      while (currenrIndex !== 0 ) {
        randomIndex = Math.floor(Math.random() * currenrIndex)
        currenrIndex -= 1

        temporaryValue = array[currenrIndex]
        array[currenrIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
        
      }

      return array
}


useEffect(() => {
  setArayCards(shuffle(pairOfArrayCards))
}, [])



const flipCard = (index) => {

  setOpenedCards(opened => [...opened, index])
  setMoves(prevMove => prevMove + 1) 

}

useEffect(() => {

  if (openedCards < 2) return
  const firstMatched = arrayCards[openedCards[0]]
  const secondMatched = arrayCards[openedCards[1]]

  if (secondMatched && firstMatched.id === secondMatched.id){
    setMadched([...matched, firstMatched.id])
  }

  if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000)

}, [openedCards])


const handleGameRestart = () => {

  setOpenedCards([])
  setMadched([])
  setMoves(0)
  setArayCards(shuffle(pairOfArrayCards))

}



  return (
    <div className="container">
      <p className='number-of-strokes'>Сделано ходов: {moves}</p>
      <div className='cards'>
        {arrayCards.map((item, index) => {
          let isFlipped = false;

          if (openedCards.includes(index)) isFlipped = true
          if (matched.includes(item.id)) isFlipped = true 

          return(
            <div key={index} className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => flipCard(index)}>
              <div className='inner'>
                <div className='front'>
                  <img src={item.img} width="150px" alt='front-card' />
                </div>
                <div className='back'>
                  <img src={vopros} width="200px" alt='question-mark'/>
                </div>
              </div>
            </div>
          )

        })}
      </div>

        <button className='button-restart' onClick={handleGameRestart}> Начать заново </button>

    </div>
  );
}


