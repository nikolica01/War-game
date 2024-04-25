const newDeck= document.getElementById("btn")
const newCard=document.getElementById("draw-card")
const container = document.getElementById("container")
const remaining= document.getElementById("remaining")
const computerScoreText=document.getElementById("computer-score")
const myScoreText=document.getElementById("my-score")
const headerText=document.getElementById("header")
let myScore=0
let computerScore=0
console.log(newCard)
let deckId
const handleclick=async ()=>{
   const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
       const data = await response.json()
        console.log(data)
        deckId = data.deck_id
        remaining.textContent=`Remaining: ${data.remaining}`

    
        
}
newDeck.addEventListener("click",handleclick)
const newCardClick= async ()=>{
const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
const data = await response.json()

    remaining.textContent=`Remaining: ${data.remaining}`
container.children[0].innerHTML=`<img src="${data.cards[0].image}" class="cards"></img>
`
container.children[2].innerHTML=`<img src="${data.cards[1].image}" class="cards"></image>`

const winnerText = determineCardWinner(data.cards[0], data.cards[1])
  headerText.textContent = winnerText
  if(data.remaining === 0){
    newCard.disabled = true
     if(computerScore > myScore){
      headerText.textContent=`Computer Winner!!`

    }
    else if(computerScore < myScore){
        headerText.textContent=`You are Winner!!`
    }
    else{
        headerText.textContent="Tie"
    }
  }


}

newCard.addEventListener("click", newCardClick)


const determineCardWinner=(card1,card2)=>{
    const valueOptions=["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1value = valueOptions.indexOf(card1.value)
    const card2value = valueOptions.indexOf(card2.value)
    if(card1value > card2value){
       computerScore++
       computerScoreText.textContent=`Computer Score: ${computerScore}`
       return 'Computer win!'
    }
    else if(card1value < card2value){
        myScore ++
       myScoreText.textContent=`My Score: ${myScore}`
       return 'You win!'
    }
    else{
       return 'Tie'
    }



}
