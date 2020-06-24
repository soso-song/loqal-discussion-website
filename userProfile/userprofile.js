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

const pageUser = users[1];
curr_user = users[0];
basicInfo();
function basicInfo()
{
    best = 0;
    bi = document.getElementById("left");
    bi.innerHTML

    let mytags = ''
    let t;
    for(t of pageUser.tag_list)
    {
        mytags+=`<span class="tag">${tags[t].name}</span>`
    }
    for(a of answers)
    {
        if(a.is_best && a.user_id==pageUser)
        {
            best ++;
        }
    }
    
    let myhtml = `<h2>${pageUser.username}</h2>
    <h3>${pageUser.display_name}</h3>
    <h4>@${pageUser.username}</h4>
    <img src="${pageUser.photo_src}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3> ${mytags}</div>							<div>
    <h3>${best} Best Answers</h3>
    </div>

    </div>`
    bi.innerHTML+= myhtml;
}

getAllQeustionsNum();
function getAllQeustionsNum(){
    let res = 0;
    let answ = 0;
    for(let i=0; i<num_questions; i++)
    {
        if (questions[i].user_id==pageUser.id)
        {
            res++;
        }
    }
    for(let j=0; j<num_answers; j++)
    {
        if(answers[j].user_id == pageUser.id)
        {
            answ++;
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
    let currQuestion = [];
    for(let i=0; i<num_questions; i++)
    {
        
        if(questions[i].user_id == pageUser.id)
        {
            currQuestion.push(questions[i]);
        }
    }
    let wanted = document.getElementsByClassName("listcontainter")[0];
    let j=0;
    while(j<currQuestion.length)
    {
        let currQ = currQuestion[j];
        let anw = users[currQ.user_id].username;
        let resolve ='Unresolved';
        if (currQ.is_resolved==true)
        {
            resolve = 'Resolved';
        }
        let numA;
        for(a of answers)
        {
            if(a.question_id == currQ.id)
            {
                numA++;
            }
        }
        wanted.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="../answer/answer.html">${currQ.content}</a>
            <div class="sinfo">Asked by <a href="#">${anw}</a> - ${currQ.time} -  ${numA} Answers - ${resolve}</div>
        </div>`;
        j++;
    }
}

getAllAnswer();
function getAllAnswer(){
    let currAnswer = [];
    
    for(let i=0; i<num_answers; i++)
    {
        if(answers[i].user_id == pageUser.id)
        {
            currAnswer.push(answers[i]);
        }
    }
    
    let wanted = document.getElementsByClassName("listcontainter")[1];
    let j=0;
    while(j<currAnswer.length)
    {
        let currA = currAnswer[j];
        let Qc = questions[currA.question_id].title;
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
    let follower;
    for (follower of pageUser.followed)
    {
        f.innerHTML+=`<div class="person">
        <div class="personname">${follower.username}</div>
        <div class="personis">@${follower.username}</div>
    </div>`;
    }
}

pageUser.following = [users[0],users[1],users[2]];
following();
function following()
{
    let f = document.getElementsByClassName("personcontainter")[1];
    let followin;
    for (followin of pageUser.following)
    {
        f.innerHTML+=`<div class="person">
        <div class="personname">${followin.username}</div>
        <div class="personis">@${followin.username}</div>
    </div>`;
    }
}
let shown = 0;
function loadFollowInfo(e){
    var fInfo = document.getElementById("followUnfollow");
    if (shown == 0){
        fInfo.innerHTML = `Unfollow`;
        pageUser.followed.push(curr_user);
        curr_user.following.push(pageUser);
        shown = 1;
    } else{
        fInfo.innerHTML = `Follow`;
        let remove1 = 0;
        let remove2 = 0;
        let l = 0;
        let k = 0;
        while(k<pageUser.followed.length)
        {
            if(pageUser.followed[k].user_id == curr_user.user_id)
            {
                reomve1 = k;
            }
            k++;
        }
        while(l<curr_user.following.length)
        {
            if(curr_user.following[l].user_id == pageUser.user_id)
            {
                reomve1 = l;
            }
            l++;
        }
        pageUser.followed.splice(remove1,1);
        curr_user.following.splice(remove2,1);
        shown = 0;
    }
}
// function uploadPhoto(e){
//     let newP = document.getElementById('importForm');
//     let newPsrc = newP.datafile.value;
// }

// function following(){
//     let status = document.getElementById("follow");
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
//     let userTags = user.tag_list;
//     for(let i=0; i<userTags.length; i++)
//     {
//         let currTag = userTags[i];
//         let fit=-1;
//         if(tags[currTag].is_geo==true)
//         {
//             fit=0;
//         }
//         let Ttable = document.getElementById('tagsTable');
//         let row = Ttable.insertRow(-1);
//         let newTag = row.insertCell(fit);   
//         newTag.innerHTML=`${tags[currTag].name}`;
//     }
// }
// listAllquestions(pageUser);
// function listAllquestions(user){
//     let question;
//     for (question of questions)
//     {
//         if (question.user_id == user.user_id)
//         {
//             let newQ = document.getElementById("questions").innerHTML=question.is_solved();
//             let newR = newQ.insertRow(-1);
//             let newStatus = newR.insertCell(0);
//             let newContent = newR.insertCell(1);
//             newStatus.innerHTML = `${question.content}`;
//             newContent.innerHTML = `${question.is_solved}`;
//         }
//     }
// }
// let shown = 0;
// pageUser.follower = [users[0],users[1],users[2]];
// function loadFollowInfo(e){
//     let fInfo = document.getElementById("followerinfo");
//     if (shown == 0){
//         fInfo.style.visibility = "visible";
//         shown = 1;
//         let follower;
//         for (follower of pageUser.follower)
//         {
//             let newFo = document.getElementById("followerinfotable");
//             let row = newFo.insertRow(-1);
//             let f = row.insertCell(0);
//             f.innerHTML = `${follower.username}`;
//         }
//     } else{
//         fInfo.style.visibility = "hidden";
//         let newFo = document.getElementById("followerinfotable");
//         newFo.innerHTML = `<th>Followers</th>`;
//         shown = 0;
//     }
// }
