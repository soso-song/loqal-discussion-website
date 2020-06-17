import {questions} from userProfile\UserProfileView.js
let users =[];
let userName = '';
let userId=null;
let userAnwsers=[];
let userQeustions=[];

class user{
    constructor(userName, email, displayname, password, tags, photo, isadmin, isFlagged){
        this.userName = userName;
        this.email = email;
        this.displayname = displayname;
        this.password = password;
        this.tags = tags;
        this.photo = photo;
        this.isadmin = isadmin;
        this.isFlagged = isFlagged;
    }
}

function getAllQeustions(user){
    for(var i=0; i<userTags.length; i++)
    {
        var currQeustion = userQeustion[i];
        var Ttable = document.getElementById('questionTable');
        var row = table.insertRow(-1);
        newTag.innerHTML=`${user}`;
    }
}
fucntion uploadPhoto(e){
    var newP = document.getElementById(importform);
}
function getAllTags(user){
    var userTags = user.tags;
    for(var i=0; i<userTags.length; i++)
    {
        var currTag = userTags[i];
        var fit=0;
        if(currTag.getAttr()="geo")
        {
            fit=1;
        }
        var Ttable = document.getElementById('tagsTable');
        var row = table.insertRow(-1);
        var newTag = row.inserCell(fit);
        newTag.innerHTML=`${currTag}`;
    }


}