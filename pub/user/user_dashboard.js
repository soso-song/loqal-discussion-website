"use strict"

let pageUser = curr_user;
let backendUser = null;

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

function getCurrentUser() {
    const url = '/currentuser';

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
        backendUser = json
        basicInfo();
        getNotice();
        getAllQ();
        getAllFollowingQ();
    }).catch((error) => {
        console.log(error)
    })
}

getCurrentUser();

// Loads left hand side information about the user
function basicInfo(){
    let mytags = ''
    let t;
    for(t of backendUser.tags)
    {
        mytags+=`<span class="tag">${tags[t].name}</span>`
    }

    let userph = '/images/staticphoto.jpg'

    if(backendUser.image_url !== ''){
        userph = backendUser.image_url
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];
    
    let myhtml = `
    <div id="dashheading">User Dashboard</div>
    <div id="dashname">Welcome back ${backendUser.displayname}<br><br>
    We hope you are having a great ${dayName}
    
    </div>
    `
    myhtml += `<div id="notification"></div>`

    if(false){
        myhtml += `
        <img src="${userph}" alt="Main Profile Pic" id="profilePic">	
        <div id="mytags">
        <h3>Tags</h3>${mytags}
        </div>`
    }

    myhtml += `<a class="sidebutton" href="../question/question.html">Ask a Question</a>`

    myhtml += `<a class="sidebutton" href="../user/user_profile.html?user_id=${backendUser._id}">Your Profile</a>`

    if(backendUser.isAdmin){
        myhtml += `<a class="sidebutton" id="adminbutt" href="../admin/admin_dashboard.html">Admin Dashboard</a>`  
    }

    $('#left').prepend(myhtml);
}

// Loads the latest notification
function getNotice(){
    const url = '/notice';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            //console.log('No notice')
       }         
    })
    .then((json) => {
        if(json){
            let myhtml =`
            <h4>Latest Notice</h4>
            <div id="noticetitle">${json.title}</div>
            <div id="noticedesc">${json.content}</div>
            <div id="noticedate">Posted on ${readableDate(json.time)}, 2020</div>`
            $('#notification').prepend(myhtml);    
        }else{
            let myhtml =`
            <div id="noticetitle">No New Notice</div>`
            $('#notification').prepend(myhtml);
        }
    }).catch((error) => {
        //console.log(error)
    })
}

// Displays the list of all questions which includes the tags this user follows
function getAllQ(){
    const wanted = document.getElementById('everyonequestionlist');

    const url = '/questions';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            //
       }                
    })
    .then((json) => {
        json.forEach(function(q) {

            let resolve ='Unresolved';
            if (q.isResolved == true)
            {
                resolve = 'Resolved';
            }

            const numA = q.answers.length;

            getUserInfo(q.user).then((myUser) => {
                wanted.innerHTML+=`<div class="shortquestion">
                <a class="squestion" href="../answer/answer.html?question_id=${q._id}">${q.title}</a>
                <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${q.user}">${myUser.displayname}</a> - ${readableDate(q.time)} - ${numA} Answers - ${resolve}</div>
                </div>`;
            })

        });
    }).catch((error) => {
        console.log(error)
    })
}

function getAllFollowingQ(){
    const wanted = document.getElementById('followquestionlist');
    
    const url = '/questions/following';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json()
       } else {
            //
       }                
    })
    .then((json) => {
        json.forEach(function(q) {
            
            const numA = q.answers.length;

            let resolve ='Unresolved';
            if (q.isResolved == true)
            {
                resolve = 'Resolved';
            }

            getUserInfo(q.user).then((myUser) => {
                wanted.innerHTML+=`<div class="shortquestion">
                <a class="squestion" href="../answer/answer.html?question_id=${q._id}">${q.title}</a>
                <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${q.user}">${myUser.displayname}</a> - ${readableDate(q.time)} - ${numA} Answers - ${resolve}</div>
                </div>`;
            })

        });
    }).catch((error) => {
        console.log(error)
    })
}