function updateFlappy(player){
    fisic.rotation = Math.min((fisic.velocity / 10) * 90, 90)
    $(flappy).css({rotate: fisic.rotation, top:fisic.position})
}

function flappyDead(){
    $('.animated').css('animation-play-state', 'paused')
    $('.animated').css('-webkit-animation-play-state', 'paused')

    let flappyBottom = $('#flappy').position().top + $('#flappy').width()
    let floor = $('#fly-area-game').height()
    let moveY = Math.max(0-floor - flappyBottom)
    $('#flappy').transition({y:moveY + 'px', rotate: 90}, 1700, 'easeInOutCubic')

    currentState = state.ScoreScreen
    clearInterval(loopGame)
    clearInterval(loopPipe)
    loopGame = null
    loopPipe = null
    if(isIncompatible.any())
      {
         showScore();
      }
      else
      {
         soundHit.play().bindOnce("ended", function() {
            soundDie.play().bindOnce("ended", function() {
               showScore();
            });
         });
      }
}

function flappyScore(){
    score.s +=1
    soundScore.stop()
    soundScore.play()
    setBigScore();

}
function flappyJump(){
    fisic.velocity = fisic.jump
    soundJump.stop()
    soundJump.play()
}