const list_of_urls = ["robertgabriel", "Documents", "www.teamwork.com", "engineroom.teamwork.com", "teamwork.com/blog"];
const trigger_pages = [""]; //Add the urls for the pages to happen
var objects = [];

if (window.addEventListener) window.addEventListener("load", autorun, false);
else if (window.attachEvent) window.attachEvent("onload", autorun);
else window.onload = autorun;


function autorun() {

    createCookie("Teamwork", btoa(textToJson(setObject())), 2);
    console.log(decode(getCookie("Teamwork")));
    editObject("robertgabriel")
}


function setObject() {

    for (var i = 0; i < list_of_urls.length; i++) {
        if (getCurrentUrl().indexOf(list_of_urls[i]) != -1) {
            objects[i] = "{domain:" + list_of_urls[i] + ", url:" + getCurrentUrl() + "}";
        }
    }
    return objects;
}

function editObject(domain) {
    console.log(Object.keys(objects).length);

    for (var i = 0; i < objects.length; i++) {
        console.log(objects['domain']);
        if (objects[i].domain === domain) {
            objects[i].url = "ss";
            break;
        }
    }
    console.log(objects);
}

function encode(data) {
    return btoa(data);
}

function decode(data) {
    return atob(data);
}


function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.log("Created : " + cname + "with value " + cvalue);
}



function textToJson(data) {
    return JSON.stringify(data);
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

function checkCookie(value) {
    var username = getCookie(value);
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            createCookie("username", username, 365);
        }
    }
}


function getCurrentUrl() {
    return window.location.href;
}


// -- Function Name : regexUrlextensioncheck(extension
// -- Params : extension (example : signup)
// -- Purpose : To check if the currenty url is that of the extension
function regexUrlextensioncheck(extension) {
    var url = document.URL;
    var patt = new RegExp(extension);
    return patt.test(url);
}
