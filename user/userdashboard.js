pageUser = curr_user;
basicInfo();

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

function basicInfo()
{

    let mytags = ''
    let t;
    for(t of pageUser.tag_list)
    {
        mytags+=`<span class="tag">${tags[t].name}</span>`
    }
    
    let myhtml = `<h2> Welcome Back ${pageUser.display_name}</h2>
    <img src="${pageUser.photo_src}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3> ${mytags}</div>							<div>
    </div>

    </div>`

    myhtml += `<a class="sidebutton" href="../user/userprofile.html?user_id=${curr_user.id}">Your Profile</a>`
    myhtml += `<a class="sidebutton" href="editprofile.html">Edit Profile</a>`

    if(pageUser.is_admin){
        myhtml += `<a class="sidebutton" id="adminbutt" href="../Admin/admin_dashboard.html">Admin Dashboard</a>`  
    }

    $('#left').prepend(myhtml);
}

getNotice();
function getNotice()
{
    let curr = notices[notices.length-1];
    let currN = document.getElementsByClassName("userheading")[0];
    let myhtml =`
    <div id="noticetitle">${curr.title}</div>
    <div id="noticedesc">${curr.content}</div>
    <div id="noticedate">Posted on ${curr.time}, 2020</div>`

    $('#notification').prepend(myhtml);
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
    X[2].innerHTML=`Your Recent Questions (${res})`;
    let Y = document.getElementsByClassName("userheading");
    X[3].innerHTML=`Your Recent Answers (${answ})`;
}

getAllQ();
function getAllQ()
{
    let wanted = document.getElementsByClassName("listcontainter")[0];
    for(q of questions)
    {
        let numA = 0;
        for(a of answers)
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
        <a class="squestion" href="../answer/answer.html">${q.content}</a>
        <div class="sinfo">Asked by <a href="../user/userprofile.html?user_id=${q.user_id}">${users[q.user_id].display_name}</a> - ${q.time} - ${numA} Answers - ${resolve}</div>
        </div>`;
    }
}




getUserAllQeustions();
function getUserAllQeustions(){
    ansNum = 0;
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
        let anw = users[currQ.user_id].username;
        let resolve ='Unresolved';
        if (currQ.is_resolved)
        {
            resolve = 'Resolved';
        }
        let numA = 0;
        for(a of answers)
        {
            if(a.question_id == currQ.id)
            {
                numA++;
            }
        }
        wanted.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="../answer/answer.html">${currQ.content}</a>
            <div class="sinfo">Asked by <a href="../user/userprofile.html?user_id=${currQ.user_id}">${anw}</a> - ${currQ.time} -  ${numA} Answers - ${resolve}</div>
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
    let wanted = document.getElementsByClassName("listcontainter")[2];
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