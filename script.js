let board = document.querySelector(".board")
let FoodX;
let FoodY;
let snakeBody=[]
let snakeX=12;
let snakeY=5;
let velocityX=0;
let velocityY=0;
let gameover= false;
let setInterId;
let keys= document.querySelectorAll(".key")

let gameoversnd = new Audio("over2.mp3")
gameoversnd.preload = 'auto';

let turnsnd = new Audio("turn.mp3")
turnsnd.preload = 'auto';

let eatsnd = new Audio("eat.mp3")
eatsnd.preload = 'auto';



function randomFoodPosition(){
    FoodX = Math.floor(Math.random()*14)+1
    FoodY = Math.floor(Math.random()*14)+1
}

function moveSnake(e){
    if(e.key==="ArrowUp" && velocityY!=1){
      velocityX=0
      velocityY=-1
      turnsnd.play()
    }
    else if(e.key==="ArrowDown" && velocityY!=-1){
        velocityX=0
      velocityY=1
       turnsnd.play()
    }
     else if(e.key==="ArrowLeft" && velocityX!=1){
        velocityX=-1
      velocityY=0
      turnsnd.play()
    }
     else if(e.key ==="ArrowRight" && velocityX!=-1 ){
        velocityX= 1
      velocityY= 0
      turnsnd.play()
    }
    main()
}

keys.forEach((key)=>{
  key.addEventListener('click',()=>moveSnake({key:key.dataset.key}))
})

function showgameoveR(){
  clearInterval(setInterId)
  gameoversnd.play()
  document.removeEventListener("keydown",moveSnake)
  }



function main(){
if(gameover){
  return showgameoveR()
}

  if(snakeX === FoodX && snakeY === FoodY){
    eatsnd.play()
    randomFoodPosition()
    snakeBody.push([FoodX,FoodY])
    console.log(snakeBody)
  }

for(let i= snakeBody.length-1; i>0; i--){
  snakeBody[i]=snakeBody[i-1]
}
let setHtml= `<div class ="food" style="grid-area: ${FoodY}/${FoodX};"></div>`
snakeX+=velocityX;
snakeY+=velocityY;
snakeBody[0] = [snakeX,snakeY]   


for(let i=0; i<snakeBody.length; i++){
setHtml+= `<div class ="snake-head" id="div${i}" id2="div${snakeBody.length}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
}


if(snakeX<=0 || snakeX>14 || snakeY<=0 || snakeY>14){
  gameover = true
}
//}
board.innerHTML=setHtml
}
randomFoodPosition()
main()
setInterId =  setInterval(main,200)
document.addEventListener("keydown",moveSnake)

function reset(){
eatsnd.pause()
location.reload()
}

function lefte(){
  main()
  setInterId =  setInterval(main,200)
}