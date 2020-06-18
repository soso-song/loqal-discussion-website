// current user is global
let user;

const searchUserForm = document.querySelector('#searchUserForm');
searchUserForm.addEventListener('submit', search_user);

function search_user(e) {
	e.preventDefault();
	const keyword = searchUserForm.elements['keyword'].value;
	let u;
	for(u of users){
		if(u.username === keyword || u.email === keyword){
			user = u;
			load_user_profile(user);
			break;
		}
	}
}

function load_user_profile(user){
	document.querySelector('#username').innerHTML = user.username;
	document.querySelector('#edit_username').innerHTML = "<button class='edit'>edit</button>";
	document.querySelector('#email').innerHTML = user.email;
	document.querySelector('#edit_email').innerHTML = "<button class='edit'>edit</button>";
	document.querySelector('#disname').innerHTML = user.display_name;
	document.querySelector('#edit_disname').innerHTML = "<button class='edit'>edit</button>";
	document.querySelector('#password').innerHTML = user.password;
	document.querySelector('#edit_password').innerHTML = "<button class='edit'>edit</button>";
	// display multiple tags
	const tag_names = [];
	for (const tag_index of user.tag_list){
		tag_names.push(tags[tag_index].name);
	}
	document.querySelector('#tags').innerHTML = tag_names;
	document.querySelector('#edit_tags').innerHTML = "<button class='edit'>edit</button>";
	// show if flagged user
	let status = 'Normal'
	if (user.is_flagged){
		document.querySelector('#status').innerHTML = "Flagged";
		document.querySelector('#edit_status').innerHTML = "<button class='flag_user'>Unflag</button>";
	}else{
		document.querySelector('#status').innerHTML = "Normal";
		document.querySelector('#edit_status').innerHTML = "<button class='flag_user'>Flag</button>";
	}
	
}


const profileTable = document.querySelector('#profileTable');
profileTable.addEventListener('click', table_clicked);


function table_clicked(e){
	e.preventDefault();
	if(e.target.classList.contains('flag_user')){
		flag_user(e);
	}else if(e.target.classList.contains('edit')){
		to_edit_form(e);
	}else if(e.target.classList.contains('save')){
		update_info(e);
	}else{
		return;
	}
}

function flag_user(e){
	if (!user.is_flagged){
		user.is_flagged = true;
		document.querySelector('#status').innerHTML = "Flagged";
		document.querySelector('#edit_status').innerHTML = "<button class='flag_user'>Unflag</button>";
	} else{
		user.is_flagged = false;
		document.querySelector('#status').innerHTML = "Normal";
		document.querySelector('#edit_status').innerHTML = "<button class='flag_user'>Flag</button>";
	}
}


function to_edit_form(e){
	e.preventDefault();
	// change cell to edit form
	e.target.parentElement.innerHTML = "<form id='editForm'><input id='new_info' type='text'><input class='save' type='submit' value='save'></form>";
}

profileTable.addEventListener('submit', update_info);

function update_info(e){
	e.preventDefault();
	const type = e.target.parentElement.parentElement.parentElement.children[0].children[0].innerHTML;
	const update_loc = e.target.parentElement.parentElement.parentElement.children[1];
	const new_info = e.target.parentElement.elements['new_info'].value;
	switch(type) {
	  case 'Username':
	    user.username = new_info;
	    update_loc.innerHTML = new_info;
	    break;
	  case 'Email':
	    user.email = new_info;
	    update_loc.innerHTML = new_info;
	    break;
	  case 'Display name':
	    user.display_name = new_info;
	    update_loc.innerHTML = new_info;
	    break;
	  case 'Password':
	    user.password = new_info;
	    update_loc.innerHTML = new_info;
	    break;
	  case 'Tags':
	  	let added = false;
	  	for (const tag in tags){
	  		if(new_info === tag.name){
				user.tag_list.push(tag.id);
				added = true;
				break;
			}
	  	}
	  	if(!added){
	  		const t = new Tag(true, new_info);
	  		tags.push(t);
	  		user.tag_list.push(t.id);
	  	}
	  	const tag_names = [];
		for (const tag_index of user.tag_list){
			tag_names.push(tags[tag_index].name);
		}
	  	update_loc.innerHTML = tag_names;
	    break;
	}
	// make cell back to button form
	e.target.parentElement.innerHTML = "<button class='edit'>edit</button>";
}
