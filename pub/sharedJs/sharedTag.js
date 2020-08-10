"use strict";

async function getTagById(id){
	const url = '/tags/' + id;

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

async function updateTag(id,name){
	const url = '/tags/' + id;

	const data = {
        name:name
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


// Loads all the tags this user is following to
async function getTagList(tags){
	let mytags = '';
    const url = '/tagIdToName';
    const data = {
        ids: tags
    }
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    await fetch(request)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        let newDiv = '';
        for(let i=0; i < json.length; i++){
            mytags+=`<span class="tag">${json[i]}</span>`;
        }
    })
    .catch((error) => {
        console.log(error);
    })
    return mytags;
}
