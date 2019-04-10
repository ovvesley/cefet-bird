let score = {
    s: 0,
    hs: 0
}
function setBigScore(erase) {
    let elemscore = $("#bigscore")
    elemscore.empty()
    if (erase)
        return
    let digits =score.s.toString().split('')
    for (let i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_big_" + digits[i] + ".png' alt='" + digits[i] + "'>")
}

function setSmallScore() {
    let elemscore = $("#currentscore")
    elemscore.empty()
    let digits =score.s.toString().split('')
    for (let i = 0; i < digits.length; i++)
        elemscore.append("<img src='assets/font_small_" + digits[i] + ".png' alt='" + digits[i] + "'>")
}

function setHighScore() {
    let elemscore = $("#highscore")
    elemscore.empty()
    let digits = score.hs.toString().split('')
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
