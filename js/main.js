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
let fisic = {
    gravity: 0.25,
    velocity: 0,
    position: 180,
    rotation: 0,
    jump: -4.6
}
let loopGame, loopPipe
let currentState;

function showStartScreen() {
    currentState = state.StartScreen
    fisic.velocity = 0
    fisic.position = 180
    fisic.rotation = 0
    score.s = 0
    $('#flappy').css({ y: 0, x: 0 })
    updateFlappy($('#flappy'))
    soundSwoosh.stop()
    soundSwoosh.play()
    $('.pipe').remove()
    pipes.p = new Array()
    $(".animated").css('animation-play-state', 'running')
    $(".animated").css('-webkit-animation-play-state', 'running')
    $('#splash').transition({ opacity: 1 }, 2000, 'ease')
}

function startGame() {

    currentState = state.GameScreen
    $('#screen-start').stop()
    $('#screen-start').transition({ opacity: 0 }, 500, 'ease')
    setBigScore()
    if (debugmode)
        $('.boundingbox').show()

    let updateRate = 1000.0 / 60.0
    loopGame = setInterval(() => {
        let player = $('#flappy')
        fisic.velocity += fisic.gravity
        fisic.position += fisic.velocity
        updateFlappy(player)
        let box = document.getElementById('flappy').getBoundingClientRect()
        let origwidth = 34.0
        let origheight = 24.0
        let boxwidth = origwidth - (Math.sin(Math.abs(fisic.rotation) / 90) * 8)
        let boxheight = (origheight + box.height) / 2
        let boxleft = ((box.width - boxwidth) / 2) + box.left
        let boxtop = ((box.height - boxheight) / 2) + box.top
        let boxright = boxleft + boxwidth
        let boxbottom = boxtop + boxheight

        if (box.bottom >= $('#footer-game').offset().top) {
            flappyDead()
            return
        }
        let bricks = $("#bricks")
        if (boxtop <= (bricks.offset().top + bricks.height()))
            position = 0

        if (pipes.p[0] == null)
            return
        let nextpipe = pipes[0]
        let nextpipeupper = nextpipe.children(".pipe_upper")

        let pipetop = nextpipeupper.offset().top + nextpipeupper.height()
        let pipeleft = nextpipeupper.offset().left - 2 // Por algum motivo ele começa no deslocamento dos tubos internos , e não os tubos exteriores 
        let piperight = pipeleft + pipes.width
        let pipebottom = pipetop + pipes.height
        console.log('a')
        if (boxright > pipeleft) {
            if (!(boxtop > pipetop && boxbottom < pipebottom)) {
                flappyDead()
                return
            }
        }
        if (boxleft > piperight) {
            pipes.splice(0, 1)
            flappyScore()
        }
    }, updateRate)
    loopPipeloop = setInterval(updatePipes, 1400)
    flappyJump()
}

$(document).keydown(function (e) {
    if (e.keyCode == 32) {
        console.log('apertou')
        if (currentState == state.ScoreScreen)
            $("#replay").click()
        else
            screenClick()
    }
})
if ("ontouchstart" in window)
    $(document).on("touchstart", screenClick)
else
    $(document).on("mousedown", screenClick)

function screenClick() {
    console.log('apertou')
    if (currentState == state.GameScreen)
        flappyJump()
    else if (currentState == state.StartScreen)
        startGame()
}

function updatePipes(){

}







