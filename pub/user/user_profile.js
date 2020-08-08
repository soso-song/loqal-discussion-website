"use strict"

let pageUser;
let currentUser;

getPageUser()
// Check if there is input user id


function getPageUser() {
    let url = '/currentuser';

    const params = new URLSearchParams(window.location.search)
    let user_id = params.get('user_id');
    if (user_id != null){
        url = '/users/'+user_id;
    }

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            alert('Could not get current user')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        pageUser = json
        if(user_id != null){
            getCurrentUser()
        }else{
            currentUser = pageUser
            setUpPage()
        }
    }).catch((error) => {
        console.log(error)
    })
}

function getCurrentUser() {
    const url = '/currentuser'

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            alert('Could not get current user')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        currentUser = json
        setUpPage()
    }).catch((error) => {
        console.log(error)
    })
}

function setUpPage(){
    basicInfo();
    //getAllQandACount();
    //document.querySelector('#reportuser').href = "../report/report.html?type=u&target_id="+pageUser.id+"&user_id="+curr_user.id+"&back_url="+window.location.href;

    getAllQUser();
    getAllAnswer();
    getFollowers();
    getFollowing();
    if(pageUser._id == currentUser._id){
        $('#followUnfollow').css("display", "none");
    }else{
        $('#followUnfollow').css("display", "block");
    }

    //sets initial state for follower button
    for(let i=0; i<pageUser.followers.length; i++)
    {
        if (pageUser.followers[i]==currentUser._id)
        {
            $('#followUnfollow').text('Unfollow');
        }
    }
}

// List of followers and following hardcoded for now
// Will get these from backend later
//pageUser.followers = [users[1]];
//pageUser.following = [users[3]];

// Sets the variables for reporting a user


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

    /*
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
    */
   $("#followUnfollow").click(function(){
    const currentState = $('#followUnfollow').text();
    if(currentState === 'Follow'){
        //$('#followUnfollow').text('Unfollow');
        followUser();
        //getFollowers(); 
    }else if(currentState === 'Unfollow'){
        unfollowUser();
        /*
        const currentuser = pageUser.followers.indexOf(curr_user);
        if(currentuser>-1){
            $('#followUnfollow').text('Follow');
            pageUser.followers.splice(currentuser, 1);
            getFollowers();    
        }
        */
    }
    //Send data to server to follow/unfollow user
    });
});

function followUser(){
    const url = '/follow/'+pageUser._id;
	
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    fetch(request)
    .then(function(res) {
        $('#followUnfollow').text('Unfollow');
        //getFollowers(); 
        console.log(res) 
    }).catch((error) => {
        console.log(error)
    })
}

function unfollowUser(){
    const url = '/unfollow/'+pageUser._id;
	
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    fetch(request)
    .then(function(res) {
        $('#followUnfollow').text('Follow');
        //getFollowers(); 
        console.log(res) 
    }).catch((error) => {
        console.log(error)
    })
}


// Loads left hand side information about the user
function basicInfo(){
    let mytags = ''
    for(let t of pageUser.tags)
    {
        mytags+=`<span class="tag">${t.name}</span>`
    }

    // Finding the number of best answers user have
    /*
    let best = 0;
    for(let a of answers)
    {
        if(a.is_best && a.user_id==pageUser)
        {
            best ++;
        }
    }
    */
    
    let myhtml = `<h2>${pageUser.displayname}</h2>
    <h3>@${pageUser.username}</h3>
    <img src="${pageUser.image_url}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3> ${mytags}</div>
    <div>
    <h3> Best Answers</h3>
    </div>

    </div>`

    $('#left').prepend(myhtml);
}

// Displays all questions asked by user
function getAllQUser(){

    const url = '/users/questions/' + pageUser._id;

    let wanted = document.getElementsByClassName("listcontainter")[0];

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            alert('Could not get questions')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        //console.log(json.username)
        let headings = document.getElementsByClassName("userheading");
        headings[0].innerHTML=`Questions (${json.length})`;

        json.forEach(function(currQ) {
            let resolve ='Unresolved';
            if (currQ.isResolved)
            {
                resolve = 'Resolved';
            }

            let numA = currQ.answers.length;

            wanted.innerHTML+=`<div class="shortquestion">
                <a class="squestion" href="../answer/answer.html?question_id=${currQ._id}">${currQ.title}</a>
                <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${currQ.user}">${currQ.user}</a> - ${currQ.time} -  ${numA} Answers - ${resolve}</div>
            </div>`;
        });
    }).catch((error) => {
        console.log(error)
    })
}

// Displays all questions asked by user
function getAllAnswer(){

    const url = '/users/answers/' + pageUser._id;

    let wanted = document.getElementsByClassName("listcontainter")[1];
    let answerCount = 0;
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            alert('Could not get answers')
       }                
    })
    .then((json) => { 
        json.forEach(function(currQ) {
            currQ.answers.forEach(function(currA) {
                wanted.innerHTML+=`	<div class="shortquestion">
                <a class="sanswer" href="../answer/answer.html?question_id=${currQ._id}">${currA.content}</a>
                <div class="sinfo">In reply to <a href="../answer/answer.html?question_id=${currQ._id}">${currQ.title}</a> - ${currA.time}</div>
                </div>`;
                answerCount += 1;
            });
        });
        let headings = document.getElementsByClassName("userheading");
        headings[1].innerHTML=`Answers (${answerCount})`;
        
    }).catch((error) => {
        console.log(error)
    })
}

function getFollowers()
{
    let followerContainer = document.getElementsByClassName("personcontainter")[0];
    let result = '';
    for (let follower of pageUser.followers)
    {
        result+=`<div class="person">
        <div class="personname"><a href="../user/user_profile.html?user_id=${follower}">${follower}</a></div>
        <div class="personid">@${follower}</div>
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
        <div class="personname"><a href="../user/user_profile.html?user_id=${following}">${following}</a></div>
        <div class="personid">@${following}</div>
        </div>`;
    }
    followingContainer.innerHTML = result;
}