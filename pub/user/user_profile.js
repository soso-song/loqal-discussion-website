"use strict"

let pageUser;
let currentUser;

getPageUser()

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
    getUserTags();
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

});

function toggleFollowButt(){
    const currentState = $('#followUnfollow').text();
    if(currentState === 'Follow'){
        followUser();
    }else if(currentState === 'Unfollow'){
        unfollowUser();
    }
}

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
        getPageUser();
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
        getPageUser();
        console.log(res) 
    }).catch((error) => {
        console.log(error)
    })
}

function getUserTags(){
    if(pageUser.tags.length>0){
        getTagList(pageUser.tags).then((tags) => {
            let mytags = '';
            for(let i=0; i < tags.length; i++){
                mytags+=`<span class="tag">${tags[i]}</span>`;
            }
    
            let myhtml = `<h3>Tags</h3> ${mytags}`
    
            $('#mytags').html(myhtml);
        })
    }
}


// Loads left hand side information about the user
function basicInfo(){

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

    let userph = '/images/staticphoto.jpg'

    if(pageUser.image_url !== ''){
       userph = pageUser.image_url
    }
    
    let myhtml = `<h2>${pageUser.displayname}</h2>
    <h3>@${pageUser.username}</h3>
    <img src="${userph}" alt="Main Profile Pic" id="profilePic">                            
    `

    if(false){
        myhtml += `<div>
        <h3>Best Answers</h3>
        </div>`
    }

    if(pageUser._id == currentUser._id){
        myhtml += `<a class="sidebutton" href="../user/edit_profile.html">Edit Profile</a>`
    }

    const reportLink = "../report/report.html?type=u&target_id="+pageUser._id+"&user_id="+currentUser._id+"&back_url="+window.location.href;


    myhtml += `<a href="javascript:void(0);" onclick='toggleFollowButt()' id="followUnfollow">Follow</a>`
    myhtml += `<a href="${reportLink}" id="reportuser">Report This User</a>`

    $('#userinfo').html(myhtml);
}

// Displays all questions asked by user
function getAllQUser(){

    const url = '/users/questions/' + pageUser._id;

    let wanted = document.getElementsByClassName("listcontainter")[0];
    let totalString = ''
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

            totalString+=`<div class="shortquestion">
                <a class="squestion" href="../answer/answer.html?question_id=${currQ._id}">${currQ.title}</a>
                <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${currQ.user}">${pageUser.username}</a> - ${readableDate(currQ.time)} -  ${numA} Answers - ${resolve}</div>
            </div>`;
        });

        wanted.innerHTML = totalString;
    }).catch((error) => {
        console.log(error)
    })
}

// Displays all questions asked by user
function getAllAnswer(){

    const url = '/users/answers/' + pageUser._id;

    let wanted = document.getElementsByClassName("listcontainter")[1];
    let totalString = ''

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
                totalString+=`	<div class="shortquestion">
                <a class="sanswer" href="../answer/answer.html?question_id=${currQ._id}">${currA.content}</a>
                <div class="sinfo">In reply to <a href="../answer/answer.html?question_id=${currQ._id}">${currQ.title}</a> - ${readableDate(currA.time)}</div>
                </div>`;
                answerCount += 1;
            });
        });
        let headings = document.getElementsByClassName("userheading");
        headings[1].innerHTML=`Answers (${answerCount})`;
        wanted.innerHTML = totalString;
        
    }).catch((error) => {
        console.log(error)
    })
}

function getFollowers()
{
    let followerContainer = document.getElementsByClassName("personcontainter")[0];
    followerContainer.innerHTML = ''
    $("#followerbutt").text(`Followers (${pageUser.followers.length})`);
    for (let follower of pageUser.followers)
    {
        getUserInfo(follower).then((myUser) => {
            followerContainer.innerHTML+=`<div class="person">
            <div class="personname"><a href="../user/user_profile.html?user_id=${follower}">${myUser.displayname}</a></div>
            <div class="personid">@${myUser.username}</div>
            </div>`;
        })
    }
}

function getFollowing()
{
    let followingContainer = document.getElementsByClassName("personcontainter")[1];
    followingContainer.innerHTML = ''
    $("#followingbutt").text(`Followers (${pageUser.following.length})`);
    for (let following of pageUser.following)
    {
        getUserInfo(following).then((myUser) => {
            followingContainer.innerHTML+=`<div class="person">
            <div class="personname"><a href="../user/user_profile.html?user_id=${following}">${myUser.displayname}</a></div>
            <div class="personid">@${myUser.username}</div>
            </div>`;
        })
    }
}