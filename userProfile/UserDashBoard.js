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

pageUser = users[1];
curr_user = users[0];
basicInfo();
function basicInfo()
{
    best = 0;
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
        bi.innerHTML+=`<span class="tag">${tags[t].name}</span>`
    }
    for(a of answers)
    {
        if(a.is_best && a.user_id==pageUser)
        {
            best ++;
        }
    }
    bi.innerHTML+=`							<div>
    <h3>${best} Best Answers</h3>
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
    var currQuestion = [];
    for(var i=0; i<num_questions; i++)
    {
        
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
        if (currQ.is_resolved)
        {
            resolve = 'Resolved';
        }
        let numA;
        for(a of answers)
        {
            if(a.question_id = pageUser.id)
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
    var currAnswer = [];
    for(var i=0; i<num_answers; i++)
    {
        
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
        <div class="personis">@${follower.username}</div>
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