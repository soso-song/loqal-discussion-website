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
userEditForm.addEventListener('change', update_photo);


//load_profile(user);
function load_profile(user){
    document.querySelector('#userName').value = user.username;
    document.querySelector('#displayName').value = user.displayname;
    document.querySelector('#email').value = user.email;
    //document.querySelector('#password').value = user.password;

    // display picture
    const photo = document.querySelector('#prof_pic');
    photo.setAttribute('src', user.photo_src);

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

function update_photo(e){
    const photo_in = e.target;
    if(photo_in.files && photo_in.files[0]){
        var reader = new FileReader();
        let ee;
        reader.onload = function (ee) {
            $('#prof_pic').attr('src', ee.target.result)
                };

        reader.readAsDataURL(photo_in.files[0]);
    }
    // TODO: upload image to server
}