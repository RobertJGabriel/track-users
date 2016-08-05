const list_of_urls = ["robertgabriel", "Documents", "www.teamwork.com", "Users", "engineroom.teamwork.com", "teamwork.com/blog"];
const trigger_pages = [""]; //Add the urls for the pages to happen
const master_domain = "teamwork.com";
var objects = [];

if (window.addEventListener) window.addEventListener("load", autorun, false);
else if (window.attachEvent) window.attachEvent("onload", autorun);
else window.onload = autorun;


// -- Function Name : autorun
// -- Params : none
// -- Purpose : Starts to create the cookie on loads
// -- TODO : Set triggers for different pages. Example
function autorun() {

    if (checkCookie("Teamwork")) {
        console.log("Edit");
        objects = string_to_object(decode(getCookie("Teamwork")));
        editObject("Documents")
    } else {
        console.log("Create");
        createCookie("Teamwork", btoa(textToJson(setObject())), 2,master_domain);
    }
    console.log(decode(getCookie("Teamwork")))
}


// -- Function Name : setObject
// -- Params : None
// -- Purpose : creates the objects and values
function setObject() {
    for (var i = 0; i < list_of_urls.length; i++) {
        var information = new Object();
        information.domain = list_of_urls[i];
        information.url = getCurrentUrl().indexOf(list_of_urls[i]) != -1 ? getCurrentUrl() : null;
        information.date = getCurrentUrl().indexOf(list_of_urls[i]) != -1 ? getDate() : null;
        objects.push(information);
    }
    return objects;
}


// -- Function Name : get_date
// -- Params : none
// -- Purpose : get current date : example : Fri Aug 05 2016
function getDate() {
    var d = new Date();
    return d.toDateString();
}


// -- Function Name : delete_cookie
// -- Params : string
// -- Purpose : deletes cookie
function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// -- Function Name : edit a object value
// -- Params : String and or object
// -- Purpose : edit a object of value a domain
function editObject(domain) {
    for (var i = 0; i < objects.length; i++) {
        console.log(objects[1].domain);
        if (objects[i].domain === domain) {
            objects[i].url = getCurrentUrl();
            break;
        }
    }
    console.log(objects);
    createCookie("Teamwork", btoa(textToJson(objects)), 2,master_domain);
}

// -- Function Name : string_to_object
// -- Params : string
// -- Purpose :  converts a string to a object
function string_to_object(string) {
    var myobj = JSON.parse(string);
    return myobj;
}


// -- Function Name : decode
// -- Params : string
// -- Purpose : encodes a string as btoa
function encode(data) {
    return btoa(data);
}

// -- Function Name : decode
// -- Params : data
// -- Purpose : decodes btoa encoded data
function decode(data) {
    return atob(data);
}

// -- Function Name : Create Cookie
// -- Params : data / object
// -- Purpose : Makes a string into json
function createCookie(cname, cvalue, exdays,domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; expires=" + expires + ";domain=" + domain;
    console.log("Created : " + cname + "with value " + cvalue);
}


// -- Function Name : textToJson
// -- Params : data / object
// -- Purpose : Makes a string into json
function textToJson(data) {
    return JSON.stringify(data);
}


// -- Function Name : getCookie
// -- Params : cooke name
// -- Purpose : gets the cookie value
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


// -- Function Name : checkCookie
// -- Params : value
// -- Purpose : check the current cookie
function checkCookie(value) {
    var cookie_name = getCookie(value);
    if (cookie_name != "") {
        return true;
    } else {
        return false;
    }
}


// -- Function Name : getCurrentUrl
// -- Return : string
// -- Purpose : Return the current url
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
