console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ping.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let Gameover = false;

//function to change turn
const changeTurn = ()=>{
    return turn === "X"?"0":"X"
}
//function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText)&&(boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText+" WON"
            Gameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "800px"
            gameover.play()
        }
    })

}

//Game logic
music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{  // Corrected method name
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!Gameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for    " + turn;
            }
        }
    })
})

//ADD ON CLICK EVENTLISTENER TO RESET BUTTON
reset.addEventListener('click',(e)=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element=>{
        element.innerText = ""
        
    });
    turn = "X"
    Gameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for  "+ turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})



