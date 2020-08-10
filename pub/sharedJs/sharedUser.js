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
