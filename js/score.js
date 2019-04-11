let replayclickable = false
let score = {
    s: 0,
    hs: 0,
}
function setBigScore(erase) {
    let elemscore = $("#score-big")
    elemscore.empty()
    if (erase)
        return
    let digits =score.s.toString().split('')
    for (let i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>")
}

function setSmallScore() {
    let elemscore = $("#score-current")
    elemscore.empty()
    let digits =score.s.toString().split('')
    console.log(digits)
    for (let i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>")
}


function setHighScore() {
    let elemscore = $("#score-best")
    elemscore.empty()
    let digits = score.hs.toString().split('')
    console.log(digits)
    for (let i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>")
}

function setMedal() {
    let elemmedal = $("#medal")
    elemmedal.empty()
    if (score.s< 10)
        return false
    if (score.s>= 10)
        medal = "bronze"
    if (score.s>= 20)
        medal = "silver"
    if (score.s>= 30)
        medal = "gold"
    if (score.s>= 40)
        medal = "platinum"
    elemmedal.append('<img src="assets/medal_' + medal + '.png" alt="' + medal + '">')
    return true;
}

function showScore(){
    $('#score-board').css('display', 'block')
    setBigScore(true)
    if(score.s> score.hs){
        score.hs = score.s;
        setCookie('highscore', score.hs, 60*60*24)
    }
    console.log('showscore - ' + score.hs)
    setSmallScore()
    setHighScore()

    let wonmedal = setMedal()

    soundSwoosh.stop()
    soundSwoosh.play()

    $('#score-board').css({ y: '40px', opacity: 0 })
    $('#restart').css({ y: '40px', opacity: 0})
    $('#score-board').transition({ y: '40px', opacity: 1 },600, 'ease', function(){    
        soundSwoosh.stop()
        soundSwoosh.play()
        $('#restart').transition({y:'0px', opacity: 1}, 600,'ease')
        if(wonmedal){
            $("#medal").css({ scale: 2, opacity: 0 })
            $("#medal").transition({ opacity: 1, scale: 1 }, 1200, 'ease')
         }
         
         
    })
    replayclickable = true
}