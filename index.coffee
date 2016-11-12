listOfUrls = [
  'example3.com',
  '1.example.com',
  '2.example.com',
  '3.example.com'
]

masterDomain = '.example.com'
localDevelment = if window.location.hostname == 'localhost' then true else false 
objects = []

# -- Function Name : autorun
# -- Params : none
# -- Purpose : Starts to create the cookie on loads
# -- TODO : Set triggers for different pages. Example
autorun = ->
  if checkCookie(masterDomain.replace(/\./g, ''))
    if localDevelment then console.log('Edit') else null
    objects = string_to_object(decode(getCookie(masterDomain.replace(/\./g, ''))))
    deleteCookie masterDomain.replace(/\./g, '')
    editObject()
  else
    if localDevelment then console.log('Create') else null
    createCookie masterDomain.replace(/\./g, ''), btoa(textToJson(setObject())), 2, masterDomain
  if localDevelment then console.log(decode(getCookie(masterDomain.replace(/\./g, '')))) else null
  return


# -- Function Name : setObject
# -- Params : None
# -- Purpose : creates the objects and values
setObject = ->
  i = 0
  while i < listOfUrls.length
    information = new Object
    information.domain = listOfUrls[i]
    information.url = if getCurrentUrl().indexOf(listOfUrls[i]) != -1 then getCurrentUrl() else null
    information.date = if getCurrentUrl().indexOf(listOfUrls[i]) != -1 then getDate() else null
    objects.push information
    i++
  return objects


# -- Function Name : get_date
# -- Params : none
# -- Purpose : get current date : example : Fri Aug 05 2016
getDate = ->
  d = new Date
  return d.toDateString()

# -- Function Name : deleteCookie
# -- Params : string
# -- Purpose : deletes cookie
deleteCookie = (name) ->
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  return

# -- Function Name : edit a object value
# -- Params : String and or object
# -- Purpose : edit a object of value a domain

editObject = (domain) ->
  i = 0
  while i < objects.length
    if localDevelment then console.log(objects[1].domain) else null
    if regexUrlextensioncheck(objects[i].domain)
      objects[i].url = getCurrentUrl()
      break
    i++
  if localDevelment then console.log(objects) else null
  createCookie masterDomain.replace(/\./g, ''), btoa(textToJson(objects)), 2, masterDomain
  return

# -- Function Name : string_to_object
# -- Params : string
# -- Purpose :  converts a string to a object
string_to_object = (string) ->
  myobj = JSON.parse(string)
  return myobj

# -- Function Name : decode
# -- Params : string
# -- Purpose : encodes a string as btoa
encode = (data) ->
  return btoa data

# -- Function Name : decode
# -- Params : data
# -- Purpose : decodes btoa encoded data
decode = (data) ->
  return atob data

# -- Function Name : Create Cookie
# -- Params : data / object
# -- Purpose : Makes a string into json
createCookie = (cname, cvalue, exdays, domain) ->
  d = new Date
  d.setTime d.getTime() + exdays * 24 * 60 * 60 * 1000
  expires = 'expires=' + d.toUTCString()
  document.cookie = if localDevelment then cname + '=' + cvalue + '; expires=' + expires else cname + '=' + cvalue + '; expires=' + expires + '; domain=.teamwork.com'
  if localDevelment then console.log('Created : ' + cname + 'with value ' + cvalue) else null
  return

# -- Function Name : textToJson
# -- Params : data / object
# -- Purpose : Makes a string into json

textToJson = (data) ->
  return JSON.stringify data

# -- Function Name : getCookie
# -- Params : cooke name
# -- Purpose : gets the cookie value

getCookie = (cname) ->
  name = cname + '='
  ca = document.cookie.split(';')
  i = 0
  while i < ca.length
    c = ca[i]
    while c.charAt(0) == ' '
      c = c.substring(1)
    if c.indexOf(name) == 0
      return c.substring(name.length, c.length)
    i++
  ''

# -- Function Name : checkCookie
# -- Params : value
# -- Purpose : check the current cookie

checkCookie = (value) ->
  cookieName = getCookie(value)
  if cookieName != ''
    return true
  return false

# -- Function Name : getCurrentUrl
# -- Return : string
# -- Purpose : Return the current url
getCurrentUrl = ->
  return window.location.href

# -- Function Name : regexUrlextensioncheck(extension
# -- Params : extension (example : signup)
# -- Purpose : To check if the currenty url is that of the extension
regexUrlextensioncheck = (extension) ->
  url = document.URL
  patt = new RegExp(extension)
  patt.test url

if window.addEventListener
  window.addEventListener 'load', autorun, false
else if window.attachEvent
  window.attachEvent 'onload', autorun
else
  window.onload = autorun
