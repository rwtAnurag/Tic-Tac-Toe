const statusDisplay=document.querySelector(".game--status");

let gameActive=true;
let p=0;
let currentPlayer="X";
let gameState=["","","","","","","","",""];

const winningConditions=[
    [0,1.2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const winningMessage=()=>`Player ${currentPlayer} has won!`;
const drawMessage=()=>`Game ended in a draw`;
const currentPlayerTurn=()=>`It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();


function handleCellPlayed(clickedCell,clickedCellIndex)
{
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
    
}


function handlePlayerChange()
{
    currentPlayer=currentPlayer==="X"?"0":"X";
    statusDisplay.innerHTML=currentPlayerTurn();
}


function handleResultValidation(){
   let roundWon=false;
   for(let i=0;i<winningConditions.length;i++)
   {
       const Condition =winningConditions[i];
       let a=gameState[Condition[0]];
       let b=gameState[Condition[1]];
       let c=gameState[Condition[2]];
       if(a==="" || b==="" || c==="")
       {
           continue;
       }
       if(a===b && b===c)
          {
              roundWon=true;
              
              break;
          }
   } 
   if(roundWon)
   {
    gameActive=false;
    statusDisplay.innerHTML=winningMessage();
    return;
   } 
   let roundDraw=!gameState.includes("");
   if(roundDraw)
   {
       statusDisplay.innerHTML=drawMessage();
       gameActive=false;
       return;
   }
   handlePlayerChange();
}


function handleCellClick(clickedCellEvent)
{
    const clickedCell=clickedCellEvent.target;
    const clickedCellIndex= parseInt(
       clickedCell.getAttribute("data-cell-index")
    );
    if(gameState[clickedCellIndex]!=="" || !gameActive)
    {
        console.log(++p);
        return ;
    }
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
    //console.log(++p);
}
function handleRestartGame(){
    gameActive=true;
    currentPlayer="X";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=> (cell.innerHTML=""));

}
document.querySelectorAll(".cell")
.forEach((cell)=>cell.addEventListener("click",handleCellClick));
document 
 .querySelector(".game--restart")
 .addEventListener("click",handleRestartGame);
