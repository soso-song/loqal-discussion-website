const searchUserForm = document.querySelector('#searchUserForm');
searchUserForm.addEventListener('submit', search_user);

function search_user(e) {
	e.preventDefault();
	const keyword = searchUserForm.elements['keyword'].value;
	// console.log(searchUserForm.elements['keyword']);
	// console.log(keyword);
	let user;
	let u;
	for(u of users){
		if(u.username === keyword || u.email === keyword){
			user = u;
			break;
		}
	}



	console.log('result:');
	console.log(user);
	// document.write(result_post);
	// document.write(result_answ);
}


