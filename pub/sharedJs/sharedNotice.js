"use strict";

async function getNoticeById(Id){
	const url = '/notices/' + Id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	let notice;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get notice');
       	} 
	})
	.then((json) => {
		notice = json.notice;
	})
	.catch((error) => {
		console.log(error)
	})
	return notice;
}

async function updateNotice(id,newTitle,newContent){
	const url = '/notices/' + id;

	const data = {
        title:newTitle,
        content:newContent
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