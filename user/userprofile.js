const pageUser = users[1];
curr_user = users[0];

pageUser.followers = [users[0],users[1],users[2]];
pageUser.following = [users[3],users[2]];

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

    //hides follow button if user profile and logged in user are the same
    if(pageUser.username == curr_user.username){
        $('#followUnfollow').css("display", "none");
    }else{
        $('#followUnfollow').css("display", "block");
    }

    //sets initial state for follower button
    for(let i=0; i<pageUser.followers.length; i++)
    {
        if (pageUser.followers[i]==curr_user)
        {
            $('#followUnfollow').text('Unfollow');
        }
    }
    
    $("#followUnfollow").click(function(){
		const currentState = $('#followUnfollow').text();
		if(currentState === 'Follow'){
            $('#followUnfollow').text('Unfollow');
            pageUser.followers.push(curr_user);
            fillfollowers(); 
		}else if(currentState === 'Unfollow'){
            const currentuser = pageUser.followers.indexOf(curr_user);
            if(currentuser>-1){
                $('#followUnfollow').text('Follow');
                pageUser.followers.splice(currentuser, 1);
                fillfollowers();    
            }
		}
		//Send data to server to follow/unfollow user
	});
});

basicInfo();

function basicInfo()
{
    best = 0;

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

    $('#left').prepend(myhtml);
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


fillfollowers();
function fillfollowers()
{
    let f = document.getElementsByClassName("personcontainter")[0];
    let follower;
    let result = '';
    for (follower of pageUser.followers)
    {
        result+=`<div class="person">
        <div class="personname">${follower.username}</div>
        <div class="personis">@${follower.username}</div>
    </div>`;
    }
    f.innerHTML = result;
}

following();
function following()
{
    let f = document.getElementsByClassName("personcontainter")[1];
    let followin;
    let result = '';
    for (followin of pageUser.following)
    {
        result+=`<div class="person">
        <div class="personname">${followin.username}</div>
        <div class="personis">@${followin.username}</div>
    </div>`;
    }
    f.innerHTML = result;
}