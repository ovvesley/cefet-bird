function getCookie(cName){
    let name = cName + '='
    let ca = document.cookie.split(';')
    for(let index = 0; index< ca.length; index++){
        let c = ca[index].trim()
        if(c.indexOf(name) === 0)
            return c.substring(name.length, c.length)
    }
    return ''
}

function setCookie(cName,cValue,exDay)
{
    let d = new Date()
    d.setTime(d.getTime()+(exDay*24*60*60*1000))
    let expires = 'expires=' + d.toGMTString()
    document.cookie = cName + '=' + cValue + '; ' + expires   


}