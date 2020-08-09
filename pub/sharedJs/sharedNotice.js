"use strict";

function getNoticeById(Id, callBack){
	const url = '/notice/find/' + Id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get notice');
       	} 
	})
	.then((data) => {
		callBack(data);
	})
	.catch((error) => {
		console.log(error)
	})
}

function updateNotice(id,newTitle,newContent,newActice){
	const url = '/notice/' + id;

	const data = {
        title:newTitle,
        content:newContent,
        isShowing:newActice
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
	.then()
	.catch((error) => {
		console.log(error);
	})
}