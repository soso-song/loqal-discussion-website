function load_rep_users(){
	const rep_users = document.querySelector("#rep_users");
	let rep_count = 0;
	for (const user of users){
		if (user.is_flagged){
			rep_count++;
			const block = document.createElement("div");
			const left = document.createElement("div");
			left.setAttribute("class", "leftDiv");
			left.innerHTML = "<p>Reported user: " + user.username + "<\p>";
			const right = document.createElement("div");
			right.setAttribute("class", "rightDiv");
		}
	}
}









// current user is global
let user;

const singleProfile = document.querySelector('#single_profile');
singleProfile.style.display = 'none';

const allUsers = document.querySelector('#all_users');
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