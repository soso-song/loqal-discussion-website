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

function updateQuestion(id, mytitle, mydesc, mytags, isResolved=null){
	const url = '/questions/' + id;


	const data = {
		title: mytitle,
		content: mydesc,
		tags: [],	//TODO: add tags
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

	fetch(request)
	.then(function(res) {
		if(isResolved === null){
			window.location.href = res.url;
		}
	}).catch((error) => {
		console.log(error);
	})
}