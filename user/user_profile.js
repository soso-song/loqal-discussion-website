"use strict"

let pageUser = curr_user;

// Check if there is input user id
const params = new URLSearchParams(window.location.search)
let user_id = params.get('user_id');
if (user_id != null){
    pageUser = users[user_id];
}

// List of followers and following hardcoded for now
// Will get these from backend later
pageUser.followers = [users[1]];
pageUser.following = [users[3]];

// Sets the variables for reporting a user
document.querySelector('#reportuser').href = "../report/report.html?type=u&target_id="+pageUser.id+"&user_id="+curr_user.id+"&back_url="+window.location.href;

$(document).ready(function() {
    // Handles tab switches
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
            getFollowers(); 
		}else if(currentState === 'Unfollow'){
            const currentuser = pageUser.followers.indexOf(curr_user);
            if(currentuser>-1){
                $('#followUnfollow').text('Follow');
                pageUser.followers.splice(currentuser, 1);
                getFollowers();    
            }
		}
		//Send data to server to follow/unfollow user
	});
});

basicInfo();
getAllQandACount();
getAllQUser();
getAllAnswer();
getFollowers();
getFollowing();

// Loads left hand side information about the user
function basicInfo(){
    let mytags = ''
    for(let t of pageUser.tag_list)
    {
        mytags+=`<span class="tag">${tags[t].name}</span>`
    }

    // Finding the number of best answers user have
    let best = 0;
    for(let a of answers)
    {
        if(a.is_best && a.user_id==pageUser)
        {
            best ++;
        }
    }
    
    let myhtml = `<h2>${pageUser.display_name}</h2>
    <h3>@${pageUser.username}</h3>
    <img src="${pageUser.photo_src}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3> ${mytags}</div>
    <div>
    <h3>${best} Best Answers</h3>
    </div>

    </div>`

    $('#left').prepend(myhtml);
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
    headings[0].innerHTML=`Your Recent Questions (${qNum})`;
    headings[1].innerHTML=`Your Recent Answers (${aNum})`;
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

    let wanted = document.getElementsByClassName("listcontainter")[0];
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
    
    let wanted = document.getElementsByClassName("listcontainter")[1];
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

function getFollowers()
{
    let followerContainer = document.getElementsByClassName("personcontainter")[0];
    let result = '';
    for (let follower of pageUser.followers)
    {
        result+=`<div class="person">
        <div class="personname">${follower.username}</div>
        <div class="personis">@${follower.username}</div>
        </div>`;
    }
    followerContainer.innerHTML = result;
}

function getFollowing()
{
    let followingContainer = document.getElementsByClassName("personcontainter")[1];
    let result = '';
    for (let following of pageUser.following)
    {
        result+=`<div class="person">
        <div class="personname">${following.username}</div>
        <div class="personis">@${following.username}</div>
        </div>`;
    }
    followingContainer.innerHTML = result;
}