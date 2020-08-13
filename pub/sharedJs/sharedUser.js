"use strict";

// get the user's username and displayname from server
async function getUserInfo(user_id){
	const url = '/users/' + user_id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	let userInfo;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           	// return a promise that resolves with the JSON body
           	return res.json();
       	} else {
            // alert('Could not get user.');
       	} 
	})
	.then((json) => {
		userInfo = {
           	displayname: json.displayname,
           	username: json.username
        };
	})
	.catch((error) => {
		console.log(error)
	})
	return userInfo;
}

// get the list of users with a list of ids
async function getUserList(user_ids){
	if(user_ids.length == 0){
		return;
	}

	const url = '/users/mapping';

	const data = {
		ids: user_ids
	}


	const request = new Request(url, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});

	let user_mapping;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           	return res.json();
       	} else {
       		console.log(res)
            alert('Could not get users.');
       	} 
	})
	.then((json) => {
		user_mapping = json;
	})
	.catch((error) => {
		console.log(error)
	})

	return user_mapping;
}
