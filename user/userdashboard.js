"use strict"

let pageUser = curr_user;

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

basicInfo();
getNotice();
getAllQandACount();
getAllQ();
getAllQUser();
getAllAnswer();

// Loads left hand side information about the user
function basicInfo(){
    let mytags = ''
    let t;
    for(t of pageUser.tag_list)
    {
        mytags+=`<span class="tag">${tags[t].name}</span>`
    }
    
    let myhtml = `<h2> Welcome Back ${pageUser.display_name}</h2>
    <img src="${pageUser.photo_src}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3>${mytags}</div>
    </div>`

    myhtml += `<a class="sidebutton" href="../user/user_profile.html?user_id=${curr_user.id}">Your Profile</a>`
    myhtml += `<a class="sidebutton" href="editprofile.html">Edit Profile</a>`

    if(pageUser.is_admin){
        myhtml += `<a class="sidebutton" id="adminbutt" href="../admin/admin_dashboard.html">Admin Dashboard</a>`  
    }

    $('#left').prepend(myhtml);
}

// Loads the latest notification
function getNotice(){
    let curr = notices[notices.length-1];
    let myhtml =`
    <div id="noticetitle">${curr.title}</div>
    <div id="noticedesc">${curr.content}</div>
    <div id="noticedate">Posted on ${curr.time}, 2020</div>`

    $('#notification').prepend(myhtml);
}

// Gets the number of questions and answers of this user
function getAllQandACount(){
    let qNum = 0;
    let aNum = 0;   

    for(let i=0; i<num_questions; i++)
    {
        if (questions[i].user_id==pageUser.id)
        {
            qNum++;
        }
    }

    for(let j=0; j<num_answers; j++)
    {
        if(answers[j].user_id == pageUser.id)
        {
            aNum++;
        }
    }

    let headings = document.getElementsByClassName("userheading");
    headings[2].innerHTML=`Your Recent Questions (${qNum})`;
    headings[3].innerHTML=`Your Recent Answers (${aNum})`;
}

// Displays the list of all questions
// This would be later populated by questions related to user from backend
function getAllQ(){
    let wanted = document.getElementsByClassName("listcontainter")[0];
    for(let q of questions)
    {
        let numA = 0;
        for(let a of answers)
        {
            if(a.question_id == q.id)
            {
                numA++;
            }
        }
        let resolve ='Unresolved';
        if (q.is_resolved == true)
        {
            resolve = 'Resolved';
        }
        wanted.innerHTML+=`<div class="shortquestion">
        <a class="squestion" href="../answer/answer.html?question_id=${q.id}">${q.title}</a>
        <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${q.user_id}">${users[q.user_id].display_name}</a> - ${q.time} - ${numA} Answers - ${resolve}</div>
        </div>`;
    }
}

// Displays all questions asked by user
function getAllQUser(){
    let currQuestion = [];

    for(let i=0; i<num_questions; i++)
    {
        if(questions[i].user_id == pageUser.id)
        {
            currQuestion.push(questions[i]);
        }
    }

    let wanted = document.getElementsByClassName("listcontainter")[1];
    let j=0;
    while(j<currQuestion.length)
    {
        let currQ = currQuestion[j];

        let resolve ='Unresolved';
        if (currQ.is_resolved)
        {
            resolve = 'Resolved';
        }

        let numA = 0;
        for(let a of answers)
        {
            if(a.question_id == currQ.id)
            {
                numA++;
            }
        }
        wanted.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="../answer/answer.html?question_id=${currQ.id}">${currQ.title}</a>
            <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${currQ.user_id}">${users[currQ.user_id].username}</a> - ${currQ.time} -  ${numA} Answers - ${resolve}</div>
        </div>`;
        j++;
    }
}

// Displays all answers answered by user
function getAllAnswer(){
    let currAnswer = [];
    for(let i=0; i<num_answers; i++)
    {
        if(answers[i].user_id == pageUser.id)
        {
            currAnswer.push(answers[i]);
        }
    }
    let wanted = document.getElementsByClassName("listcontainter")[2];
    let j=0;
    while(j<currAnswer.length)
    {
        let currA = currAnswer[j];
        let Qc = questions[currA.question_id].title;
        wanted.innerHTML+=`	<div class="shortquestion">
        <a class="sanswer" href="../answer/answer.html?question_id=${currA.question_id}">${currA.content}</a>
        <div class="sinfo">In reply to <a href="../answer/answer.html?question_id=${currA.question_id}">${Qc}</a> - ${currA.time}</div>
    </div>`;
        j++;
    }
}