"use strict"

let backendUser = null;

function getCurrentUser() {
    const url = '/users/current';

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
    document.querySelector('#userName').value = user.username;
    document.querySelector('#displayName').value = user.displayname;
    document.querySelector('#email').value = user.email;

    // display picture
    const photo = document.querySelector('#prof_pic');
    if(user.image_url !== ''){
        photo.setAttribute('src', user.image_url);
    }else{
        photo.setAttribute('src', '/images/staticphoto.jpg');
    }

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
    $('#changeerror').text(errMessage);

    const new_username = document.querySelector('#userName').value;
    const new_display_name = document.querySelector('#displayName').value;
    const new_email = document.querySelector('#email').value;

    if (new_username.length < 1) {
        errMessage = 'Username cannot be empty';
        hasError = true;
    }

    if (new_display_name.length < 1) {
        errMessage = 'Display Name cannot be empty';
        hasError = true;
    }

    if (new_email.length < 1) {
        errMessage = 'E-mail cannot be empty';
        hasError = true;
    }

    if(!hasError){

        const url = '/users'

        const data = {
            username: new_username,
            displayname: new_display_name,
            email: new_email
        }

        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
		.then(function(res) {
			if (res.redirected) {
				window.location.href = res.url;
			}

			if (res.status === 200) {
				//console.log(res.statusText)
			} else {
                $('#changeerror').text('Could not update the profile');
			}
		}).catch((error) => {
			//console.log(error)
		})
	}else{
        $('#changeerror').text(errMessage);
    }
}

function new_upload(e){
    e.preventDefault();
    
    // Check to see a file was selected
    if( document.getElementById("imagefield").files.length > 0 ){
    
        const url = "/users/picture";

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
}