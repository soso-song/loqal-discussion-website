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

async function updateQuestion(id, mytitle, mydesc, mytags, 
							  isResolved=null, isFlagged=null){
	const url = '/questions/' + id;

	const data = {
		title: mytitle,
		content: mydesc,
		tags: mytags,
		isResolved: isResolved,
		isFlagged: isFlagged
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

	await fetch(request)
	.then(function(res) {
		if(isResolved === null){
			newURL = res.url;
		}
	}).catch((error) => {
		console.log(error);
	})
	return newURL;
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

async function createTags(tag_names){
	const url = '/tag';
	const url_c = '/countTagUse/';

	let data;
	let request;

	const mytags = [];

	for(let tag_name of tag_names){
		data = { name: tag_name };

		request = new Request(url, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})

		await fetch(request).then((res) => {
			return res.json();
		}).then((json) => {
			mytags.push(json.tag._id);
			// count this use of tag
			request = new Request(url_c+json.tag._id, {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			})
			fetch(request).then()
			.catch((error) => {
				console.log(error);
			})
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return mytags;
}
