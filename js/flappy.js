function updateFlappy(player)
{
    fisic.rotation = Math.min((fisic.velocity / 10) * 90, 90)
    $(flappy).css({rotate: fisic.rotation, top:fisic.position})
    console.log(fisic)

}

function flappyDead(){

}
function flappyScore(){

}

function flappyJump(){
    fisic.velocity = fisic.jump
    soundJump.stop()
    soundJump.play()
}