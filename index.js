const list_of_urls = ["www.teamwork.com", "engineroom.teamwork.com", "teamwork.com/blog"];
const trigger_pages = [""]; //Add the urls for the pages to happen

function init() {



}

function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function updateCookie() {

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}



function clearDiv(id) {

}

// -- Function Name : regexUrlextensioncheck(extension
// -- Params : extension (example : signup)
// -- Purpose : To check if the currenty url is that of the extension
function regexUrlextensioncheck(extension) {
    var url = document.URL;
    var patt = new RegExp(extension);
    return patt.test(url);
}
