//improve? watch end of vid for suggestions

const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')   
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')   
}


const reset = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playTo');
let winningScore = 3;
let gameOver = false;

function updateScore(player, opponent){

    if(!gameOver){
        player.score += 1;
        if(player.score === winningScore){
            gameOver = true;    
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        } 
        player.display.textContent = player.score;
    } 
}

p1.button.addEventListener('click', function(){
    updateScore(p1,p2);
})

p2.button.addEventListener('click', function(){
    updateScore(p2,p1);
})

reset.addEventListener('click', resetScore)

winningScoreSelect.addEventListener('change', function(){
    
    winningScore = parseInt(this.value);
    resetScore();

})

function resetScore(){
    
    gameOver = false;
    for(let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}



/* p1Button.addEventListener('click', function(){
    
    if(!gameOver){
        p1Score += 1;
        if(p1Score === winningScore){
            gameOver = true;    
            p1Display.classList.add('has-text-success');
            p2Display.classList.add('has-text-danger');
            p1Button.disabled = true;
            p2Button.disabled = true;
        } 
        p1Display.textContent = p1Score;
    } 

})

p2Button.addEventListener('click', function(){
    
    if(!gameOver){
        p2Score += 1;
        if(p2Score === winningScore){
            gameOver = true;    
            p1Display.classList.add('has-text-danger');
            p2Display.classList.add('has-text-success');
            p1Button.disabled = true;
            p2Button.disabled = true;
        } 
        p2Display.textContent = p2Score;
    } 
  
}) */



