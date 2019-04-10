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

    let savedScore = getCookie('highscore') 
    if (savedScore != ' ')
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
    $('#screen-start').transition({ opacity: 1 }, 2000, 'ease')
}

 $(document).ready(function() {
    $("#restart").click(function () {
        console.log('asssssssssas')
        if(!replayclickable)
           return
        else
           replayclickable = false
        soundSwoosh.stop()
        soundSwoosh.play()
        $("#score-board").transition({ y: '-40px', opacity: 0}, 1000, 'ease', function() {
           $("#score-board").css("display", "none")
           showStartScreen()
        })
    });
  });
  
function startGame() {

    currentState = state.GameScreen
    $('#screen-start').stop()
    $('#screen-start').transition({ opacity: 0 }, 500, 'ease')
    setBigScore()
    
    if (debugmode)
        $('.boundingbox').show()

    let updateRate = 1000.0 / 60.0
    loopGame = setInterval(()=> {
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
            fisic.position = 0

        if (pipes.p[0] === undefined){
            console.log('n retornando')
            return
        }
        console.log('fora do if')
            

        console.log(pipes.p)

        
         let nextpipe = pipes.p[0]

        // console.log(pipes.p.length)
        // console.log(nextpipe)
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
            pipes.p.splice(0, 1)
            flappyScore()
        }
    }, updateRate)
    loopPipe = setInterval(updatePipes, 1400)
    flappyJump()
}

$(document).keydown(function (e) {
    if (e.keyCode == 32) {
        
        if (currentState == state.ScoreScreen)
            $("#restart").click()
        else
            screenClick()
    }
})
if ("ontouchstart" in window)
    $(document).on("touchstart", screenClick)
else
    $(document).on("mousedown", screenClick)

function screenClick() {
    if (currentState == state.GameScreen)
        flappyJump()
    else if (currentState == state.StartScreen)
        startGame()
}

function updatePipes(){
    $(".pipe").filter(function() { return $(this).position().left <= -100; }).remove()
    let padding = 80
    let constrain = (420 - pipes.height - (padding * 2))
    let topHeight = Math.floor((Math.random()*constrain) + padding)
    let bottomHeight = (420 - pipes.height) - topHeight
    //var newpipe = $('<div class="pipe animated"><div class="pipe_upper" style="height: ' + topheight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomheight + 'px;"></div></div>')

    let newPipe = $('<div class="pipe animated"><div class="pipe_upper" style="height: ' + topHeight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomHeight + 'px;"></div></div>')
    $('#fly-area-game').append(newPipe)
    pipes.p.push(newPipe)
}

var isIncompatible = {
    Android: function() {
    return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i)
    },
    Safari: function() {
    return (navigator.userAgent.match(/OS X.*Safari/) && ! navigator.userAgent.match(/Chrome/));
    },
    Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
    return (isIncompatible.Android() || isIncompatible.BlackBerry() || isIncompatible.iOS() || isIncompatible.Opera() || isIncompatible.Safari() || isIncompatible.Windows())
    }
}




 


