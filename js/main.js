let debugmode = false

let state = Object.freeze(
    {
        StartScreen: 0,
        GameScreen: 1,
        ScoreScreen: 2
    }
)
let pipes = {
    height: 90,
    width: 52,
    p: new Array()
}
$(document).ready(() => {
    
    if (window.location.search === '?debug')
        debugmode = true
    if (window.location.search === '?easy')
        pipes.height = 200

    let savedScore = getCookie('hightScore')
    if (savedScore != '')
        score.hs = parseInt(savedScore)

    showStartScreen()
})
let loopGame, loopPipe
let currentState;
function showStartScreen(){
    currentState = state.StartScreen
    fisic.velocity = 0
    fisic.position = 180
    fisic.rotation = 0
    score.s = 0
    
    $('#flappy').css({y:0, x:0})
    updateFlappy($('#flappy'))
    soundSwoosh.stop()
    soundSwoosh.play()
    $('.pipe').remove()
    



}



let fisic = {
    gravity: 0.25,
    velocity: 0,
    position: 180,
    rotation: 0,
    jump: -4.6
}





