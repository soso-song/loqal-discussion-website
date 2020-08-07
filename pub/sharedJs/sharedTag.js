"use strict";

async function getTagByName(name){
	const url = '/tags/' + name;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	let tag;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get tag');
       	} 
	})
	.then((json) => {
		tag = json.tag;
	})
	.catch((error) => {
		console.log(error)
	})
	return tag;
}

async function updateTag(name,newName){
	const url = '/tags/' + name;

	const data = {
        name:newName
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
// async function getUserInfo(user_id){
// 	const url = '/users/' + user_id;

// 	const request = new Request(url, {
// 		method: 'get',
// 		headers: {
// 			'Accept': 'application/json, text/plain, */*',
// 			'Content-Type': 'application/json'
// 		}
// 	});
// 	let userInfo;
// 	await fetch(request)
// 	.then((res) => {
// 		if (res.status === 200) {
//            	// return a promise that resolves with the JSON body
//            	return res.json();
//        	} else {
//             // alert('Could not get user.');
//        	} 
// 	})
// 	.then((json) => {
// 		userInfo = {
//            	displayname: json.displayname,
//            	username: json.username
//         };
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
// 	return userInfo;
// }

// // get the user's username and displayname from server
// async function getAnswer(answer_id){
// 	const url = '/answers/' + answer_id;

// 	const request = new Request(url, {
// 		method: 'get',
// 		headers: {
// 			'Accept': 'application/json, text/plain, */*',
// 			'Content-Type': 'application/json'
// 		}
// 	});
// 	let answer;
// 	await fetch(request)
// 	.then((res) => {
// 		if (res.status === 200) {
//            	return res.json();
//        	} else {
//             alert('Could not get answer.');
//        	} 
// 	})
// 	.then((json) => {
// 		answer = json.answer;
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
// 	return answer;
// }