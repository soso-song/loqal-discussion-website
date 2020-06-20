const newuser = users[0];
function getAllQeustions(user){
    for(var i=0; i<userTags.length; i++)
    {
        var currQeustion = userQeustion[i];
        var Ttable = document.getElementById('questionTable');
        var row = table.insertRow(-1);
        newTag.innerHTML=`${user}`;
    }
}
// console.log(users.length);
// for(newUser of users){
//     console.log("newUser");
// }
// console.log(newUser.userName);

function uploadPhoto(e){
    var newP = document.getElementById('importForm');
    var newPsrc = newP.datafile.value;
}   
function following(){
    var status = document.getElementById("follow");
    if (status.innerHTML === "follow") {
        status.innerHTML = "following";
      } else {
        status.innerHTML = "follow";
      }
      user.following.push(newUser);
      user.followed.push(user);
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
function listAllquestions(user){
    var question;
    for (question of questions)
    {
        if (question.user_id == user.user_id)
        {
            document.querySelector("status").innerHTML=question.is_solved();
            document.querySelector("content").innerHTML=question.content;
        }

    }

}

