"use strict";

async function getQuestionByID(id){
	const url = '/questions/' + id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	let question;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get question');
       	} 
	})
	.then((json) => {
		question = json.question;
	})
	.catch((error) => {
		console.log(error)
	})
	return question;
}


function userUpdateQuestion(id, mytitle, mydesc, mytags, 
						isResolved=null){
	const url = '/questions/' + id;

	const data = {
		title: mytitle,
		content: mydesc,
		tags: mytags,
		isResolved: isResolved
	}

	const request = new Request(url, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});

	let newURL;

	fetch(request)
	.then(function(res) {
		if (res.status === 403){
			alert('You have no permission to edit this question!');
			window.location.href = res.url;
		}
		else if(isResolved === null){
			window.location.href = res.url;
		}
	}).catch((error) => {
		console.log(error);
	})
}

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

