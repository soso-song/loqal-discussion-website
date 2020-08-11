"use strict"

let currentuser;
const params = new URLSearchParams(window.location.search)
let user_id = params.get('edit_for');
let user;	// user which admin is viewing he's profile
let users;	// all users
let all_tags = [];	// all existing tags



const singleProfile = document.querySelector('#single_profile');
const allUsers = document.querySelector('#all_users');
const noUser = document.querySelector('#no_user');


const editForm = document.querySelector("#editForm");
editForm.addEventListener('submit', save_all);
editForm.addEventListener('change', update_photo);

const searchUserForm = document.querySelector('#searchUserForm');
searchUserForm.addEventListener('submit', search_user);

checkAdminUser().then((res) => {
	if (res){
		currentuser = res;
		if (user_id == null){
			getAllUsers();
		} else{
			// TODO: get user from database
			getSingleUser();
		}
	}
})
.catch((error) => {
	console.log(error);
})


function getSingleUser(){
	const url = '/users/' + user._id;
	fetch(url)
	.then((res) => {
		if (res.status === 200) {
	          	return res.json();
	   	}
	})
	.then((json) => {
		user = json;
		if(all_tags.length == 0){
			getPopularTags();
		}else {
			load_user_profile();	
		}
		
	})
	.catch((error) => {
		console.log(error)
	})
}

function getAllUsers(){
	fetch('/allUsers')
	.then((res) => {
		if (res.status === 200) {
	       	return res.json();
	   	}
	})
	.then((json) => {
		users = json;
		load_all_users();
	})
	.catch((error) => {
		console.log(error)
	})
}


function load_all_users(){
	singleProfile.style.display = 'none';
	noUser.style.display = 'none';
	allUsers.style.display = 'inline';

	allUsers.innerHTML = "<div class='headline'>All Users</div>";

	for(const myuser of users){
		const user_table = document.createElement("table");
		user_table.className = 'profiles';
		user_table.id = 'profiles';

		const username_row = document.createElement("tr");
		username_row.innerHTML = "<td class='info'><strong>Username</strong></td><td>" + myuser.username + "</td>";
		user_table.appendChild(username_row);

		const disname_row = document.createElement("tr");
		disname_row.innerHTML = "<td class='info'><strong>Display name</strong></td><td>" + myuser.displayname + "</td>";
		user_table.appendChild(disname_row);

		const photo_row = document.createElement("tr");
		if(myuser.image_url !== ''){
			photo_row.innerHTML = "<td class='info'><strong>Photo</strong></td><td><img class='prof_pic' src='" + myuser.image_url + "'></td>";
	    }else{
	    	photo_row.innerHTML = "<td class='info'><strong>Photo</strong></td><td><img class='prof_pic' src='/images/staticphoto.jpg'></td>";
	    }
		user_table.appendChild(photo_row);

		allUsers.appendChild(user_table);
	}
}


function search_user(e) {
	e.preventDefault();

	const keyword = searchUserForm.elements['keyword'].value;
	let u;
	if (keyword === ''){
		singleProfile.style.display ='none';
		noUser.style.display ='none';
		allUsers.style.display = 'inline';
		return;
	}
	let found_user = false;
	for(u of users){
		if(u.username === keyword || u.email === keyword){
			user = u;
			getSingleUser();
			found_user = true;
			break;
		}
	}
	if(found_user === false){
		singleProfile.style.display ='none';
		allUsers.style.display ='none';
		noUser.style.display = 'inline';
	}
}

function load_user_profile(){
	singleProfile.style.display ='inline';
	allUsers.style.display = 'none';
	noUser.style.display = 'none';

	const see_profile_btn = document.querySelector("#see_profile");
	const html = "../user/user_profile.html?user_id=" + user._id;
	see_profile_btn.setAttribute("href", html);
	$(document).on('click', '#see_profile', function(e){ 
	    e.preventDefault(); 
	    window.open(see_profile_btn.href, '_blank');
	});

	document.querySelector('#in_username').value = user.username;
	document.querySelector('#in_email').value = user.email;
	document.querySelector('#in_disname').value = user.displayname;
	// document.querySelector('#in_password').value = user.password;

	
	// display picture
	const photo = document.querySelector('#single_photo');
	// photo.setAttribute("src", user.photo_src);
	if(user.image_url !== ''){
        photo.setAttribute('src', user.image_url);
    }else{
        photo.setAttribute('src', '/images/staticphoto.jpg');
    }
    photo.setAttribute('class', 'prof_pic');

	// show if flagged user
	let flag_html;
	if (user.is_flagged){
		flag_html = "<select id='flag_select'><option value='is_flagged'>Flagged</option><option value='not_flagged'>Normal</option></select>";
	}else{
		flag_html = "<select id='flag_select'><option value='not_flagged'>Normal</option><option value='is_flagged'>Flagged</option></select>";
	}
	document.querySelector('#status').innerHTML = flag_html;

	// show if user if admin
	let admin_html;
	if (user.isAdmin){
		admin_html = "<select id='admin_select'><option value='is_admin'>Admin</option><option value='not_admin'>Regular User</option></select>";
	}else{
		admin_html = "<select id='admin_select'><option value='not_admin'>Regular User</option><option value='is_admin'>Admin</option></select>";
	}
	document.querySelector('#account_type').innerHTML = admin_html;

	// display multiple tags
	const tag_cell = document.getElementById("tags");
	tag_cell.innerHTML = '';
	getTagList(user.tags).then((user_tags) => {
		// making adding tag options
		let html_tag = '';
		for(const curr_tag of user_tags){
			html_tag += '<select class="html_tag">';
			for(const tag_elem of all_tags){
				if(curr_tag == tag_elem.name){
					html_tag += "<option value="+tag_elem._id+" selected>"+tag_elem.name +"</option>";	
				}else{
					html_tag += "<option value="+tag_elem._id+">"+tag_elem.name +"</option>";	
				}
			}
			html_tag += "<option value=-1>remove</option>";
			html_tag += '</select>';
		}
		tag_cell.innerHTML = "<input type='submit' value='Add Tag' onclick='add_tag()'>";
		tag_cell.innerHTML += html_tag;
	})
}

