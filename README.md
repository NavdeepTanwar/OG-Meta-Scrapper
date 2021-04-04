#Scrappy
A simple NodeJs Script for getting Open Graph meta data form a given url



Method: GET

End Point: [https://noelz8ysh9.execute-api.us-east-1.amazonaws.com/default/scappy](https://noelz8ysh9.execute-api.us-east-1.amazonaws.com/default/scappy)

Query parameter : url (required)

##Example 
Request : 
```
https://noelz8ysh9.execute-api.us-east-1.amazonaws.com/default/scappy?url=https://www.facebook.com
```
Response: 
```
{
    "status": true,
    "message": "success",
    "result": {
        "site_name": "Facebook",
        "url": "https://www.facebook.com/",
        "image": "https://www.facebook.com/images/fb_icon_325x325.png",
        "locale": "en_US",
        "title": "Facebook - Log In or Sign Up",
        "description": "Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates."
    }
}
```


