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
    
    let myhtml = `<h2> Welcome Back ${backendUser.displayname}</h2>
    <img src="${userph}" alt="Main Profile Pic" id="profilePic">							
    <div id="mytags">
    <h3>Tags</h3>${mytags}</div>
    </div>`

    myhtml += `<a class="sidebutton" href="../user/user_profile.html?user_id=${backendUser._id}">Your Profile</a>`
    myhtml += `<a class="sidebutton" href="../user/edit_profile.html">Edit Profile</a>`

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
            const json = res.json()
            let myhtml =`
            <div id="noticetitle">${json.title}</div>
            <div id="noticedesc">${json.content}</div>
            <div id="noticedate">Posted on ${readableDate(json.time)}, 2020</div>`
            $('#notification').prepend(myhtml);
       } else {
            let myhtml =`
            <div id="noticetitle">No New Notice</div>`
            $('#notification').prepend(myhtml);
            //console.log("Could not get any notice")
       }                
    })
    .catch((error) => {
        //console.log("Could not get any notice")
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
            let numA = 0;
            for(let a of answers)
            {
                if(a.question_id == q.id)
                {
                    numA++;
                }
            }
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
            let numA = 0;
            for(let a of answers)
            {
                if(a.question_id == q.id)
                {
                    numA++;
                }
            }
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