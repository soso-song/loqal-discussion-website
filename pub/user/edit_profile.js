"use strict"
// We will get the logged in user from the backend in future

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
        load_profile(json);
    }).catch((error) => {
        console.log(error)
    })
}

getCurrentUser()
//const user = curr_user;

const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);


const imageForm = document.querySelector('#imageForm');
imageForm.addEventListener('submit',new_upload);

//load_profile(user);
function load_profile(user){
    console.log(user);
    document.querySelector('#userName').value = user.username;
    document.querySelector('#displayName').value = user.displayname;
    document.querySelector('#email').value = user.email;
    //document.querySelector('#password').value = user.password;

    // display picture
    const photo = document.querySelector('#prof_pic');
    photo.setAttribute('src', user.image_url);

    // show if flagged user
    if (user.isFlagged){
        document.querySelector('#status').value = 'Flagged';
    }

    // show if user if admin
    if (user.isAdmin){
        document.querySelector('#acct_type').value = 'Admin';
    }
}

function edit(e){
    e.preventDefault();
    
    let hasError = false;
    let errMessage = '';

    const new_username = document.querySelector('#userName').value;
    const new_display_name = document.querySelector('#displayName').value;
	const new_password = document.querySelector('#password').value;
    const new_email = document.querySelector('#email').value;

    if (new_username.length < 1) {
        errMessage = 'Username cannot be empty';
        hasError = true;
    }else{
        for (let i = 0; i < users.length; i++) {
            if((users[i].username == new_username) && (curr_user.id != users[i].id)){
                errMessage = 'Username already taken';
                hasError = true;
            }
        }
    }

    if (new_display_name.length < 1) {
        errMessage = 'Display Name cannot be empty';
        hasError = true;
    }

    if (new_password.length < 1) {
        errMessage = 'Password cannot be empty';
        hasError = true;
    }

    if (new_email.length < 1) {
        errMessage = 'E-mail cannot be empty';
        hasError = true;
    }

    if(!hasError){
        user.username = new_username;
        user.display_name = new_display_name;
        user.password = new_password;
        user.email = new_email;

        // At theis point data is sent to backend to update user info
        window.alert("Your profile has been changed");
        window.location.href = "user_profile.html";
	}else{
        window.alert(errMessage);
    }
}

function new_upload(e){
    e.preventDefault();

    const url = "/images";

    // The data we are going to send in our request
    const imageData = new FormData(e.target);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                getCurrentUser()
                console.log("image successfully added");
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("image error added");
            }
        })
        .catch(error => {
            console.log(error);
        });
}