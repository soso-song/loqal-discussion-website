"use strict"
// current user is global
let user;
const params = new URLSearchParams(window.location.search)
let user_id = params.get('edit_for');



const singleProfile = document.querySelector('#single_profile');
const allUsers = document.querySelector('#all_users');
const noUser = document.querySelector('#no_user');
singleProfile.style.display = 'none';
noUser.style.display = 'none';

const editForm = document.querySelector("#editForm");
editForm.addEventListener('submit', save_all);
editForm.addEventListener('change', update_photo);

const searchUserForm = document.querySelector('#searchUserForm');
searchUserForm.addEventListener('submit', search_user);

if (user_id == null){
	load_all_users();
}else{
	user = users[user_id];
	load_user_profile(user);
}

function load_all_users(){
	// TODO: get users from database
	for(const user of users){
		const user_table = document.createElement("table");
		user_table.className = 'profiles';
		user_table.id = 'profiles';

		const username_row = document.createElement("tr");
		username_row.innerHTML = "<td class='info'><strong>Username</strong></td><td>" + user.username + "</td>";
		user_table.appendChild(username_row);

		const disname_row = document.createElement("tr");
		disname_row.innerHTML = "<td class='info'><strong>Display name</strong></td><td>" + user.display_name + "</td>";
		user_table.appendChild(disname_row);

		const photo_row = document.createElement("tr");
		photo_row.innerHTML = "<td class='info'><strong>Photo</strong></td><td><img class='prof_pic' src='" + user.photo_src + "'></td>";
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
	// TODO: get users from database
	for(u of users){
		if(u.username === keyword || u.email === keyword){
			user = u;
			load_user_profile(user);
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

function load_user_profile(user){
	singleProfile.style.display ='inline';
	allUsers.style.display = 'none';
	noUser.style.display = 'none';

	const see_profile_btn = document.querySelector("#see_profile");
	const html = "../user/userprofile.html?user_id=" + user.id;
	see_profile_btn.setAttribute("onclick", " location.href='" + html + "' ");

	document.querySelector('#in_username').value = user.username;
	document.querySelector('#in_email').value = user.email;
	document.querySelector('#in_disname').value = user.display_name;
	document.querySelector('#in_password').value = user.password;

	// display multiple tags
	const tag_cell = document.getElementById("tags");
	tag_cell.innerHTML = '';
	const user_tags = [];
	for (const tag_index of user.tag_list){
		user_tags.push(tags[tag_index]);
	}
	// making adding tag options
	let html_tag = '';
	for(const curr_tag of user_tags){
		html_tag += '<select class="html_tag">';
		for(const tag_elem of tags){
			if(curr_tag.id == tag_elem.id){
				html_tag += "<option value="+tag_elem.id+" selected>"+tag_elem.name +"</option>";	
			}else{
				html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";	
			}
		}
		html_tag += "<option value=-1>remove</option>";
		html_tag += '</select>';
	}
	tag_cell.innerHTML = "<input type='submit' value='Add Tag' onclick='add_tag()'>";
	tag_cell.innerHTML += html_tag;

	// display picture
	const photo = document.querySelector('#single_photo');
	photo.setAttribute("src", user.photo_src);

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
	if (user.is_admin){
		admin_html = "<select id='admin_select'><option value='is_admin'>Admin</option><option value='not_admin'>Regular User</option></select>";
	}else{
		admin_html = "<select id='admin_select'><option value='not_admin'>Regular User</option><option value='is_admin'>Admin</option></select>";
	}
	document.querySelector('#account_type').innerHTML = admin_html;
}

function add_tag(){
	const tag=document.getElementById("tags");
	let html_tag = '<select id="html_tag">';
	for(const tag_elem of tags){
		html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";	
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
	const new_password = document.querySelector("#in_password").value;

	let hasError = false;
	const username_error = document.querySelector('#username_error')
	if(new_username.length < 1){
		username_error.innerHTML = 'Username cannot be empty';
		hasError = true;
	} else {
		for (let i = 0; i < users.length; i++) {
			// TODO: getting user's information from database
            if((users[i].username === new_username) && (user.id != users[i].id)){
                username_error.innerHTML = 'Username already taken';
                hasError = true;
                break;
            } else {
            	username_error.innerHTML = '';
            }
        }
	}

	const disname_error = document.querySelector('#disname_error');
	if (new_disname.length < 1) {
        disname_error.innerHTML = 'Display Name cannot be empty';
        hasError = true;
    } else{
    	disname_error.innerHTML = '';
    }

    const password_error = document.querySelector('#password_error');
    if (new_password.length < 1) {
        password_error.innerHTML = 'Password cannot be empty';
        hasError = true;
    } else{
    	password_error.innerHTML = '';
    }

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
	// TODO: upload new information of user into database
	user.username = new_username;
	user.email = new_email;
	user.display_name = new_disname;
	user.password = new_password
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
	user.tag_list = tag_ids;
	// save status
	if (document.querySelector("#flag_select").value === 'is_flagged'){
		user.is_flagged = true;
	}else{
		user.is_flagged = false;
	}

	// save status
	if (document.querySelector("#admin_select").value === 'is_admin'){
		user.is_admin = true;
	}else{
		user.is_admin = false;
	}
	window.alert("Changed saved.");
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

