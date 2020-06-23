$(document).ready(function() {
    $("#activitybutt").click(function(){
        $('#useractivity').removeClass("hideme");
        $('#followers').addClass("hideme");
        $('#following').addClass("hideme");
    });
    
    $("#followerbutt").click(function(){
        $('#useractivity').addClass("hideme");
        $('#followers').removeClass("hideme");
        $('#following').addClass("hideme");
    });
    
    $("#followingbutt").click(function(){
        $('#useractivity').addClass("hideme");
        $('#followers').addClass("hideme");
        $('#following').removeClass("hideme");
	});
});

const pageUser = users[2];
curr_user = users[0];
basicInfo();
function basicInfo()
{
    bi = document.getElementById("left");
    bi.innerHTML += `<h2>${pageUser.username}</h2>
    <h3>${pageUser.display_name}</h3>
    <h4>@${pageUser.username}</h4>
    <img src="${pageUser.photo_src}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3>`
    var t;
    for(t of pageUser.tag_list)
    {
        bi.innerHTML+=`<span class="tag">${t.name}</span>`
    }
    bi.innerHTML+=`							<div>
    <h3>3267 Best Answers</h3>
</div>

</div>`
}

getAllQeustionsNum();
function getAllQeustionsNum(){
    var res = 0;
    var answ = 0;
    for(var i=0; i<num_questions; i++)
    {
        if (questions[i].user_id=pageUser.id)
        {
            res++;
        }
    }
    for(var j=0; j<num_answers; j++)
    {
        if(answers[j].user_id = pageUser.id)
        {
            answ = 0;
        }
    }
    let X = document.getElementsByClassName("userheading");
    X[0].innerHTML=`Questions (${res})`;
    let Y = document.getElementsByClassName("userheading");
    X[1].innerHTML=`Answer (${answ})`;
}
getAllQeustions();
function getAllQeustions(){
    ansNum=0;
    for(var i=0; i<num_questions; i++)
    {
        var currQuestion = [];
        if(questions[i].user_id = pageUser.id)
        {
            currQuestion.push(questions[i]);
        }
    }
    let wanted = document.getElementsByClassName("listcontainter")[0];
    let j=0;
    while(j<2 && j<currQuestion.length)
    {
        let currQ = currQuestion[j];
        let anw = users[currQ.user_id].username;
        let resolve ='Unresolved';
        if (currQ.is_resolved){
            resolve = 'resolved';
        }
        wanted.innerHTML+=`<div class="shortquestion">
        <a class="squestion" href="../answer/answer.html">${currQ.content}</a>
        <div class="sinfo">Asked by <a href="#">${anw}</a> - ${currQ.time} - 5 Answers - ${resolve}</div>
    </div>`;
        j++;
    }
}

getAllAnswer();
function getAllAnswer(){
    for(var i=0; i<num_answers; i++)
    {
        var currAnswer = [];
        if(answers[i].user_id = pageUser.id)
        {
            currAnswer.push(answers[i]);
        }
    }
    
    let wanted = document.getElementsByClassName("listcontainter")[1];
    let j=0;
    while(j<2 && j<currAnswer.length)
    {
        let currA = currAnswer[j];
        let Qc = questions[currA.question_id].content;
        wanted.innerHTML+=`	<div class="shortquestion">
        <a class="sanswer" href="../answer/answer.html">${currA.content}</a>
        <div class="sinfo">In reply to <a href="#">${Qc}</a> - ${currA.time}</div>
    </div>`;
        j++;
    }
}
pageUser.followed = [users[0],users[1],users[2]];
followers();
function followers()
{
    let f = document.getElementsByClassName("personcontainter")[0];
    var follower;
    for (follower of pageUser.followed)
    {
        f.innerHTML+=`<div class="person">
        <div class="personname">${follower.username}</div>
        <div class="personis">@${follower.displayname}</div>
    </div>`;
    }
}

pageUser.following = [users[0],users[1],users[2]];
following();
function following()
{
    let f = document.getElementsByClassName("personcontainter")[1];
    var followin;
    for (followin of pageUser.following)
    {
        f.innerHTML+=`<div class="person">
        <div class="personname">${followin.username}</div>
        <div class="personis">@${followin.displayname}</div>
    </div>`;
    }
}
// function uploadPhoto(e){
//     var newP = document.getElementById('importForm');
//     var newPsrc = newP.datafile.value;
// }

// function following(){
//     var status = document.getElementById("follow");
//     if (status.innerHTML === "follow") {
//         curr_user.following.push(pageUser);
//         pageUser.followed.push(curr_user);
//         status.innerHTML = "following";
//       } else 
//       {
//         status.innerHTML = "follow";
//         curr_user.following.pop();
//         pageUser.followed.pop();
//       }
// }
// getAllTags(pageUser);
// function getAllTags(user){
//     var userTags = user.tag_list;
//     for(var i=0; i<userTags.length; i++)
//     {
//         var currTag = userTags[i];
//         var fit=-1;
//         if(tags[currTag].is_geo==true)
//         {
//             fit=0;
//         }
//         var Ttable = document.getElementById('tagsTable');
//         var row = Ttable.insertRow(-1);
//         var newTag = row.insertCell(fit);   
//         newTag.innerHTML=`${tags[currTag].name}`;
//     }
// }
// listAllquestions(pageUser);
// function listAllquestions(user){
//     var question;
//     for (question of questions)
//     {
//         if (question.user_id == user.user_id)
//         {
//             var newQ = document.getElementById("questions").innerHTML=question.is_solved();
//             var newR = newQ.insertRow(-1);
//             var newStatus = newR.insertCell(0);
//             var newContent = newR.insertCell(1);
//             newStatus.innerHTML = `${question.content}`;
//             newContent.innerHTML = `${question.is_solved}`;
//         }
//     }
// }
// var shown = 0;
// pageUser.follower = [users[0],users[1],users[2]];
// function loadFollowInfo(e){
//     var fInfo = document.getElementById("followerinfo");
//     if (shown == 0){
//         fInfo.style.visibility = "visible";
//         shown = 1;
//         var follower;
//         for (follower of pageUser.follower)
//         {
//             var newFo = document.getElementById("followerinfotable");
//             var row = newFo.insertRow(-1);
//             var f = row.insertCell(0);
//             f.innerHTML = `${follower.username}`;
//         }
//     } else{
//         fInfo.style.visibility = "hidden";
//         var newFo = document.getElementById("followerinfotable");
//         newFo.innerHTML = `<th>Followers</th>`;
//         shown = 0;
//     }
// }