// get the list of tags sorted in decreasing number of usage
function getPopularTags(){
  	const url = '/popularTags';

	fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((json) => {
		all_tags = json;
		load_user_profile();
	})
	.catch((error) => {
		console.log(error)
	})
}



function add_tag(){
	const tag=document.getElementById("tags");
	let html_tag = '<select class="html_tag">';
	for(const tag_elem of all_tags){
		html_tag += "<option value="+tag_elem._id+">"+tag_elem.name +"</option>";	
	}
	html_tag += "<option value=-1>remove</option>";
	html_tag += '</select>';
	// save the index of each assigned option
	let options = tag.children;
	let selected_index = []
	for (let i = 1; i < options.length; i++) {
	  selected_index.push(options[i].selectedIndex);
	}
	// add new variable
	tag.innerHTML += html_tag;
	// re-select selected options
	for (let i = 1; i < options.length-1; i++) {
	  options[i].selectedIndex = selected_index[i-1];
	}
}


function save_all(e){
	e.preventDefault();
	
	const new_username = document.querySelector("#in_username").value;
	const new_email = document.querySelector("#in_email").value;
	const new_disname = document.querySelector("#in_disname").value;
	// const new_password = document.querySelector("#in_password").value;

	let hasError = false;
	const username_error = document.querySelector('#username_error')
	if(new_username.length < 1){
		username_error.innerHTML = 'Username cannot be empty';
		hasError = true;
	}
	// TODO(?): check duplicates username
	// else {
	// 	for (let i = 0; i < users.length; i++) {
	// 		// TODO: getting user's information from database
 //            if((users[i].username === new_username) && (user.id != users[i].id)){
 //                username_error.innerHTML = 'Username already taken';
 //                hasError = true;
 //                break;
 //            } else {
 //            	username_error.innerHTML = '';
 //            }
 //        }
	// }

	const disname_error = document.querySelector('#disname_error');
	if (new_disname.length < 1) {
        disname_error.innerHTML = 'Display Name cannot be empty';
        hasError = true;
    } else{
    	disname_error.innerHTML = '';
    }

    // const password_error = document.querySelector('#password_error');
    // if (new_password.length < 1) {
    //     password_error.innerHTML = 'Password cannot be empty';
    //     hasError = true;
    // } else{
    // 	password_error.innerHTML = '';
    // }

    const email_error = document.querySelector('#email_error');
    if (new_email.length < 1) {
        email_error.innerHTML = 'E-mail cannot be empty';
        hasError = true;
    } else {
    	email_error.innerHTML = '';
    }

    if (hasError){
    	return;
    }
	
	// user.username = new_username;
	// user.email = new_email;
	// user.displayname = new_disname;
	// user.password = new_password;

	// save tags
	const tags = document.querySelectorAll(".html_tag");
	
	const tag_ids = [];
	for (const tag of tags){
		if (tag.value != -1){
			tag_ids.push(tag.value);
		}else{
			tag.parentElement.removeChild(tag);
		}
	}
	// user.tags = tag_ids;
	// // save status
	// if (document.querySelector("#flag_select").value === 'is_flagged'){
	// 	user.isFlagged = true;
	// }else{
	// 	user.isFlagged = false;
	// }

	// // save status
	// if (document.querySelector("#admin_select").value === 'is_admin'){
	// 	user.isAdmin = true;
	// }else{
	// 	user.isAdmin = false;
	// }

	const data = {
		displayname: new_disname,
		username: new_username,
		email: new_email,
		tags: tag_ids,
		isFlagged: document.querySelector("#flag_select").value === 'is_flagged',
		isAdmin: document.querySelector("#admin_select").value === 'is_admin'
	}

	updateUser(data);
}


function update_photo(e){
	const photo_in = e.target;
	if(photo_in.files && photo_in.files[0]){
		const reader = new FileReader();
		let ee;
       	reader.onload = function (ee) {
            $('#single_photo').attr('src', ee.target.result)
                };

        reader.readAsDataURL(photo_in.files[0]);

	}
}

function updateUser(data){

	const url = '/adminEditUser/' + user._id;

	const request = new Request(url, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});

	const username_error = document.querySelector('#username_error');

	fetch(request)
	.then(function(res) {
		if(res.status == 403){
			alert('No permission to edit');
		} else if(res.status == 400) {
			username_error.innerHTML = 'Username already taken';
			document.querySelector("#in_username").value = user.username;
		} else {
			username_error.innerHTML = '';
			alert('Changes saved!');
			getAllUsers();
		}
	}).catch((error) => {
		console.log(error);
	})
}

function new_upload(e){
    e.preventDefault();
    
    // Check to see a file was selected
    if( document.getElementById("imagefield").files.length > 0 ){
    
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
}
